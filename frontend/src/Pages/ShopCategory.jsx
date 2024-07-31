import React, { useContext } from 'react'
import "./CSS/ShopCategory.css";
import {ShopContext} from "../Context/ShopContext";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import { Item } from '../Components/Items/Item';
import { useNavigate } from 'react-router-dom';
export const ShopCategory = (props) => {
  const navigate = useNavigate();
  const {all_products} =useContext(ShopContext);
  console.log(all_products);
  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner}/>
      <div className='shopcategory-indexSort'>
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className='shopcategory-sort'>
          Sort by <img src={dropdown_icon}/>
        </div>
      </div>

      <div className='shopcategory-products'>
        {
            all_products.map((item,index)=>{
            if(props.category===item.category)
            {
              return <Item key={index} id={item.id} name={item.name} new_price={item.new_price} old_price={item.old_price} image={item.image}/>
            }
            else
            {
              return null;
            }
          })
        }
      </div>

      <div onClick={()=>navigate("/")} className='shopcategory-loadmore'>
          Explore More
      </div>
    </div>
  )
}
