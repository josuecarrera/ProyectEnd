const { default: axios } = require("axios");
const { Videogame, Genre } = require("../db.js");
require("dotenv").config();
const { API_KEY } = process.env;

const infoApi = async (req, res) => {
  let URL = `https://api.rawg.io/api/games?key=${API_KEY}`;
  let videojuegos = [];

  try {
    for (let i = 0; i < 5; i++) {
      const respuesta = await axios.get(URL);

      respuesta.data.results.map((el) => {
        videojuegos.push({
          id: el.id,
          name: el.name,
          image: el.background_image,
          rating: el.rating,
          platforms: el.platforms?.map((e) => e.platform.name),
          genres: el.genres?.map((e) => e.name),
        });
      });
      URL = respuesta.data.next;
    }
    return videojuegos;
  } catch (error) {
    res.status(404).json({error: error.message})
  }
};

const infoDB = async (req, res) => {
  try {
    return await Videogame.findAll({
      include: [
        {
          model: Genre,
          atributes: ["name"],
          throught: {
            atributes: [],
          },
        },
      ],
    });
  } catch (error) {
    res.status(404).json({error: error.message})
  }
};

const infoTotal = async () => {
  const apiData = await infoApi();
  const dbData = await infoDB();

  const infoCompleta = dbData.concat(apiData);
  return infoCompleta;
};

// Solicitud para mis request por QUERY

const nameApi = async (name) => {
  const infoSearch = await axios.get(
    `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`
  );

  try {
    const vaSearch = await infoSearch.data.results.map((el) => {
      return {
        id: el.id,
        name: el.name,
        image: el.background_image,
        rating: el.rating,
        platforms: el.platforms?.map((el) => el.platform.name),
        genres: el.genres?.map((el) => el.name),
      };
    });
    return vaSearch;
  } catch (error) {
    console.error(error);
  }
};

// solicitud para las request por PARAMS

const idApi = async (id) => {
  try {
    const rtApi = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    );
    if (rtApi) {
      const vgId = await rtApi.data;
      const info = {
        id: vgId.id,
        name: vgId.name,
        image: vgId.background_image,
        genres: vgId.genres?.map((g) => g.name),
        description: vgId.description,
        released: vgId.released,
        rating: vgId.rating,
        platforms: vgId.platforms?.map((p) => p.platform.name),
      };
      return info;
    } else {
      return "No hay un videojuego con ese id";
    }
  } catch (error) {
    console.error(error);
  }
};

//Van a mi DB
const idDB = async (id) => {
  try {
    return await Videogame.findByPk(id, {
      include: [
        {
          model: Genre,
          atributes: ["name"],
          throught: {
            atributes: [],
          },
        },
      ],
    });
  } catch (error) {
    console.error(error);
  }
};

// Union de las solicitudes
const videogame = async (id) => {
  const dbId = id.includes("-");
  if (dbId) {
    const vgDb = await idDB(id);
    return vgDb;
  } else {
    const vgApi = await idApi(id);
    return vgApi;
  }
};

module.exports = { infoTotal, videogame, infoApi, infoDB, nameApi };
