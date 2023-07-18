import React from "react";
import Menu from "../components/Menu";
import "./TwoBro.css";

const Twobro = () => {
  return (
    <div className="twobro-page">
      {/* Ajoutez plus de pétales ici en utilisant la même classe "petal" 14 en total*/}
      <div className="petal"></div>
      <div className="petal"></div>
      <div className="petal"></div>
      <div className="petal"></div>
      <div className="petal"></div>
      <div className="petal"></div>
      <div className="petal"></div>
      <div className="petal"></div>
      <div className="petal"></div>

      {/* Ajoutez plus de pétales ici en utilisant la même classe "petal" */}
      <Menu />
      <div className="container">
        {/* présentation des deux frères */}
        <h1>Les deux frères</h1>
        <p>
          Tahiti et Tricky ne sont pas seulement des joueurs, ils sont aussi des
          créateurs de contenu. Ils produisent des vidéos, des streams et des
          podcasts sur les jeux vidéo, et ils partagent leurs connaissances et
          leur passion avec leurs fans. Ils sont une source d'inspiration pour
          les joueurs de tous âges, et ils montrent que les jeux vidéo peuvent
          être une passion positive et enrichissante.
        </p>
        <p>
          Leur chaîne Twitch est disponible ici :{" "}
          <a href="https://twitch.tv/tahiti_tricky">Les deux frères</a>
        </p>
        <p>
          Leur chaîne YouTube est disponible ici :{" "}
          <a href="https://www.youtube.com/@tahitiettricky4918">
            Les deux frères
          </a>
        </p>
        <p>
          Leur chaîne TikTok est disponible ici :{" "}
          <a href="https://www.tiktok.com/@tahitiettricky?lang=fr">
            Les deux frères
          </a>
        </p>
      </div>
    </div>
  );
};

export default Twobro;
