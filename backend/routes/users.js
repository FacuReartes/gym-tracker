import express from "express";
const router = express.Router();

import * as db from "../base-orm/sequelize-init.js"
import { ValidationError } from "sequelize";

import jwt from "jsonwebtoken";
import { accesTokenSecret, authenticateJWT, refreshTokenSecret } from "./auth.js";

let refreshTokens = ["yourrefreshtokensecrethere"];

router.get("/api/users", async function (req, res, next) {
  let data = await db.users.findAll({
    attributes: ["IdUser", "User"],
  });
  res.json(data);
});

//POST user
router.post("/api/users/", async (req, res) => {
  try {
    let data = await db.users.create({
      User: req.body.User,
      Password: req.body.Password,
    });
    res.status(200).json(data.dataValues); // devolvemos el registro agregado!
  } catch (err) {
    if (err instanceof ValidationError) {
      // si son errores de validacion, los devolvemos
      let messages = '';
      err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
      res.status(400).json({message : messages});
    } else {
      // si son errores desconocidos, los dejamos que los controle el middleware de errores
      throw err;
    }
  }
});

router.post("/api/token", (req, res) => {
  const { refreshToken } = req.body

  if(!refreshToken) {
    return res.sendStatus(401)
  }

  if (!refreshTokens.includes(refreshToken)) {
    return res.sendStatus(403)
  }

  jwt.verify(refreshToken, refreshTokenSecret, (err, user) => {
    if (err) {
      return res.sendStatus(403)
    }

    const accessToken = jwt.sign(
      { usuario: user.User },
      accesTokenSecret,
      { expiresIn: "20m" }
    );

    res.json({ accessToken });
  });
});

router.post("/api/login", async (req, res) => {
  const username = req.body.User;
  const password = req.body.Password;

  try {
    let data = await db.users.findOne({
      attributes: ["IdUser", "User", "Password"],
      where: { User: username }
    })
    if (data) {

      if (data.Password === password) {
        
        const id = data.IdUser
        const accessToken = jwt.sign({id}, accesTokenSecret, {
          expiresIn: "20m",
        })

        const refreshToken = jwt.sign(
          {id}, refreshTokenSecret
        );

        refreshTokens.push(refreshToken)

        res.json({ accessToken, refreshToken, id })

      } else {
        res.json({ message: "Wrong username/password combination" });
      }
    } else {
      res.json({ message: "User doesn't exist" });
    }
  } catch (error) {
    res.json({ message: "error en busqueda de db" })
  }
})

router.post("/api/logout", (req, res) => {
  let message = "Invalid logout!"
  const { token } = req.body;
  if (refreshTokens.includes(token)) {
    message = "User unlogged correctly!"
  }

  refreshTokens = refreshTokens.filter((x) => x !== token)

  res.json({ message });
});



export default router;