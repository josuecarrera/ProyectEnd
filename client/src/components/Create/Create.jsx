import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVideogame, getByGenres, getPlatforms } from "../../redux/actions";
import style from "./Create.module.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function validate(input) {
  let errors = [];

  if (!input.name) {
    errors.name = "El nombre es requerido";
  } else if (!/^[a-zA-Z0-9-() .]+$/.test(input.name)) {
    errors.name =
      "Solo se aceptan letras, numeros, guiones medios y parentesis";
  }

  if (
    input.image.length !== 0 &&
    !/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/.test(input.image)
  ) {
    errors.image = "invalid URL";
  }

  if (!input.description) {
    errors.description = "La description es requerida";
  } else if (input.description.length > 100) {
    errors.description = "La description es muy larga. (Max 100 caracteres)";
  }

  if (!input.released) {
    errors.released = "La fecha de lanzamiento es requerida";
  }

  if (!input.rating) {
    errors.rating = "El rating es requerida";
  } else if (input.rating > 5) {
    errors.rating = "El rating no debe ser mayor a 5";
  } else if (input.rating < 0) {
    errors.rating = "El rating no puede ser un numero negativo";
  }

  return errors;
}

export default function Create() {
  const [input, setInput] = useState({
    name: "",
    image: "",
    description: "",
    released: "",
    rating: "",
    genres: [],
    platforms: [],
  });

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const generos = useSelector((state) => state.genres);
  const plataformas = useSelector((state) => state.platforms);
  const allNames = useSelector((state) => state.allVideogames);

  useEffect(() => {
    dispatch(getByGenres());
    dispatch(getPlatforms());
  }, [dispatch]);

  function handleSubmit(e) {
    e.preventDefault();
    let noRepeat = allNames.filter((n) => n.name === input.name);
    if (noRepeat.length !== 0) {
      alert("Ya existe un juego con ese nombre, elija otro");
    } else {
      let error = Object.keys(validate(input));

      if (
        error.length !== 0 ||
        !input.genres.length ||
        !input.platforms.length
      ) {
        alert("Llene los campos correctamente");
        return;
      } else {
        dispatch(createVideogame(input));
        setInput({
          name: "",
          image: "",
          description: "",
          released: "",
          rating: "",
          genres: [],
          platforms: [],
        });
        alert("Felicidades, el juego fue creado exitosamente");
      }
      navigate("/home");
    }
  }

  function handleChange(e) {
    e.preventDefault();

    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors(
      validate({
        ...input,
        [e.target.name]: [e.target.value],
      })
    );
  }

  function handleGenres(e) {
    if (!input.genres.includes(e.target.value)) {
      setInput({
        ...input,
        genres: [...input.genres, e.target.value],
      });
    }
  }

  function handlePlatforms(e) {
    if (!input.platforms.includes(e.target.value)) {
      setInput({
        ...input,
        platforms: [...input.platforms, e.target.value],
      });
    }
  }

  function handleDeleteG(e) {
    setInput({
      ...input,
      genres: input.genres.filter((gen) => gen !== e),
    });
  }

  function handleDeleteP(e) {
    setInput({
      ...input,
      platforms: input.platforms.filter((p) => p !== e),
    });
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)} className={style.box_form}>
        <div className={style.form}>
          <h2 className={style.titulo}>Crea tu Propio VideoJuego</h2>

          <div className={style.grupo}>
            <input
              className={style.create_input}
              type="text"
              required
              name="name"
              value={input.name}
              onChange={(e) => handleChange(e)}
            />
            <span className={style.barra}></span>
            <label className={style.label}>Nombre: </label>
            {errors.name && <p className={style.danger}>{errors.name}</p>}
          </div>

          <div className={style.grupo}>
            <input
              className={style.create_input}
              type="text"
              required
              name="image"
              value={input.image}
              onChange={(e) => handleChange(e)}
            />
            <span className={style.barra}></span>
            <label className={style.label}>Imagen URL: </label>
            {errors.image && <p className={style.danger}>{errors.image}</p>}
          </div>

          <div className={style.grupo}>
            <input
              className={style.create_input}
              required
              type="date"
              name="released"
              value={input.released}
              placeholder="yyyy-mm-dd"
              onChange={(e) => handleChange(e)}
            />
            <span className={style.barra}></span>
            <label className={style.label}>Fecha de lanzamiento: </label>
            {errors.released && (
              <p className={style.danger}>{errors.released}</p>
            )}
          </div>

          <div className={style.grupo}>
            <input
              className={style.create_input}
              required
              type="number"
              name="rating"
              value={input.rating}
              onChange={(e) => handleChange(e)}
            />
            <span className={style.barra}></span>
            <label className={style.label}>Rating: </label>
            {errors.rating && <p className={style.danger}>{errors.rating}</p>}
          </div>

          <div className={style.grupo}>
            <select
              className={style.select_create}
              id="genres"
              defaultChecked=""
              onChange={(e) => handleGenres(e)}
            >
              <option className={style.option_create} value="" disabled hidden>
                Elija los generos...
              </option>
              {generos.map((g) => {
                return (
                  <option
                    className={style.option_create}
                    key={g.id}
                    value={g.name}
                  >
                    {g.name}
                  </option>
                );
              })}
            </select>
            <span className={style.barra}></span>
            <label className={style.label}>Generos: </label>
            {input.genres.map((g) => (
              <div className={style.box_opcion}>
                <div className={style.option_title}>{g}</div>
                <button
                  className={style.btn_remove}
                  onClick={() => handleDeleteG(g)}
                  key={g}
                  value={g}
                >
                  <span className={style.x}>X</span>
                </button>
              </div>
            ))}
          </div>

          <div className={style.grupo}>
            <select
              className={style.select_create}
              id="platforms"
              onChange={(e) => handlePlatforms(e)}
            >
              <option className={style.option_create} value="" disabled hidden>
                Elija las plataformas
              </option>
              {plataformas?.map((p) => {
                return (
                  <option className={style.option_create} value={p} key={p}>
                    {p}
                  </option>
                );
              })}
            </select>
            <span className={style.barra}></span>
            <label className={style.label}>Plataformas: </label>
            {input.platforms.map((p) => (
              <div className={style.box_opcion}>
                <div className={style.option_title}>{p}</div>
                <button
                  className={style.btn_remove}
                  onClick={() => handleDeleteP(p)}
                  key={p}
                  value={p}
                >
                  <span className={style.x}>X</span>
                </button>
              </div>
            ))}
          </div>

          <div className={style.grupo}>
            <textarea
              required
              type="text"
              name="description"
              value={input.description}
              onChange={(e) => handleChange(e)}
            ></textarea>
            <label className={style.description}>Description: </label>
            {errors.description && (
              <p className={style.danger}>{errors.description}</p>
            )}
          </div>
        </div>
        <div>
          <button type="submit" className={style.btn_submit}>
            CREAR VIDEOJUEGO
          </button>
        </div>
        <div className={style.box_home}>
          <NavLink to={"/home"} className={style.back_home}>
            Cancelar
          </NavLink>
        </div>
      </form>
    </div>
  );
}
