import React, { useEffect, useState } from 'react'
import './Searchpage.css'
import { useDispatch, useSelector } from 'react-redux'
import { getfoodData } from '../../redux/reducers/Foodslice'
import { useParams } from 'react-router-dom'
import axios from 'axios'


export default function Searchpage() {

  const [datas,Setdatas]=useState([])
  const token = sessionStorage.getItem('token')

const {name}=useParams()

console.log(name);


useEffect(()=>{
  axios.get(`https://foodiehub-r5ze.onrender.com/api/newres/viewdata/${name}`,{
    headers:{Authorization:`Bearer ${token}`},
  })
  .then((response)=>{
    console.log(response);
    Setdatas(response.data.data)
    console.log(response.data.data);
  })
  .catch((error)=>{
    console.log(error);
  })
},[name])


  return (
    <>
    <div className='searchstart'>
      
    <div class="searchcard">
  <div>
    <img src={`/images/${datas.image}`} alt=""  class="searchcard-img"/>
  </div>
  <div class="searchcard-info">
    <p class="searchtext-title">{datas.name}</p>
    <p class="searchtext-body">{datas.state}</p>
    <p class="searchtext-body">{datas.city}</p>
    <p class="searchtext-body">{datas.time}</p>
  </div>
 
</div>
    </div>
    </>
  )
}
