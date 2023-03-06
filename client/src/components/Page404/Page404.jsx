import React from "react";
import error from "../../imagenes/ruco.gif";
import { NavLink } from "react-router-dom";
import style from "./Page404.module.css";

export default class Page404 extends React.PureComponent {
  render() {
    return (
      <div>
        <h1 className={style.titulo}>ERROR 404: Page not found</h1>
        <img src={error} alt="error" />
        <h2 className={style.pregunta}>Desea volver a HOME?</h2>
        <div className={style.mini_box}>
          <NavLink to={"/home"} className={style.nav}>
            <span className={style.opcion}>SI</span>
          </NavLink>
          <NavLink to={"/"} className={style.nav}>
            <span className={style.opcion}>NO</span>
          </NavLink>
        </div>
      </div>
    );
  }
}
