import {React,useState,useEffect} from 'react';
import "./NewCollections.css";
import { Item } from '../Items/Item';
export const NewCollections = () => {
  const [new_collection, setNew_collection] = useState([]);

  useEffect(() => {
    fetch("https://shopper-ht1j.onrender.com/newcollection")
    .then((response)=>response.json()).then((data)=>setNew_collection(data));
  }, [])
  

  return (
    <div className='newCollections'>
        <h1>NEW COLLECTIONS</h1>
        <hr/>
        <div className='collections'>
            {
                new_collection.map((item,index)=>{
                    return <Item key={index} id={item.id} name={item.name} new_price={item.new_price} old_price={item.old_price} image={item.image}/>
                })  
            }
        </div>
    </div>
  )
}
