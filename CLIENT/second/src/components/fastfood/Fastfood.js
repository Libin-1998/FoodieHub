import React, { useState } from "react";
import "./Fastfood.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Fastfood() {
  const navigate=useNavigate()
  const [submitfd, setsubmitfd] = useState({
    name: "",
    price: "",
    quality: "",
  });
  const submitchange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setsubmitfd({ ...submitfd, [name]: value });
  };
  console.log(submitfd);

  const imageHandler=(event)=>{
    setsubmitfd({...submitfd,image:event.target.files[0]})
    console.log(submitfd.image);
  }

  const submitclick = (event) => {
    event.preventDefault();
    const formdata=new FormData()
    formdata.append('name',submitfd.name)
    formdata.append('price',submitfd.price)
    formdata.append('quality',submitfd.quality)
    formdata.append('image',submitfd.image)


    axios
      .post("http://localhost:6060/api/food/add", formdata)
      .then((response) => {
        // console.log(response);
        console.log(response.data.message);
        toast.success(response.data.message)

        setTimeout(()=>{
        navigate('/food')

        },2000)

      })
      .catch((error) => {
        console.log(error);
        toast.error('error to add')

      });
  };

  return (
    <>
      <div className="container-fluid bgfastfood">
      <form onSubmit={submitclick}>

        <ToastContainer/>
        <h1 className="fdhead">FAST FOODS </h1>
        <div className="foodrow">
          <div className="fdcolone"></div>
          <div className="fdcoltwo">

              <label for="" className="namecolor">
                <b>
                  Name<span className="spancolor">*</span>
                </b>
              </label>
              <br />
              <input
                type="text"
                className="fdinput"
                name="name"
                onChange={submitchange}
              ></input>
              <br />
              <br />

              <label for="" className="namecolor">
                <b>
                  Price<span className="spancolor">*</span>
                </b>
              </label>
              <br />
              <input
                type="text"
                className="fdinput"
                name="price"
                onChange={submitchange}
              ></input>
              <br />
              <br />

              <label for="" className="namecolor">
                <b>
                  Quality<span className="spancolor">*</span>
                </b>
              </label>
              <br />
              <input
                type="text"
                className="fdinput"
                name="quality"
                onChange={submitchange}
              ></input>
              <br />
              <br />

              <label for="" className="namecolor">
                <b>
                image<span className="spancolor">*</span>
                </b>
              </label>
              <br />
              <input
                type="file"
                className="filecolor"
                name="image"
                onChange={imageHandler}
              ></input>
              <br />
              <br />

          </div>
          <div className="fdcolthree"></div>
        </div>
        <div className="butfd">
          <button type="submit" className="fdsubmit">
            Submit
          </button>
        </div>
        </form>

      </div>
    </>
  );
}
