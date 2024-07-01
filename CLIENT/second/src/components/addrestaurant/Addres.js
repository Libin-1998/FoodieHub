import React, { useState } from 'react'
import "./Addres.css"
import axios from 'axios'
import {ToastContainer,toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Addres() {
    const navigate=useNavigate()

    const[resinput,setResinput]=useState({})
    
    const reschange=((event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setResinput({...resinput,[name]:value})
    })
    console.log(resinput);

    const imageHandler=(event)=>{
        setResinput({...resinput,image:event.target.files[0]})
        console.log(resinput.image);
    }

    const clickbutton=((event)=>{
        event.preventDefault()

        const formdata=new FormData()
        formdata.append('name',resinput.name)
        formdata.append('state',resinput.state)
        formdata.append('city',resinput.city)
        formdata.append('time',resinput.time)
        formdata.append('image',resinput.image)

        axios.post("http://localhost:6060/api/newres/add_res",formdata)
        .then((response)=>{
            console.log(response);
            toast.success(response.data.message)

            setTimeout(() => {
                navigate('/viewrestaurant')
            }, 3000);

            setTimeout(()=>{
                navigate('/restaurants')
            },3000)
        })
        .catch((error)=>{
            console.log(error);
            toast.error('adding failed')
        })
    })


  return (
    <>
    <div className='container-fluid'>
        <form onSubmit={clickbutton} encType='multipart/form-data'>
        <ToastContainer/>
        <h1 className='reshead'>ADD RESTAURANTS</h1>
<div className='forms'>
    <label for='' className='reslabel'>Restaurant Name<span className='resspan'>*</span></label><br/>
    <input type='text' className='resinput' name='name' onChange={reschange}></input><br/><br/>

    <label for='' className='reslabel'>State<span className='resspan'>*</span></label><br/>
    <input type='text'className='resinput' name='state' onChange={reschange}></input><br/><br/>

    <label for='' className='reslabel'>City<span className='resspan'>*</span></label><br/>
    <input type='text'className='resinput' name='city' onChange={reschange}></input><br/><br/>

    <label for='' className='reslabel'>Opening Time<span className='resspan'>*</span></label><br/>
    <input type='text'className='resinput' name='time' onChange={reschange}></input><br/><br/>

    <label for='' className='reslabel'>Image<span className='resspan'>*</span></label><br/>
    <input type='file'className='resinput' name='image' onChange={imageHandler}></input><br/><br/>

    {/* <button className='resbutton' onClick={clickbutton}>Submit</button> */}
    <button type='submit' className='resbutton'>Submit</button>
</div>
</form>
    </div>
      
    </>
  )
}
