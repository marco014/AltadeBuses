import { Link,redirect, useNavigate } from "react-router-dom"; 
import Label from "../atoms/Label";
import Image from "../atoms/Image";
import "../../assets/styles/FormLogin.css";
import { useState } from "react";
import { useRef } from "react";

const FormLogin = () => {
  const navigate = useNavigate();
  const Form = useRef();
  const endPoint = "http://34.225.239.102/api/iniciar";

  const handlerClick = (e) => {
    e.preventDefault();
    const newForm = new FormData(Form.current);
    if(newForm.get("usuario") === "" || newForm.get("contrasenia") === ""){
      alert("Fill in the empty fields");
    }else{
      
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuario: newForm.get("usuario"),
        contrasenia: newForm.get("contrasenia"),
      }),
    };

    fetch(endPoint, options)
      .then((response) => response.json())

      .then((data) => {
        if(data.status === true){
          navigate("/busRegister");
        }else{
          alert("Incorrect data")
        }
      });
    }
  };

  return (
    <div className="container">
          <Image />
          <h1>Login</h1>
          <form ref={Form}>
            <Label msj={"Username"} />
            <input type="text" name="usuario" className="input"/>

            <Label msj={"Password"} />
            <input type="password" name="contrasenia" className="input"/>

            <button className="button" onClick={handlerClick} >Log in</button>
          </form>
          <h4>You do not have an account? Be encouraged to create it</h4>
          <Link to="/Register">Create Account</Link>
    </div>
  );
}

export default FormLogin;