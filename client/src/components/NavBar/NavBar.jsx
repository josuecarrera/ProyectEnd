import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import style from "./navBar.module.css";
import imagen from "../../imagenes/videogame.png";
import { getAllVideogames } from "../../redux/actions";
import { useDispatch } from "react-redux";

export default function NavBar() {
  const dispatch = useDispatch();

  const handleRefresh = (e) => {
    e.preventDefault();
    dispatch(getAllVideogames());
  };

  return (
    <nav className={style.nav}>
      <div className={style.busqueda}>
        <SearchBar />
      </div>
      <div className={style.inagencita}>
        <img src={imagen} alt="mario.git" className={style.gif} />
      </div>
      <div className={style.search}>
        <button className={style.btn} onClick={(e) => handleRefresh(e)}>
          Refresh
        </button>
        <span className={style.opcion}>
          <NavLink to={"/create"} className={style.to}>
            Create Videogame
          </NavLink>
        </span>
      </div>
    </nav>
  );
}
