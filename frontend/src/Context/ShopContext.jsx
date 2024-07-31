import React, { createContext } from "react";
import { useState, useEffect } from "react";
export const ShopContext = createContext(null);
const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_products, setAll_Products] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());
  console.log(all_products);
  useEffect(() => {
    fetch("https://shopper-ht1j.onrender.com/allproducts")
      .then((response) => response.json())
      .then((data) => setAll_Products(data));
      if(localStorage.getItem("auth-token")){
        fetch("https://shopper-ht1j.onrender.com/getcart",{
          method:"POST",
          headers:{
            Accept:'application/form-data',
            "auth-token":`${localStorage.getItem("auth-token")}`,
            "Content-Type":'application/json'
          },
          body:"",
        })
        .then((response)=>response.json())
        .then((data)=> setCartItems(data));
      }
    }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] + 1,
    }));
    if (localStorage.getItem("auth-token")) {
      fetch("https://shopper-ht1j.onrender.com/addtocart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };


  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] - 1,
    }));
    if (localStorage.getItem("auth-token")) {
      fetch("https://shopper-ht1j.onrender.com/removefromcart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };


  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const itemQuantity = cartItems[itemId];
      if (itemQuantity > 0) {
        const itemInfo = all_products.find(
          (product) => product.id === Number(itemId)
        );
        if (itemInfo) {
          totalAmount += itemInfo.new_price * itemQuantity;
        } else {
          console.error(`Product with id ${itemId} not found.`);
        }
      }
    }
    return totalAmount;
};

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };


  const contextValue = {
    getTotalCartAmount,
    all_products,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
