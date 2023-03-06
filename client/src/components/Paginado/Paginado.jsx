import React from "react";
import style from "./Paginacion.module.css";

const Paginado = ({ gamesPerPage, allGames, paginado }) => {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(allGames / gamesPerPage); i++) {//ceil: redondea para arriba todos los personajes sobre la cantidad 
    //de personajes que quiero para mi pagina
    pageNumber.push(i);
  }

  return (
    <nav>
      <div className={style.paginacion}>
        {pageNumber &&
          pageNumber.map((number) => (
            <span key={number}>
              <button className={style.btn} onClick={() => paginado(number)}>
                {number}
              </button>
            </span>
          ))}
      </div>
    </nav>
  );
};

export default Paginado;
