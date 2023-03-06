import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css";
//import linkeding from "../../imagenes/linkedin.svg";
//import github from "../../imagenes/github.svg";
//import gmail from "../../imagenes/gmail.svg";

const LandingPage = () => {
  return (
    <div className={style.full}>
      <div>
        <div>
          <h1 className={style.titulo}>Videogames APP</h1>
          <Link to="/home">
            <button className={style.btn}>
              <span className={style.ingresar}>GET STARTED</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
