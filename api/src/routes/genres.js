const { default: axios } = require("axios");
const { Router } = require("express");
const { Genre } = require("../db.js");
require("dotenv").config();
const { API_KEY } = process.env;

const router = Router();

router.get("/", async (req, res) => {
  try {
    const respuesta = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    const genresApi = await respuesta.data.results.map((g) => g.name);

    genresApi.map((e) =>
      Genre.findOrCreate({
        where: { name: e },
      })
    );

    const allGenres = await Genre.findAll();
    res.json(allGenres);
  } catch (error) {
    res.status(404).json({error: error.message})
  }
});

module.exports = router;
