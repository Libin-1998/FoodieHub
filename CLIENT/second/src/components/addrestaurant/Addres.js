import React, { useState } from "react";
import "./Addres.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Addres() {
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");

  const [resinput, setResinput] = useState({
    name: '',
    state: '',
    city: '',
    time: '',
    image: null,
  });

  const reschange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setResinput({ ...resinput, [name]: value });
  };
  console.log(resinput);

  const imageHandler = (event) => {
    setResinput({ ...resinput, image: event.target.files[0] });
    console.log(event.target.files[0]);
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

        setTimeout(() => {
          navigate('/restaurants');
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
        const message = error.response?.data?.message || "Adding failed";
        toast.error(message);
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
            <label htmlFor="restaurantName" className="resaddlabel">
              Restaurant Name<span className="resspan">*</span>
            </label>{" "}
            <br />
            <input
              type="text"
              id="restaurantName"
              className="resinputadd"
              name="name"
              onChange={reschange}
            ></input>
            <br />
            <br />
            <label htmlFor="restaurantState" className="resaddlabel">
              State<span className="resspan">*</span>
            </label>
            <br />
            <input
              type="text"
              id="restaurantState"
              className="resinputadd"
              name="state"
              onChange={reschange}
            ></input>
            <br />
            <br />
            <label htmlFor="restaurantCity" className="resaddlabel">
              City<span className="resspan">*</span>
            </label>
            <br />
            <input
              type="text"
              id="restaurantCity"
              className="resinputadd"
              name="city"
              onChange={reschange}
            ></input>
            <br />
            <br />
            <label htmlFor="restaurantTime" className="resaddlabel">
              Opening Time<span className="resspan">*</span>
            </label>
            <br />
            <input
              type="text"
              id="restaurantTime"
              className="resinputadd"
              name="time"
              onChange={reschange}
            ></input>
            <br />
            <br />
            <label htmlFor="restaurantImage" className="resaddlabel">
              Image<span className="resspan">*</span>
            </label>
            <br />
            <input
              type="file"
              id="restaurantImage"
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
