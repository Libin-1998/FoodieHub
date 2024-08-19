import React, { useEffect, useState } from "react";
import "./Home.css";
import Works from "../works/Works";
import Features from "../features/Features";
import Cuisines from "../cuisines/Cuisines";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function Home() {
  const logintoken = sessionStorage.getItem("token");
  const navigate = useNavigate();


  const [search, setSearch] = useState([]);
  const [items, Setitems] = useState([]);
  const [searchTerm,setSearchterm]=useState('')

  useEffect(()=>{
    axios.get("https://foodiehub-ujkn.onrender.com/api/newres/view",{
        headers:{Authorization:`Bearer ${logintoken}`}
    })
    .then((response)=>{
        console.log(response);
        setSearch(response.data.data)

    })
    .catch((error)=>{
        console.log(error);
    })
},[])

console.log(search);


const SearchButton= async()=>{
  if(logintoken){
    const filteredItems = search.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    console.log(filteredItems);
   Setitems(filteredItems);
  
    
    navigate(`/searchpage/${filteredItems[0]?.name}`);
    console.log(filteredItems[0]?.name);
  }
 else{
  navigate('/login')
 }


}
console.log(items) 

const dataChange=(event)=>{
  setSearchterm(event.target.value)

} 

  return (
    <>
      <div className="container-fluid food">
        <div className="near">
          <h1 className="nearyou">Find Restaurants Near You</h1>
          <p>
            <b>Order Delivery Food Online From Local Restaurants</b>
          </p>
        </div>


<div class="search homesearchbox">
    <input type="text" class="search__input homesearch"  placeholder="Restaurants"
            onChange={dataChange}
            name="search"
            value={searchTerm}/>
    <button class="search__button searching">
      
          <i class="icon fa fa-search" onClick={SearchButton}></i>

    </button>
</div>
      </div>
      <Works />
      <Features />
      <Cuisines />
    </>
  );
}
