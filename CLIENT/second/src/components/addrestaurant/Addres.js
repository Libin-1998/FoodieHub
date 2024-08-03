import React, { useState } from "react";
import "./Addres.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Addres() {
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");

  const [resinput, setResinput] = useState({});

  const reschange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setResinput({ ...resinput, [name]: value });
  };
  console.log(resinput);

  const imageHandler = (event) => {
    setResinput({ ...resinput, image: event.target.files[0] });
    console.log(resinput.image);
  };

  const clickbutton = (event) => {
    event.preventDefault();

    const formdata = new FormData();
    formdata.append("name", resinput.name);
    formdata.append("state", resinput.state);
    formdata.append("city", resinput.city);
    formdata.append("time", resinput.time);
    formdata.append("image", resinput.image);

    axios
      .post("https://foodiehub-r5ze.onrender.com/api/newres/add_res", formdata, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        toast.success(response.data.message);

        // setTimeout(()=>{
        //     navigate('/restaurants')
        // },3000)
      })
      .catch((error) => {
        console.log(error);
        toast.error("adding failed");
      });
  };

  return (
    <>
      <div className="container-fluid addRespage">
        <ToastContainer />
        <h1 className="addreshead">ADD RESTAURANTS</h1>
        <form
          className="formclass"
          onSubmit={clickbutton}
          encType="multipart/form-data"
        >
          <div className="formRes">
            <label for="" className="resaddlabel">
              Restaurant Name<span className="resspan">*</span>
            </label>{" "}
            <br />
            <input
              type="text"
              className="resinputadd"
              name="name"
              onChange={reschange}
            ></input>
            <br />
            <br />
            <label for="" className="resaddlabel">
              State<span className="resspan">*</span>
            </label>
            <br />
            <input
              type="text"
              className="resinputadd"
              name="state"
              onChange={reschange}
            ></input>
            <br />
            <br />
            <label for="" className="resaddlabel">
              City<span className="resspan">*</span>
            </label>
            <br />
            <input
              type="text"
              className="resinputadd"
              name="city"
              onChange={reschange}
            ></input>
            <br />
            <br />
            <label for="" className="resaddlabel">
              Opening Time<span className="resspan">*</span>
            </label>
            <br />
            <input
              type="text"
              className="resinputadd"
              name="time"
              onChange={reschange}
            ></input>
            <br />
            <br />
            <label for="" className="resaddlabel">
              Image<span className="resspan">*</span>
            </label>
            <br />
            <input
              type="file"
              className="resinputadd"
              name="image"
              onChange={imageHandler}
            ></input>
            <br />
            <br />
            <div className="adresbut">
              <button type="submit" className="resbutton">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
