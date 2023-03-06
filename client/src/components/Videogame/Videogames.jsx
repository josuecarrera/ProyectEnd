import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getAllVideogames } from "../../redux/actions";
import img from "../../imagenes/control.jpg";
import CardVideogame from "../CardVideogame/CardVideogame";
import style from "./Videogames.module.css";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";

export const Videogames = ({ currentGames }) => {
  const dispatch = useDispatch();
  const [carga, setCarga] = useState(true);

  React.useEffect(() => {
    dispatch(getAllVideogames()).then(() => setCarga(false));
  }, [dispatch]);

  if (carga) {
    return <Loading />;
  }

  return (
    <div className={style.main}>
      {currentGames.length > 0 ? (
        currentGames?.map((v) => {
          return (
            <CardVideogame
              key={v.id}
              id={v.id}
              image={v.image ? v.image : img}
              name={v.name}
              genres={v.genres
                ?.map((e) => (typeof e === "object" ? e.name : e))
                .join(", ")}
              rating={v.rating}
            />
          );
        })
      ) : (
        <Error />
      )}
    </div>
  );
};
