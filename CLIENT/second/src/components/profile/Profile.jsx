import React, { useEffect, useState } from 'react'
import './Profile.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Profile() {

    const id=sessionStorage.getItem('userlogid')

    const [state,Setstate]=useState({})

useEffect(()=>{
    axios.get(`http://localhost:6060/api/foodlogin/profile/${id}`)
    .then((response)=>{
        console.log(response);
        Setstate(response.data.data[0])
    })
    .catch((error)=>{
        console.log(error);
    })
},[])

  return (
    <>
    <div className='profilepage'>
    <div class="profilecard">
  <div class="profileimage"></div>
  <div class="profilecard-info">
    <span>{state.firstname}</span>
    <p className='profilePclass'>{state.mobile}</p>
    <p className='profilePclass'>{state.emailaddress}</p>
    <p className='profilePclass'>{state.confirmpassword}</p>

  </div>
  <Link to={`/editprofile/${state._id}`}>
  <a href="" class="profilebutton">Update</a>
  </Link>
</div>
      
    </div>
    </>
  )
}
