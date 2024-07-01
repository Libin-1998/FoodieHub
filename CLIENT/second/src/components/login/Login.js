import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Login() {
 const navigate=useNavigate()
    const[log,setlog]=useState({
        mobile:'',
        password:'',
    })

    const logchange=(event)=>{
        console.log(event);

        const name=event.target.name;
        const value=event.target.value;
        setlog({...log,[name]:value})
    }

    console.log(log);

    const logsubmit=(event)=>{
      event.preventDefault()
      axios.post("http://localhost:6060/api/foodlogin/login",log)
      .then((response)=>{
        console.log(response);
        toast.success('login success')
        localStorage.setItem('isLogin',true)


        setTimeout(() => {
        navigate('/food')
          window.location.reload()
        }, 2000);

      })
      .catch((error)=>{
        console.log(error);
        toast.error(error.response.data.message )

      })

    }

  return (
    <>
      <div className="container foodlogin">
        <ToastContainer/>
        <img
          src={"./images/loginfood.jpg"}
          height={"100%"}
          width={"100%"}
        ></img>
        <div className="login">
          <h1>Login</h1>
          <div className="loginbox">
            <h4>Login to your account</h4>
            <input
              type="text"
              placeholder="Mobilenumber or Email"
              className="inputmobile" name="mobile" onChange={logchange}
            ></input>
            <input
              type="password"
              placeholder="Password"
              className="inputmobile" name="password" onChange={logchange}
            ></input>
          </div>
          <a href="">
            <span style={{ color: "red" }}>Forgot Password?</span>
          </a>
        </div>
        <div className="buttonlogin">
          <button className="logbut" onClick={logsubmit}>Login</button>
        </div>
      </div>
    </>
  );
}
