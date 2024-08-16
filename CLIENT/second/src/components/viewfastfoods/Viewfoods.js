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
      </div>
    </>
  );
}
