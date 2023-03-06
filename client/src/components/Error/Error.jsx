import React from "react";
import img from "../../imagenes/kirby_sad.png";
import style from "./Error.module.css";

export default function Error() {
  return (
    <div className={style.kirby}>
      <h1>No se Encontraron videojuegos</h1>
      <img src={img} alt="kirby" />
    </div>
  );
}
