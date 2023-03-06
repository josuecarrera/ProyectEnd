import {
  GET_ALL_VIDEOGAMES,
  GET_NAMES,
  GET_VIDEOGAME,
  GET_BY_GENRES,
  CREATE_VIDEOGAME,
  ORDER_BY,
  FILTER_BY_SOURCE,
  FILTER_BY_GENRES,
  GET_PLATFORMS,
} from "../actions";

const initialState = {
  allVideogames: [],
  videogames: [],
  videogame: [],
  genres: [],
  platforms: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_VIDEOGAMES:
      return {
        ...state,
        allVideogames: action.payload,
        videogames: action.payload,
      };
    case GET_NAMES:
      return {
        ...state,
        allVideogames: action.payload,
      };
    case GET_VIDEOGAME:
      return {
        ...state,
        videogame: action.payload,
      };
    case GET_BY_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case CREATE_VIDEOGAME:
      return {
        ...state,
      };
    case ORDER_BY:
      let vgCopy = [...state.allVideogames];
      let ordenamiento;

      switch (action.payload) {
        case "All":
          ordenamiento = [...state.allVideogames];
          break;
        case "A-Z":
          ordenamiento = vgCopy.sort(function (a, b) {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return 1;
            }
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
              return -1;
            }
            return 0;
          });
          break;
        case "Z-A":
          ordenamiento = vgCopy.sort(function (a, b) {// ordenamiento 
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
              return 1;// retorna el mayor 
            }
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return -1;
            }
            return 0;// si son iguales los deja como esta
          });
          break;
        case "RatingAsc":
          ordenamiento = vgCopy.sort(function (a, b) {
            return a.rating - b.rating;
          });
          break;
        case "RatingDesc":
          ordenamiento = vgCopy.sort(function (a, b) {
            return b.rating - a.rating;
          });
          break;
        default:
          ordenamiento = vgCopy;
          break;
      }
      return {
        ...state,
        allVideogames: ordenamiento,
        videogames: ordenamiento,
      };
    case FILTER_BY_GENRES:
      let aux = [];
      if (action.payload) {
        aux = state.videogames.filter((e) => {
          if (e.genres.length === 0) {
            return e.genres;
          } else if (e.genres.some((e) => e.name === action.payload)) {
            return e.genres.map((el) => el.name);
          } else {
            return e.genres.includes(action.payload);
          }
        });
      } else {
        aux = state.videogames;
      }
      return {
        ...state,
        allVideogames: aux,
      };
    case FILTER_BY_SOURCE:
      let getVg = state.videogames;
      let filtrado = [];

      switch (action.payload) {
        case "api":
          filtrado = getVg.filter((el) => typeof el.id === "number");
          break;
        case "created":
          filtrado = getVg.filter((el) => isNaN(el.id));
          break;
        default:
          filtrado = getVg;
          break;
      }
      return {
        ...state,
        allVideogames: filtrado,
      };
    case GET_PLATFORMS:
      return {
        ...state,
        platforms: [...action.payload],
      };
    default:
      return {
        ...state,
      };
  }
}

export default rootReducer;
