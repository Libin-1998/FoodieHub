import React from 'react'
import './Loader.css'
import RingLoader from 'react-spinners/SyncLoader'

export default function Loader() {
  return (
    <>
    <div className='loaderpage'>
      
    <RingLoader color="#68dcd6" size={20} speedMultiplier={1} />

    </div>
    </>
  )
}
