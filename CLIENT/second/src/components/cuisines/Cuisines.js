import React from 'react'
import "./Cuisines.css"

export default function Cuisines() {
  return (
    <>
    <div className='container-fluid browsing'>
    <div className='row browse'>
        <div className='column'>
            <img src={'./images/cuisine.png'}></img>
        </div>
        <div className='column morespace'>
            <h3 className='center'>Browse By Cuisine</h3>
            <p className='center'>Choose From Your Favorite Cuisine</p>
            <div className='row items'>
                <div className='column'>
                    <p>American(1)<br></br>
                    Mediterranean<br></br>
                    Diner<br></br>
                    Sushi<br></br>
                    Japanese<br></br>
                    Chinese(2)<br></br>
                    Pizza(2)</p><br></br>
                </div>
                <div className='column'>
                    <p>Deli<br></br>
                    Sandwiches<br></br>
                    Italian<br></br>
                    Burgers<br></br>
                    Middle Eastern<br></br>
                    Healthy(1)<br></br>
                    Vegetarian(1)<br></br>
                    </p>
                    </div>

                <div className='lastcolumn'>
                    <p>Indian(2)<br></br>
                    Barbeque<br></br>
                    Mexican<br></br>
                    Greek<br></br>
                    Thai(1)<br></br>
                    Korean</p>
                    </div>

            </div>
        </div>
    </div>
    </div>
    </>
  )
}
