import React from 'react'
import "./Home.css"
import Works from '../works/Works'
import Features from '../features/Features'
import Cuisines from '../cuisines/Cuisines'

export default function Home() {
  return (
    <>
      <div className='container food'>
    <div className='near'>
          <h1 className='nearyou'>Find Restaurants Near You</h1>
          <p><b>Order Delivery Food Online From Local Restaurants</b></p>
        </div>
        <div className='searchbox'>
        <input type='text' placeholder='Street Address,City,State'className='search'>
        </input>
        <i class="icon fa fa-search"></i>
        </div>

        </div>
        <Works/>
        <Features/>
        <Cuisines/>

    </>
  )
}
