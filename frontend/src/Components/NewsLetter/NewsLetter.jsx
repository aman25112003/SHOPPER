import React from 'react';
import "./NewsLetter.css";
export const NewsLetter = () => {
  return (
    <div className='newLetter'>
        <h1>Get Exclusive Offers On Your Email</h1>
        <p>Subscribe to our NewsLetter and stay updated</p>
        <div>
            <input type='email' placeholder='Your Email id...'/>
            <button onClick={()=>{alert("Subscribed!!")}}>Subscribe</button>
        </div>
    </div>
  )
}
