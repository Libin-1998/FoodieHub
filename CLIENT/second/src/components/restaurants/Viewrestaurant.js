import React, { useEffect, useState } from 'react'
import "./Viewrestaurant.css"
import axios from 'axios'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

export default function Viewrestaurant() {

    const logintoken=sessionStorage.getItem('token')
    const role=sessionStorage.getItem('role')

    const[card,setCard]=useState([])
    const[items,setItems]=useState([])
    const[searchTerm,setSearchterm]=useState('')


    
    useEffect(()=>{
        axios.get("https://foodiehub-ujkn.onrender.com/api/newres/view",{
            headers:{Authorization:`Bearer ${logintoken}`}
        })
        .then((response)=>{
            console.log(response);
            setCard(response.data.data)

        })
        .catch((error)=>{
            console.log(error);
        })
    },[])
    console.log(card);



    // useEffect(() => {
    //     setCard(card);
    //   }, [card]);


    //   useEffect(() => {
    //     setItems(items);
    //   }, [items]);




    const resDelete=(id)=>{
        console.log(id);
        axios.delete(`https://foodiehub-ujkn.onrender.com/api/newres/delete/${id}`)
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

    const searchbutton=(event)=>{
        event.preventDefault()
        setItems(card.filter(item=>item.name.toLowerCase().includes(searchTerm.toLowerCase())))
    }

    const dataChange=(event)=>{
    setSearchterm(event.target.value)
}

  return (
    <>
    <div className='container-fluid viewres'>
<ToastContainer/>

        <nav class="navbar-ressearchbox">
  <div class="container-fluid ressearchhead">
    <a class="navbar-brand ressearchbrand">RESTAURANTS</a>
    <form class="d-flex ressearchform" role="search" >
      <input class="form-control me-2 inputressearch" type="search" placeholder="Search" aria-label="Search"
       onChange={dataChange}
       value={searchTerm}
       name='search'/>
      <button class="btn bg-success ressearchbut" type="submit" onClick={searchbutton}>Search</button>
    </form>
  </div>
</nav>


    <div className='resrow'>

{items.map((datas)=>(

 <div className='rescol'>
    <div class="card rescard">
    <img src={`/images/${datas.image}`} className='resimgages'height={'100%'} width={'100%'}></img>
    
    <div class="rescontent card__content">
  
            <div className='restexts'>
            <h3 className='resname'>{datas.name}</h3>
            <h5>{datas.state}</h5>
            <h5>{datas.city}</h5>
            <h5>{datas.time}</h5>
            {role=='admin' ?(<>
            <button className='resedit'><Link to={`/editrestaurant/${datas._id}`} className='reseditlink'>Edit</Link></button>
            <button className='resdelete' onClick={()=>resDelete(datas._id)}>Delete</button>
            </>):('')}
            {}
            </div>
            </div>
            </div>
        </div>

))}


        </div>
    </div>
    </>
  )
}
