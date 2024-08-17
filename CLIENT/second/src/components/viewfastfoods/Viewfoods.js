import React, { useEffect, useState } from 'react';
import "./Viewfoods.css";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getfoodData } from '../../redux/reducers/Foodslice';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function Viewfoods() {

  const [list, setList] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  const data = useSelector((state) => state.foods.fooddata);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const token = sessionStorage.getItem('token');
  const role = sessionStorage.getItem('role');
  const userid = sessionStorage.getItem('userlogid');

  useEffect(() => {
    dispatch(getfoodData());
  }, [dispatch]);

  useEffect(() => {
    setList(data);
  }, [data]);

  const addCartButton = (id) => {
    console.log(id);
    axios.post(`https://foodiehub-ujkn.onrender.com/api/carts/addcart/${userid}/${id}`, data)
      .then((response) => {
        console.log(response);
        navigate('/cart');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const tableDelete = (id) => {
    console.log(id);
    axios.delete(`https://foodiehub-ujkn.onrender.com/api/food/delete/${id}`)
      .then((response) => {
        console.log(response);
        toast.success(response.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };

  const searchButton = () => {
    setList(data.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())));
  };

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      {/* <div className='container-fluid viewfd'>
        <ToastContainer />
        <div className='fdsearchbox'>
          <h1 className='viewhead'>FOODS</h1>
          <div className='inputbutton'>
            <input
              type="text"
              className='foodsearch'
              onChange={handleSearchInputChange}
              value={searchTerm}
              name='search'
            />
            <button className='searchbut' onClick={searchButton}>Search</button>
          </div>
        </div>
        <table className='table'>
          <thead>
            <tr className='trs'>
              <th>S.no</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>QUALITY</th>
              <th>Image</th>
              {role === 'admin' ? (
                <th>Edit/Delete</th>
              ) : (
                <th>Buy Now</th>
              )}
            </tr>
          </thead>
          <tbody>
            {list.map((foodtable, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{foodtable.name}</td>
                <td>{foodtable.price}</td>
                <td>{foodtable.quality}</td>
                <td>
                  <img src={`/images/${foodtable.image}`} height={'80px'} width={'70px'} className='imgcircle' />
                </td>
                {role === 'admin' ? (
                  <td>
                    <button className='tdedit'>
                      <Link to={`/editfood/${foodtable._id}`} className='editlinks'>Edit</Link>
                    </button>
                    <button className='tddelete' onClick={() => tableDelete(foodtable._id)}>Delete</button>
                  </td>
                ) : (
                  <td>
                    <span onClick={() => addCartButton(foodtable._id)}>
                      <ShoppingCartIcon />
                    </span>
                    <div>Buy Now</div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}



  {/* Hello world */}
  <div className='container-fluid viewfd'>
  <ToastContainer />
  <div className='fdsearchbox'>
          <h1 className='viewhead'>FOODS</h1>
          <div className='inputbutton'>
            <input
              type="text"
              className='foodsearch'
              onChange={handleSearchInputChange}
              value={searchTerm}
              name='search'
            />
            <button className='searchbut' onClick={searchButton}>Search</button>
          </div>
        </div>
        <div className='fdd'>
        {list.map((foodtable)=>(
  <div class="viewfdcard">
    <img src={`/images/${foodtable.image}`} height={'100%'} width={'100%'} className='viewfdcard-img'></img>
  <div class="viewfdcard-info">
    <p class="viewfdtext-title">{foodtable.name}</p>
    <p class="viewfdtext-body">{foodtable.details}</p>
  </div>
  <div class="viewfdcard-footer">
  <span class="viewfdtext-title">${foodtable.price}</span>

  {role=='admin' ?(<>
<div className='adminbutton'>
 <Link to={`/editfood/${foodtable._id}`}><button className='adminedit'>edit</button></Link> 
  <button className='admindelete' onClick={() => tableDelete(foodtable._id)}>delete</button>
  </div>
  </>):(<>

  <div class="viewfdcard-button" onClick={() => addCartButton(foodtable._id)}>
    <svg class="viewfdsvg-icon" viewBox="0 0 20 20">
      <path d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"></path>
      <path d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"></path>
      <path d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"></path>
    </svg>
  </div>
  </>)}

</div>

</div>
))}
  </div>
  </div>


    </>
  );
}
