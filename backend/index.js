import express from "express"
import cors from "cors"

import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
app.use(cors())

import "./base-orm/sqlite-init.js"

app.get("/", (req, res) => {
  res.send("Incial Backend Gym Check")
});

import usersRouter from "./routes/users.js";
app.use(usersRouter);

import categoriesRouter from "./routes/categories.js";
app.use(categoriesRouter);

import exercisesRouter from "./routes/exercises.js";
app.use(exercisesRouter);

const port = 4000;
app.listen(port, () => {
  console.log(`site listened in port: ${port}`)
});