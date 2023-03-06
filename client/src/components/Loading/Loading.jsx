import React from "react";
import loading from "../../imagenes/LoadongStick.gif";
import style from "./Loading.module.css";

export default function PaginaDeCarga() {
  return (
    <div className={style.box_loading}>
      <img src={loading} alt="" />
    </div>
  );
}
