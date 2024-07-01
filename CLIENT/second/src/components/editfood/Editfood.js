import React, { useEffect, useState } from 'react'
import "./Editfood.css"
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export default function Editfood() {
  const navigate=useNavigate()

    const [submitfd, setsubmitfd] = useState({
        name: "",
        price: "",
        quality: "",
        image:'',
      });

      const {id}=useParams()

      useEffect(()=>{
        axios.get(`http://localhost:6060/api/food/foodview/${id}`)
        .then((response)=>{
          console.log(response);
          setsubmitfd(response.data.data)
        })
        .catch((error)=>{
          console.log(error);
        })
      },[])


      const submitchange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setsubmitfd({ ...submitfd, [name]: value });
      };
      console.log(submitfd);

      const imagechange=(event)=>{
        setsubmitfd({...submitfd,image:event.target.files[0]})
        console.log(submitfd.image);
      }
    
      const submitclick = (event) => {
        event.preventDefault();
        const data=new FormData()
        data.append('name',submitfd.name)
        data.append('price',submitfd.price)
        data.append('quality',submitfd.quality)
        data.append('image',submitfd.image)


        axios
          .put(`http://localhost:6060/api/food/update/${id}`, data)
          .then((response) => {
            console.log(response);
            
            if(response.data.updatestatus.modifiedCount===1){
              console.log(response);
            toast.success(response.data.message)
            setTimeout(()=>{
              navigate('/food')
            },2000)
          }

            else{
              toast.success('already updated')
            }


            setTimeout(()=>{
              navigate('/food')
            },2000)
          })
          .catch((error) => {
            console.log(error);
            toast.error(error.response.data.message)
          });
      };

  return (
    <>
      <div className="container-fluid bgfastfood">
        <form onSubmit={submitclick} encType='multipart/form-data'>
        {/* <form> */}
      
        <ToastContainer/>
        <h1 className="fdhead">EDIT FAST FOODS </h1>
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
                name="name" value={submitfd.name}
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
                name="price" value={submitfd.price}
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
                name="quality" value={submitfd.quality}
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
              <img src={`/images/${submitfd.image}`} width={'80px'} height={'40px'} 
              onError={(event)=>event.target.src=`/images/${submitfd?.image.name}`} />
               <br />
              <input
                type="file"
                className="filecolor"
                name="image"
                onChange={imagechange}
              ></input>
              <br />
              <br />
            
          </div>
          <div className="fdcolthree"></div>
        </div>
        <div className="butfd">
          <button type='submit' className="fdsubmit">
          {/* <button onClick={submitclick} className="fdsubmit"> */}

            Submit
          </button>
        </div>
        </form>
      </div>
    </>
  )
}
