import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getByGenres } from "../../redux/actions";
import style from "./Funcionalidades.module.css";

const Funcionalidades = ({ handlerFilter, handleSort, handleSource }) => {
  const dispatch = useDispatch();
  const generos = useSelector((state) => state.genres);

  useEffect(() => {
    dispatch(getByGenres());
  }, [dispatch]);

  return (
    <div className={style.box}>
      <select onChange={(e) => handleSort(e)}>
        <option value="">Ordenar por...</option>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
        <option value="RatingAsc">Rating Asc</option>
        <option value="RatingDesc">Rating Desc</option>
      </select>

      <select id="genre" onChange={(e) => handlerFilter(e)}>
        <option value="">Generos</option>
        {generos &&
          generos.map((g) => {
            return (
              <option key={g.id} value={g.name}>
                {g.name}
              </option>
            );
          })}
      </select>

      <select onChange={(e) => handleSource(e)}>
        <option value="">Filtrar por Origen</option>
        <option value="api">API</option>
        <option value="created">Created</option>
      </select>
    </div>
  );
};

export default Funcionalidades;
