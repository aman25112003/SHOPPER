import {React,useState,useEffect} from 'react'
import "./Popular.css"
import { Item } from '../Items/Item'
export const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    fetch("https://shopper-ht1j.onrender.com/popularinwomen")
    .then((response)=>response.json())
    .then((data)=>setPopularProducts(data));
  }, [])
  
  return (
    <div className='popular'>
        <h1>POPULAR IN WOMEN</h1>
        <hr/>
        <div className='popular-item'>
            {
              popularProducts.map((item,index)=>{
                    return <Item key={index} id={item.id} name={item.name} new_price={item.new_price} old_price={item.old_price} image={item.image}/>
                })
            }
        </div>
    </div>
  )
}
