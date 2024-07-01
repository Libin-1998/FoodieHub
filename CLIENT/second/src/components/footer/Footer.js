import React, { useState } from "react";
import "./Footer.css";

export default function Footer() {
 return (
    <>
      <div className="foot">
        <div className="subscribe">
          <h2>Subscribe to our newsletter</h2>
          <input
            type="email"
            placeholder="Email"
            className="emailinput"
          ></input>
          <button className="subscribebutton">Subscribe</button>
        </div>
        <hr></hr>
        <div className=" footerrow">
          <div className="column">
            <p>
              Kolkata India<br></br>
              Call Us +91-9804636313<br></br>
              info@foodapp.in
            </p>
          </div>

          <div className="column">
            <h5>Menu</h5>
          </div>
          <div className="column">
            <h5>Others</h5>
          </div>

          <div className="column">
            <h5>Contact with us</h5>
          </div>
        </div>
      </div>
    </>
  );
}
