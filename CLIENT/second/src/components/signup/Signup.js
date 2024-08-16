import React, { useState } from "react";
import "./Signup.css";
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Signup() {

  const navigate=useNavigate()

  const [sign, setsign] = useState({
    firstname: "",
    lastname: "",
    mobile: "",
    emailaddress: "",
    password: "",
    confirmpassword: "",
  });
  const signchange=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setsign({...sign,[name]:value})
  }

  console.log(sign);

  const register=(event)=>{
    event.preventDefault()
    axios.post("http://localhost:6060/api/registration/register",sign)
    .then((response)=>{
console.log(response);
toast.success(response.data.message)
setTimeout(() => {
  navigate('/login')
}, 2000);
    })
    .catch((error)=>{
      console.log(error);
toast.error(error.response.data.message)

    })
  }
  
  return (
    <>
      <div className="container signupfood">
        <ToastContainer/>
        <img
          src={"./images/fdREG.jpg"}
          className="signupimg"
        ></img>
        <div className="signup">
          <h1>Signup</h1>
          <input
            type="text"
            placeholder="Firstname"
            className="signupinput"
            name="firstname" onChange={signchange}
          ></input>
          <input
            type="text"
            placeholder="Lastname"
            className="signupinput"
            name="lastname" onChange={signchange}
          ></input>
          <input
            type="text"
            placeholder="Mobile"
            className="signupinput"
            name="mobile" onChange={signchange}
          ></input>
          <input
            type="text"
            placeholder="Email Address"
            className="signupinput"
            name="emailaddress" onChange={signchange}
          ></input>
          <input
            type="text"
            placeholder="Password"
            className="signupinput"
            name="password"onChange={signchange}
          ></input>
          <input
            type="text"
            placeholder="Confirm Password"
            className="signupinput"
            name="confirmpassword" onChange={signchange}
          ></input>
          <p>By creating an account, you agree to receive sms from vendor.</p>
          <button type="submit" className="createbut" onClick={register}>
            Create Account
          </button>
        </div>
      </div>
    </>
  );
}
