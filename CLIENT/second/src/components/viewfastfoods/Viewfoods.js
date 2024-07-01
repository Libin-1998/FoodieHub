import React, { useEffect, useState } from 'react'
import "./Viewfoods.css"
import axios from 'axios'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

export default function Viewfoods() {

    const[table,setTable]=useState([])



    useEffect(()=>{
        axios.get("http://localhost:6060/api/food/foodview")
        .then((response)=>{
            console.log(response.data.data);
            setTable(response.data.data)
        })
        .catch((error)=>{
            console.log(error);
        })

    },[])

    console.log(table);

    const tableDelete=(id)=>{
        console.log(id);
        axios.delete(`http://localhost:6060/api/food/delete/${id}`)
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
    <div className='container-fluid viewfd'>
        <ToastContainer/>
        <h1 className='viewhead'>FOODS</h1>
        <table className='table'>
            <tr>
                <th>S.no</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>QUALITY</th>
                <th>Edit/Delete</th>  
                <th>Image</th>  
            </tr>


            
                {table.map((foodtable,index)=>(
                      <tr key={index}>
                      <td>{index+1}</td>
                      <td>{foodtable.name}</td>
                      <td>{foodtable.price}</td>
                      <td>{foodtable.quality}</td>
                      <td>
                        <button className='tdedit'> <Link to={`/editfood/${foodtable._id}`}>Edit</Link></button>
                        <button className='tddelete' onClick={()=>tableDelete(foodtable._id)}>Delete</button>
                      </td>

                      <td>
                        <img src={`/images/${foodtable.image}`} height={'80px'} width={'70px'} className='imgcircle' />  
                      </td>
          
          
                      </tr>
                ))}
            
            
        </table>
    </div>
      
    </>
  )
}
