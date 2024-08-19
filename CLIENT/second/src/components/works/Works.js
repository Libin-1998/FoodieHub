import React from 'react'
import "./Works.css"

export default function Works() {
  return (
    <>
    <div className='container-fluid work'>
        <div className='how'>
        <h2>How it works</h2>
        <p>Get your favorite food in 4 simple steps</p>
        </div>

        <div className='fullrow'>
            <div className='one'>
                <img src={'./images/searchicon.png'}></img>
                <h3>Search</h3>
                <p>Find all restaurants available near you</p>
            </div>
            <div className='two'>
                <img src={'./images/chooseicon.png'}></img>
                <h3>Choose</h3>
                <p>Browse hundreds of menus to find the food you like</p>
            </div>
            <div className='three'>
                <img src={'./images/payicon.png'}></img>
                <h3>Pay</h3>
                <p>It's quick, secure and easy</p>
            </div>
            <div className='four'>
                <img src={'./images/enjoyicon.png'}></img>
                <h3>Enjoy</h3>
                <p>Food is prepared & delivered to your door</p>
            </div>
        </div>
    </div>

      
    </>
  )
}
