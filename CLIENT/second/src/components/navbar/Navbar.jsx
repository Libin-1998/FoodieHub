import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function Navbar() {
  const navigate = useNavigate();

  const logs = sessionStorage.getItem("isLogin");
  console.log(logs);

  const roles = sessionStorage.getItem("role");

  const removes = () => {
    sessionStorage.clear();
  };

  const dataChange = (event) => {
    event.preventDefault();
    toast.success("Please Login First");
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };



  const clickProfile = (event) => {
    event.preventDefault();
    toast.success("Haii Admin");
    setTimeout(() => {
      navigate("/profile");
    }, 1000);
  };

  return (
    <>
     <nav class="navbar navbar-expand-lg ">
  <div class="container-fluid navhead">
    <a class="navbar-brand" href="/">
      <img
        src={"/images/logo-food.png"}
        height={"70px"}
        width={"150px"}
        className="foodlog"
      />
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav ms-auto"> 
        {logs == "true" ? (
          <>
            <a class="nav-link" href="/">
              Home
            </a>
            <a class="nav-link" href="/food">
              FastFood
            </a>
            <a class="nav-link" href="/restaurants">
              Restaurants
            </a>

            {roles == "admin" ? (
              <>
                <a class="nav-link" href="/fastfood">
                  Add Fastfoods
                </a>
                <a class="nav-link" href="/addres">
                  Add Restaurants
                </a>
                <a class="nav-link" href="" onClick={clickProfile}>
              Profile
            </a>

              </>
            ) : (
              <>
                <a class="nav-link" href="/cart">
                  Carts
                </a>
              </>
            )}
            <a class="nav-link" href="/profile">
              Profile
            </a>
            <a class="nav-link" href="/" onClick={removes}>
              Logout
            </a>
          </>
        ) : (
          <>
            <a class="nav-link" href="/">
              Home
            </a>
            <a class="nav-link" href="" onClick={dataChange}>
              FastFoods
            </a>
            <a class="nav-link" href="" onClick={dataChange}>
              Restaurants
            </a>
            <a class="nav-link" href="/login">
              Login
            </a>
            <a class="nav-link" href="/signup">
              Signup
            </a>
          </>
        )}
      </div>
    </div>
  </div>
</nav>


    </>
  );
}
