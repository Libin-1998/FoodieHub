import React, { useState } from "react";
import "./Signup.css";
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";

export default function Signup() {
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
// console.log(response);
console.log(response.data.message);
toast.success(response.data.message)
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
          src={"./images/loginfood.jpg"}
          height={"100%"}
          width={"100%"}
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
