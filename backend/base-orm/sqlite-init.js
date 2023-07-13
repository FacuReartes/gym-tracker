
import { open, get, run, close } from 'aa-sqlite';

async function CreateBaseIfNotExists() {
  await open("./.data/gym.db");

  let exists = null;
  let res = null;

  // USERS TABLE CREATE
  res = await get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name = 'users'",
    []
  );
  if (res.contar > 0) exists = true;
  if (!exists) {
    await run(
      `CREATE table users(
         IdUser INTEGER PRIMARY KEY AUTOINCREMENT, 
         User text NOT NULL UNIQUE, 
         Password text NOT NULL);`
    );
    console.log("users table created")

    await run(
      `insert into users values
      (1, 'FacundoReartes', '12345'),
      (2, 'MiguelSuarez', '12345')`
    )
  };

  // CATEGORIES TABLE CREATE
  exists = null
  res = await get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name = 'categories'",
    []
  );
  if (res.contar > 0) exists = true;
  if (!exists) {
    await run(
      `CREATE table categories(
        IdCategory INTEGER PRIMARY KEY AUTOINCREMENT,
        Name text NOT NULL,
        Description text NOT NULL,
        IdUser INTEGER NOT NULL,
        FOREIGN KEY (IdUser) REFERENCES users(IdUser)
      );`
    );
    console.log("categories table created")

    await run(
      `insert into categories values
      (1, 'Pecho', 'Lunes, miercoles y viernes', 1),
      (2, 'Espalda', 'Mostly pull exercises', 1),
      (3, 'Pecho', 'Intensivo con aumento periodico', 2),
      (4, 'Hombros', 'Martes y Jueves complementario', 2)`
    )
  };

  // EXERCISES TABLE CREATE
  exists = null
  res = await get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name = 'exercises'",
    []
  );
  if (res.contar > 0) exists = true;
  if (!exists) {
    await run (
      `CREATE table exercises(
        IdExercise INTEGER PRIMARY KEY AUTOINCREMENT,
        Name text NOT NULL,
        Sets INTEGER,
        Repetitions INTEGER,
        Kg INTEGER,
        Description text,
        IdCategory INTEGER NOT NULL,
        IdUser INTEGER NOT NULL,
        FOREIGN KEY (IdCategory) REFERENCES categories(IdCategory),
        FOREIGN KEY (IdUser) REFERENCES users(IdUser)
      );`
    );
    console.log("exercises table created")

    await run(
      `insert into exercises values
      (1, 'Press de Banca', 4, 8, 35, 'Aumentar la proxima', 1, 1),
      (2, 'Poleas Cruzadas', 4, 8, 15, 'Tecnica', 1, 1)`
    )
  }

  close();
}

CreateBaseIfNotExists();

export default CreateBaseIfNotExists;