import express from "express";
const router = express.Router();

import * as db from "../base-orm/sequelize-init.js"

router.get("/api/exercises", async function (req, res, next) {
  let data = await db.exercises.findAll({
    attributes: ["IdExercise", "Name", "Sets", "Repetitions", "Kg", "Description", "IdCategory", "IdUser"],
  });
  res.json(data);
});

//GET exercises by categories of user
// CAMBIAR LOS GET A FUINCON FLECHA
router.get("/api/exercises/:idCategory/user/:idUser", async function (req, res, next) {
  let items = await db.exercises.findAll({
    attributes: ["IdExercise", "Name", "Sets", "Repetitions", "Kg", "Description", "IdCategory", "IdUser"],
    where: { IdUser: req.params.idUser, IdCategory: req.params.idCategory  },
  });
  res.json(items);
});

//PUT exercise by id
router.put("/api/exercises/:idExercise", async (req, res) => {
  try {
    let item = await db.exercises.findOne({
      attributes: ["IdExercise", "Name", "Sets", "Repetitions", "Kg", "Description", "IdCategory", "IdUser"],
      where: { IdExercise: req.params.idExercise },
    });
    if (!item) {
      res.status(404).json({ message: "Exercise not found" });
      return;
    }
    item.IdExercise = req.body.IdExercise;
    item.Name = req.body.Name;
    item.Sets = req.body.Sets;
    item.Repetitions = req.body.Repetitions;
    item.Kg = req.body.Kg;
    item.Description = req.body.Description;
    item.IdCategory = req.body.IdCategory;
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


//POST exercise
router.post("/api/exercises/", async (req, res) => {
  try {
    let data = await db.exercises.create({
      IdExercise: req.body.IdExercise,
      Name: req.body.Name,
      Sets: req.body.Sets,
      Repetitions: req.body.Repetitions,
      Kg: req.body.Kg,
      Description: req.body.Description,
      IdCategory: req.body.IdCategory,
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

// DELETE exercise

//ACA CREO QUE HACE DOS VECES LO MISMO, VER CON CHAT GPT
router.delete("/api/exercises/:idExercise", async (req, res) => {

  let bajaFisica = false;

  if (bajaFisica) {
    // baja fisica
    let filasBorradas = await db.exercises.destroy({
      where: { IdExercise: req.params.idExercise },
    });
    if (filasBorradas == 1) res.sendStatus(200);
    else res.sendStatus(404);
  } else {
    // baja logica
    try {
      let filasBorradas = await db.exercises.destroy({
        where: { IdExercise: req.params.idExercise },
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