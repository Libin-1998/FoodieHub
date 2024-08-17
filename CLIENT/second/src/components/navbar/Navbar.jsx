import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";


export default function Navbar() {

  const navigate=useNavigate()

  const logs = sessionStorage.getItem("isLogin");
  console.log(logs);

  const roles = sessionStorage.getItem("role");

  const removes = () => {
    sessionStorage.clear();
  };

  const dataChange=(event)=>{
    event.preventDefault()
    toast.success('Please Login First')
    setTimeout(() => {
    navigate('/login')
    }, 3000);
  }

  const datasChange=()=>{
    toast.success('Please Login First')
    setTimeout(() => {
    navigate('/login')
    }, 3000);
  }

  const clickProfile=(event)=>{
    event.preventDefault()
toast.success('Haii Admin')
setTimeout(() => {
  navigate('/profile')
}, 1000);

  }

  return (
    <>
      <div className="container-fluid navbar">
        <img
          src={"/images/logo-food.png"}
          height={"70px"}
          width={"150px"}
          className="foodlog"
        ></img>
          
<ToastContainer/>
        <ul className="nav">
          {logs == "true" ? (
            <>
              <li>
                <Link to={"/"}>
                  <a className="nav1" href="">
                    Home
                  </a>
                </Link>
              </li>

              <li>
                <Link to={"/food"}>
                  <a className="nav1" href="" >
                    FastFood
                  </a>
                </Link>
              </li>

              <li>
                <Link to={"/restaurants"}>
                  <a className="nav1" href="">
                    Restaurants
                  </a>
                </Link>
              </li>

             

              {roles == "admin" ? (
                <>
                  <li>
                    <Link to={"/fastfood"}>
                      <a className="nav1" href="">
                        Add FastFood
                      </a>
                    </Link>
                  </li>

                  <li>
                    <Link to={"/addres"}>
                      <a className="nav1" href="">
                        Add Restaurants
                      </a>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                <li>
                <Link to={"/cart"}>
                  <a className="nav1" href="">
                    Cart
                  </a>
                </Link>
              </li>

                </>
              )}


              <li>
                {/* <Link to={"/profile"}> */}
                  <a className="nav1" href="" onClick={clickProfile}>
                    Profile
                  </a>
                {/* </Link> */}
              </li>

              <li>
                <a className="nav1" href="/" onClick={removes}>
                  Logout
                </a>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to={"/"}>
                  <a className="nav1" href="">
                    Home
                  </a>
                </Link>
              </li>

              <li>
                <Link to={"/"}>
                  <a className="nav1" href="" onClick={dataChange}>
                    FastFood
                  </a>
                </Link>
              </li>

              <li>
                <Link to={"/"}>
                  <a className="nav1" href="" onClick={datasChange}>
                    Restaurants
                  </a>
                </Link>
              </li>

              <li>
                <Link to={"/login"}>
                  <a className="nav1" href="">
                    Login
                  </a>
                </Link>
              </li>

              <li>
                <Link to={"/signup"}>
                  <a className="nav1" href="">
                    Signup
                  </a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>





    </>
  );
}




