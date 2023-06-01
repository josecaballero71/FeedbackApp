import React, { useState } from "react";
import Formulario from "./Formulario";
import { handleSubmitDel, handleSubmitAdd, handleSubmitUpd } from "../components/Handlers";

import images from "../../utils/images/images";
import "./Options.css";

const Options = () => {
  const [formVisibility, setFormVisibility] = useState("none");
  const [activate, setActivate] = useState(true);

  const handleClick = () => {
    setActivate(!activate);
    activate ? setFormVisibility("flex") : setFormVisibility("none");
  };

  const handleClickDel = () => {
    handleSubmitDel();
  };

  return (
    <div className="option-container">
      <h2>Administration</h2>

      <div className="button-container">
        <button onClick={() => handleClick()}>
          <img src={images.excellent} alt="imagen" height={50} width={50} />
          Created
        </button>
      </div>

      <div className="button-container">
        <button onClick={() => handleClick()}>
          <img src={images.excellent} alt="" height={50} width={50} />
          Update
        </button>
      </div>

      <div className="button-container">
        <button onClick={() => handleClickDel()}>
          <img src={images.excellent} alt="" height={50} width={50} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default Options;
