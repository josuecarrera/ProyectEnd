import React from "react";
import style from "./CardVideogame.module.css";
import { NavLink } from "react-router-dom";

class CardVideogame extends React.Component {
  render() {
    return (
      <div className={style.card}>
        <img src={this.props.image} width="400px" height="250px" alt="" />
        <div className={style.card__content}>
          <h3 className={style.nombre}>{this.props.name}</h3>
          <p className={style.genres}>{this.props.genres}</p>
          <p className={style.rating}>🎗️ {this.props.rating}</p>
          <NavLink to={`/detail/${this.props.id}`} className={style.navLink}>
            <span className={style.leer_mas}>Leer mas</span>
          </NavLink>
        </div>
      </div>
    );
  }
}

export default CardVideogame;
