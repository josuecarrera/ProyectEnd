const { Router } = require("express");
require("dotenv").config();
const { videogame } = require("../controllers");
const { Videogame, Genre } = require("../db.js");

const router = Router();

router.get("/:idVideogame", async (req, res) => {
  const { idVideogame } = req.params;
  let data = await videogame(idVideogame);

  try {
    data
      ? res.send(data)
      : res.status(404).send("El id ingresado no coinciden con un videojuego");
  } catch (error) {
    res.status(404).json({error: error.message})
  }
});

router.post("/", async (req, res) => {
  const { name, image, genres, released, rating, platforms, description } =
    req.body;

  try {
    let newVideogame = await Videogame.create({
      name,
      image,
      released,
      rating,
      platforms,
      description,
    });
    const genreDB = await Genre.findAll({//relacion
      where: {
        name: genres,
      },
    });
    await newVideogame.addGenres(genreDB);
    res.json(newVideogame);
  } catch (error) {
    res.status(404).json({error: error.message})
  }
});

module.exports = router;
