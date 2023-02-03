import Image from "../atoms/Image";
import "../../assets/styles/FormRegister.css";
import Label from "../atoms/Label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React, {useRef} from "react";


const FormRegister = () => {
  const navigate = useNavigate();
  const Form = useRef();
  const endPoint = 'http://34.225.239.102/api/registrar/usuario'



  const handlerClick = (e) => {
    e.preventDefault();
    const newForm = new FormData(Form.current);

    if(newForm.get("nombre") === "" || newForm.get("usuario") === "" || newForm.get("correo") === "" || newForm.get("contrasenia") === ""){//el simbolo de pesos despues se nombra la variable
        alert("Fill in the empty fields");
    }else{
        
    const options = {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: newForm.get("nombre"),
        usuario: newForm.get("usuario"),
        correo: newForm.get("correo"),
        contrasenia: newForm.get("contrasenia"),
      }),
    };
    fetch(endPoint, options)
      .then((response) => response.json())
      .then((data) => {
        alert(JSON.stringify(data));
        if(data.status === true){
            navigate("/");
          }else{
            alert("Not added")
          }
      });
    }
  };

  return ( 
    <div className="container-3">
      <Image />
      <h1>Register User</h1>
      <form ref={Form}>
        <Label msj={"Name"} />
        <input type="text" name="nombre" className="input"/>

        <Label msj={"Email"} />
        <input type="text" name="correo" className="input"/>

        <Label msj={"Username"} />
        <input type="text" name="usuario" className="input"/>

        <Label msj={"Password"} />
        <input type="password" name="contrasenia" className="input"/>

        <button type="button" className="button" onClick={handlerClick} >Register</button>
      </form>
    </div>
  );
}

export default FormRegister;