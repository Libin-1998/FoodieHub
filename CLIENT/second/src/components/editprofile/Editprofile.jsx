import React, { useEffect, useState } from "react";
import "./Editprofile.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { postData } from "../../redux/reducers/Profileslice";
import { toast, ToastContainer } from "react-toastify";

export default function Editprofile() {
  const navigate = useNavigate();

  const dataprofile = useSelector((state) => state.myProfile.profileData);
  console.log(dataprofile);

  const dispath = useDispatch();
  const { id } = useParams();
  console.log(id);

  const [data, Setdata] = useState({
    // id:id,
    firstname: "",
    mobile: "",
    emailaddress: "",
  });
  console.log(data);

  useEffect(() => {
    axios
      .get(`https://foodiehub-ujkn.onrender.com/api/foodlogin/profile/${id}`)
      .then((response) => {
        console.log(response);
        Setdata(response.data.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const dataChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    Setdata({ ...data, [name]: value });
  };

 

    dispath(postData(data));
    
    const handleSubmit = (event) => {
      event.preventDefault();
    // toast.success('profile updated')

    setTimeout(() => {
      navigate("/profile");
    }, 3000);
  };

  return (
    <>
      <div className="profileeditpage">
        <ToastContainer/>
        <h1 className="editprofilehead" >Profile Edit</h1>
        <form class="editprofilecolorful-form">
          <div class="editprofileform-group">
            <label class="editprofileform-label" for="name">
              Name:
            </label>
            <input
              required=""
              class="editprofileform-input"
              type="text"
              value={data.firstname}
              onChange={dataChange}
              name="firstname"
            />
          </div>
          <div class="editprofileform-group">
            <label class="editprofileform-label" for="name">
              Mobile:
            </label>
            <input
              required=""
              class="editprofileform-input"
              type="number"
              value={data.mobile}
              onChange={dataChange}
              name="mobile"
            />
          </div>
          <div class="editprofileform-group">
            <label class="editprofileform-label" for="email">
              Email:
            </label>
            <input
              required=""
              class="editprofileform-input"
              name="email"
              id="email"
              type="email"
              value={data.emailaddress}
              onChange={dataChange}
            />
          </div>

          <button
            class="editprofileform-button"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
