import React, { useEffect, useState } from "react";
import "./Editrestaurant.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function Editrestaurant() {
  const navigate=useNavigate()
  const [resinput, setResinput] = useState({
    name:'',
    state:'',
    city:'',
    time:'',
    image:'',
  });

  const { id } = useParams();

  useEffect(() => {

    axios.get(`https://foodiehub-ujkn.onrender.com/api/newres/view/${id}`)
      .then((response) => {
        console.log(response);
        setResinput(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },[]);

  const reschange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setResinput({ ...resinput, [name]: value });
  };
  console.log(resinput);

  const imageChange=(event)=>{
    setResinput({...resinput,image:event.target.files[0]})
    console.log(resinput.image);
  }

  const clickbutton = (event) => {
    event.preventDefault();

    const data=new FormData()
    data.append('name',resinput.name)
    data.append('state',resinput.state)
    data.append('city',resinput.city)
    data.append('time',resinput.time)
    data.append('image',resinput.image)

    axios
      .put(`https://foodiehub-ujkn.onrender.com/api/newres/update/${id}`,data)
      .then((response) => {
        console.log(response);

        if(response.data.updatestatus.modifiedCount===1){
        toast.success(response.data.message)
        
        setTimeout(()=>{

          navigate('/restaurants')
        },2000)

        }
        else{
          toast.success('already updated')
        }

        setTimeout(()=>{

          navigate('/restaurants')
        },2000)


      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message)
      });
  };

  return (
    <>
      <div className="container-fluid">
        <form onSubmit={clickbutton}>
        <ToastContainer/>
        <h1 className="reshead">EDIT RESTAURANTS</h1>
        <div className="form">
          <label for="" className="reslabel">
            Restaurant Name<span className="resspan">*</span>
          </label>
          <br />
          <input
            type="text"
            className="resinput"
            name="name" value={resinput.name}
            onChange={reschange}
          ></input>
          <br />
          <br />

          <label for="" className="reslabel">
            State<span className="resspan">*</span>
          </label>
          <br />
          <input
            type="text"
            className="resinput"
            name="state" value={resinput.state}
            onChange={reschange}
          ></input>
          <br />
          <br />

          <label for="" className="reslabel">
            City<span className="resspan">*</span>
          </label>
          <br />
          <input
            type="text"
            className="resinput"
            name="city" value={resinput.city}
            onChange={reschange}
          ></input>
          <br />
          <br />

          <label for="" className="reslabel">
            Opening Time<span className="resspan">*</span>
          </label>
          <br />
          <input
            type="text"
            className="resinput"
            name="time" value={resinput.time}
            onChange={reschange}
          ></input>
          <br />
          <br />

          <label for="" className="reslabel">
            Upload image<span className="resspan">*</span>
          </label>
          <br />
          <img src={`/images/${resinput.image}`} height={'50px'} className="imgedit" 
          onError={(event)=>event.target.src=`/images/${resinput?.image.name}`}>
        
          </img>
          <br />
          <input
            type="file"
            className="resinput"
            name="image"
            //  value={resinput.time}
            onChange={imageChange}
          ></input>
          <br />
          <br />

        </div>
        <div className="reseditbutton">
          <button type="submit" className="resbutton">
            Submit
          </button>
          </div>
        </form>
      </div>
    </>
  );
}
