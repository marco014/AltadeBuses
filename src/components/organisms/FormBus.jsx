import Image from "../atoms/Image";
import Label from "../atoms/Label";
import "../../assets/styles/FormBus.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import React, { useRef } from "react";

const FormBus = () => {
  const navigate = useNavigate();
  const Form = useRef();
  const endPoint = " http://34.225.239.102/api/autobus/register";

  const handlerClick = (e) => {
    e.preventDefault();
    const newForm = new FormData(Form.current);
    if(newForm.get("clave") === "" || newForm.get("placa") === "" || newForm.get("numasientos") === "" || newForm.get("fecha") === "" || newForm.get("tipo") === ""|| newForm.get("nombre") === ""){
        alert("Fill in the empty fields");
    }else{
        
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clave: newForm.get("clave"),
        placa: newForm.get("placa"),
        numasientos: newForm.get("numasientos"),
        fecha: newForm.get("fecha"),
        tipo: newForm.get("tipo"),
        nombre: newForm.get("nombre"),
        licencia: parseInt(10000 + Math.random() * 90000),
      }),
    };

    fetch(endPoint, options)
      .then((response) => response.json())
      .then((data) => {
      
        if(data.status === true){
            // navigate("/");
            alert("Successfully registered bus");
          }
      });
    }
  };

  return (
    <div className="container-2">
      <Image />
      <h1>High bus</h1>
      <form ref={Form}>
        <Label msj={"Bus Key"} />
        <input type="text" name="clave" className="input"/>

        <Label msj={"Bus Plate"} />
        <input type="text" name="placa" className="input"/>

        <Label msj={"Number of seats"} />
        <input type="text" name="numasientos" className="input"/>

        <Label msj={"Discharge Date"} />
        <input 
        type="date" 
        name="fecha" 
        className="input"></input>

        <Label msj={"Type"} />
        <select className="input" name="tipo">
          <option>Tourism</option>
          <option>Luxe</option>
        </select>

        <Label msj={"Driver's Name"} />
        <input type="text" name="nombre" className="input"/>

        {/* <Label msj={"Liscense Number"} />
        <input type="text" name="licencia" className="input"/> */}

        <button type="button" className="button" onClick={handlerClick}>Bus Registration</button>
      </form>
    </div>
  );
}

export default FormBus;