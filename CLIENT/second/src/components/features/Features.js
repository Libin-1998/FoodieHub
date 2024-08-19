import React from 'react'
import "./Features.css"

export default function Features() {
  return (
    <>
    <div className='bgcolors'>
      <h1 className='features'>Featured Restaurants</h1>
       <div className='featurerow'>
         <div className='column'>
            <hr></hr>

            <div className='defaultrow'>
            <div className='column'>
            <img src={'./images/defaulticon.png'}height={'100px'} width={'100px'}></img>
            </div>
            <div className='column'>
            <p><b>Deva</b><br/>
            Indian , Chinese , Healthy , Pizza , Vegitarian <br/>
            B-46 Near Veena Clinic Vikas Nagar Uttam Nagar<br/>
            Delivery<i class="fa-light fa-circle-check"></i>
            Pick-up<i class="fa-light fa-circle-check"></i>
            Dinein<i class="fa-light fa-circle-check"></i>  
            </p>
            </div>
            </div>
          </div>
          <div className='column'>
            <hr></hr>
            <div className='defaultrow'>
            <div className='column'>
            <img src={'./images/icondefault.png'}height={'100px'} width={'100px'}></img>
            </div>

            <div className='column'>
            <p><b>Restaurant Two</b><br/>
            American, Indian, Thai, Chinese, Pizza<br/>
            Connaught Place New Delhi Delhi 110001<br/>
            Delivery<i class="fa-light fa-circle-check"></i>
            Pick-up<i class="fa-light fa-circle-check"></i>
            Dinein<i class="fa-light fa-circle-check"></i>  
            </p>
            </div>
            </div>
          </div>
      </div>
      </div>

    </>
  )
}
