import React from 'react'
import "./Offers.css"
import exclusive_image from "../Assets/exclusive_image.png"
import { useNavigate } from 'react-router-dom';
export const Offers = () => {
  const navigate = useNavigate();
  return (
    <div className='offers'>
        <div className='offers-left'>
            <h1>Exclusive</h1>
            <h1>Offers for you</h1>
            <p>ONLY ON BEST SELLERS PRODUCT</p>
            <button onClick={()=>navigate("/womens")}>Check Now</button>
        </div>
 
        <div className='offers-right'>
            <img src={exclusive_image}/>
        </div>
    </div>
  )
}
