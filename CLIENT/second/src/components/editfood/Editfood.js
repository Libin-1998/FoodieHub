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
        image:"",
      });

      const {id}=useParams()

      useEffect(()=>{
        axios.get(`https://foodiehub-ujkn.onrender.com/api/food/foodview/${id}`)
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
        data.append('details',submitfd.details)
        data.append('image',submitfd.image)


        axios
          .put(`https://foodiehub-ujkn.onrender.com/api/food/update/${id}`, data)
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
      <div className="container-fluid editbgfastfood">
        <form className='formeditfd' onSubmit={submitclick} encType='multipart/form-data'>
      
        <ToastContainer/>
        <h1 className="editfdhead">EDIT FAST FOODS </h1>
          <div className="editfdcoltwo">
          
              <label for="" className="editnamecolor">
                <b>
                  Name<span className="editspancolor">*</span>
                </b>
              </label>
              <br />
              <input
                type="text"
                className="editfdinput"
                name="name" value={submitfd.name}
                onChange={submitchange}
              ></input>
              <br />
              <br />

              <label for="" className="editnamecolor">
                <b>
                  Price<span className="editspancolor">*</span>
                </b>
              </label>
              <br />
              <input
                type="text"
                className="editfdinput"
                name="price" value={submitfd.price}
                onChange={submitchange}
              ></input>
              <br />
              <br />

              <label for="" className="editnamecolor">
                <b>
                  Details<span className="editspancolor">*</span>
                </b>
              </label>
              <br />
              <input
                type="text"
                className="editfdinput"
                name="details" value={submitfd.details}
                onChange={submitchange}
              ></input>
              <br />
              <br />

              <label for="" className="editnamecolor">
                <b>
                  image<span className="editspancolor">*</span>
                </b>
              </label>

              <br />
              <img src={`/images/${submitfd.image}`} width={'80px'} height={'40px'} 
              onError={(event)=>event.target.src=`/images/${submitfd?.image.name}`} />
               <br />
              <input
                type="file"
                className="editfilecolor"
                name="image"
                onChange={imagechange}
              ></input>
              <br />
              <br />
            
        </div>
        <div className="editbutfd">
          <button type='submit' className="editfdsubmit">

            Submit
          </button>
        </div>
        </form>
      </div>
    </>
  )
}
