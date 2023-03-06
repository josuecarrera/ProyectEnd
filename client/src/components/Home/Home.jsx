import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Funcionalidades from "../Funcionalidades/Funcionalidades";
import NavBar from "../NavBar/NavBar";
import { Videogames } from "../Videogame/Videogames";
import Paginado from "../Paginado/Paginado";
import {
  filterByGenres,
  filterBySource,
  orderBy,
  getAllVideogames,
} from "../../redux/actions";

export default function Home() {
  const allGames = useSelector((state) => state.allVideogames);// arreglo del estado trae del reducer todos los personajes

  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 15;
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = allGames.slice(indexOfFirstGame, indexOfLastGame);// slice agara el arreglo y toma una porcion de lo que le mande 
  //toma el indice del primer personaje y del ultimo personaje                                              

  const dispatch = useDispatch();

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  function handleSort(e) {
    e.preventDefault();
    if (e.target.value === "") {
      dispatch(getAllVideogames());
    } else {
      dispatch(orderBy(e.target.value));
      setCurrentPage(1);
    }
  }

  function handleFilter(e) {
    e.preventDefault();
    if (e.target.value === "") {
      dispatch(getAllVideogames());
    } else {
      dispatch(filterByGenres(e.target.value));
      setCurrentPage(1);
    }
  }

  function handleSource(e) {
    e.preventDefault();
    if (e.target.value === "") {
      dispatch(getAllVideogames());
    } else {
      dispatch(filterBySource(e.target.value));
      setCurrentPage(1);
    }
  }
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div>
        <Funcionalidades
          handleSort={handleSort}
          handlerFilter={handleFilter}
          handleSource={handleSource}
        />
      </div>
      <div>
        <Videogames currentGames={currentGames} />
      </div>
      <div>
        <Paginado
          gamesPerPage={gamesPerPage}
          allGames={allGames.length}
          paginado={paginado}
        />
      </div>
    </div>
  );
}
