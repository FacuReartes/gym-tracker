import express from "express";
const router = express.Router();

import * as db from "../base-orm/sequelize-init.js"
import { ValidationError } from "sequelize";

router.get("/api/categories", async function (req, res, next) {
  let data = await db.categories.findAll({
    attributes: ["IdCategory", "Name", "Description", "IdUser"],
  });
  res.json(data);
});

//GET categories by user
router.get("/api/categories/:idUser", async function (req, res, next) {
  let items = await db.categories.findAll({
    attributes: ["IdCategory", "Name", "Description", "IdUser"],
    where: { IdUser: req.params.idUser },
  });
  res.json(items);
});

//PUT categories by id
router.put("/api/categories/:idCategory", async (req, res) => {
  try {
    let item = await db.categories.findOne({
      attributes: ["IdCategory", "Name", "Description", "IdUser"],
      where: { IdCategory: req.params.idCategory },
    });
    if (!item) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    item.IdCategory = req.body.IdCategory;
    item.Name = req.body.Name;
    item.Description = req.body.Description
    item.IdUser = req.body.IdUser;
    await item.save();
    res.sendStatus(200);

  } catch (err) {
    if (err instanceof ValidationError) {
      // si son errores de validacion, los devolvemos
      let messages = '';
      err.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
      res.status(400).json({message : messages});
    } else {
      // si son errores desconocidos, los dejamos que los controle el middleware de errores
      throw err;
    }
  }
});

// POST category
router.post("/api/categories/", async (req, res) => {
  try {
    let data = await db.categories.create({
      IdCategory: req.body.IdCategory,
      Name: req.body.Name,
      Description: req.body.Description,
      IdUser: req.body.IdUser,

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

// DELETE category
router.delete("/api/categories/:idCategory", async (req, res) => {

  let bajaFisica = false;

  if (bajaFisica) {
    // baja fisica
    let filasBorradas = await db.categories.destroy({
      where: { IdCategory: req.params.idCategory },
    });
    if (filasBorradas == 1) res.sendStatus(200);
    else res.sendStatus(404);
  } else {
    // baja logica
    try {
      let filasBorradas = await db.categories.destroy({
        where: { IdCategory: req.params.idCategory },
      });
      if (filasBorradas === 1) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      if (err instanceof ValidationError) {
        // si son errores de validacion, los devolvemos
        const messages = err.errors.map((x) => x.message);
        res.status(400).json(messages);
      } else {
        // si son errores desconocidos, los dejamos que los controle el middleware de errores
        throw err;
      }    }
  }
});


export default router;