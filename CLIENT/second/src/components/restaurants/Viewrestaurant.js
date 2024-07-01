import React, { useEffect, useState } from 'react'
import "./Viewrestaurant.css"
import axios from 'axios'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

export default function Viewrestaurant() {

    const[card,setCard]=useState([])

    useEffect(()=>{
        axios.get("http://localhost:6060/api/newres/view")
        .then((response)=>{
            console.log(response);
            setCard(response.data.data)

        })
        .catch((error)=>{
            console.log(error);
        })
    },[])
    console.log(card);

    const resDelete=(id)=>{
        console.log(id);
        axios.delete(`http://localhost:6060/api/newres/delete/${id}`)
        .then((response)=>{
            console.log(response);
            toast.success(response.data.message)

            setTimeout(() => {
            window.location.reload()
                
            }, 2000);
        })
        .catch((error)=>{
            console.log(error);
            toast.error(error.response.data.message)
        })
        
    }

  return (
    <>
    <div className='container-fluid viewres'>
<ToastContainer/>
        <h1 className='honeres'>RESTAURANTS</h1>

    <div className='resrow'>
        {card.map((fivestar)=>(
            <div className='rescol'>
            <img src={`/images/${fivestar.image}`} className='resimgone'></img>
            <div className='wordsalign'>
            <h2>{fivestar.name}</h2>
            <h3>{fivestar.state}</h3>
            <h3>{fivestar.city}</h3>
            <h3>{fivestar.time}</h3>
            <button className='resedit'><Link to={`/editrestaurant/${fivestar._id}`}>Edit</Link></button>
            <button className='resdelete' onClick={()=>resDelete(fivestar._id)}>Delete</button>

            </div>
        </div>

        ))}
        
        </div>
    </div>
    </>
  )
}
