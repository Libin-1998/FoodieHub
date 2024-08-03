import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  const logs = sessionStorage.getItem("isLogin");
  console.log(logs);

  const roles = sessionStorage.getItem("role");

  const removes = () => {
    sessionStorage.clear();
  };

  return (
    <>
      <div className="container-fluid navbar">
        <img
          src={"/images/logo-food.png"}
          height={"70px"}
          width={"150px"}
          className="foodlog"
        ></img>
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
                  <a className="nav1" href="">
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

              <li>
                <Link to={"/cart"}>
                  <a className="nav1" href="">
                    Cart
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
                ""
              )}

              <li>
                <Link to={"/profile"}>
                  <a className="nav1" href="">
                    Profile
                  </a>
                </Link>
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
                <Link to={"/food"}>
                  <a className="nav1" href="">
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
