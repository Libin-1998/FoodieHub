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

    const searchbutton=()=>{
        setItems(card.filter(item=>item.name.toLowerCase().includes(searchTerm.toLowerCase())))
    }
    console.log(items);

    const dataChange=(event)=>{
    setSearchterm(event.target.value)
}

  return (
    <>
    <div className='container-fluid viewres'>
<ToastContainer/>

<div className='ressearchbox'>
          <h1 className='resviewhead'>RESTAURANT</h1>
          <div className='resinputbutton'>
            <input
              type="text"
              className='ressearch'
              onChange={dataChange}
              name='search'
              value={searchTerm}
             
            />
            <button className='ressearchbut' onClick={searchbutton}>Search</button>
          </div>
        </div>

    <div className='resrow'>

        {items.length==0 ?(<>
        
        {card.map((fivestar)=>(
            
            <div className='rescol'>
            <img src={`/images/${fivestar.image}`} className='resimgone'></img>
            <div className='wordsalign'>
            <h2>{fivestar.name}</h2>
            <h3>{fivestar.state}</h3>
            <h3>{fivestar.city}</h3>
            <h3>{fivestar.time}</h3>
            {role=='admin' ?(<>
            <button className='resedit'><Link to={`/editrestaurant/${fivestar._id}`} className='reseditlink'>Edit</Link></button>
            <button className='resdelete' onClick={()=>resDelete(fivestar._id)}>Delete</button>
            </>):('')}
            {}
            </div>
        </div>
        ))}
        
        </>):(<>
        {items.map((datas)=>(

<div className='rescol'>
            <img src={`/images/${datas.image}`} className='resimgone'></img>
            <div className='wordsalign'>
            <h2>{datas.name}</h2>
            <h3>{datas.state}</h3>
            <h3>{datas.city}</h3>
            <h3>{datas.time}</h3>
            {role=='admin' ?(<>
            <button className='resedit'><Link to={`/editrestaurant/${datas._id}`} className='reseditlink'>Edit</Link></button>
            <button className='resdelete' onClick={()=>resDelete(datas._id)}>Delete</button>
            </>):('')}
            {}
            </div>
        </div>

))}
         
        </>)}
        
        </div>
    </div>
    </>
  )
}
