import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./Fastfood.css";
import { ToastContainer, toast } from "react-toastify";

export default function Fastfood() {


  const token=sessionStorage.getItem('token')

  const [submitfd, setsubmitfd] = useState({});
  const navigate=useNavigate()


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
    formdata.append('details',submitfd.details)
    formdata.append('image',submitfd.image)


    axios
      .post("https://foodiehub-ujkn.onrender.com/api/food/add", formdata,
        {headers:{Authorization:`Bearer ${token}`}}
      )
      .then((response) => {
        console.log(response);
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
      <form onSubmit={submitclick} encType="multipart/form-data">

        <ToastContainer/>
        <div className="foodrow">

          <div className="fdcoltwo">
          <h1 className="fdhead">FAST FOODS </h1>

              <label for="" className="viewfdnamecolor">
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

              <label for="" className="viewfdnamecolor">
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

              <label for="" className="viewfdnamecolor">
                <b>
                  Details<span className="spancolor">*</span>
                </b>
              </label>
              <br />
              <input
                type="text"
                className="fdinput"
                name="details"
                onChange={submitchange}
              ></input>
              <br />
              <br />

              <label for="" className="viewfdnamecolor">
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

              <div className="butfd">
          <button type="submit" className="fdsubmit">
            Submit
          </button>
        </div>
          </div>
        </div>
       
        </form>

      </div>
    </>
  );
}
