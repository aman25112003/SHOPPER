import React, { useContext, useReducer } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from "../Assets/dropdown_new.png";
import { useRef } from "react";
export const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();

  const dropdown_toggle = (event) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    event.target.classList.toggle("open");
  };
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} />
        <p>SHOPPER</p>
      </div>
      <img
        className="nav-dropdown"
        onClick={dropdown_toggle}
        src={nav_dropdown}
      />
      <ul ref={menuRef} className="nav-menu">
        <li
          onClick={() => {
            setMenu("shop");
          }}
        >
          <NavLink
            style={{ textDecoration: "none", color: "#626262" }}
            to={"/"}
          >
            Shop
          </NavLink>
          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("mens");
          }}
        >
          <NavLink
            style={{ textDecoration: "none", color: "#626262" }}
            to={"/mens"}
          >
            Mens
          </NavLink>
          {menu === "mens" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("womens");
          }}
        >
          <NavLink
            style={{ textDecoration: "none", color: "#626262" }}
            to={"/womens"}
          >
            Women
          </NavLink>
          {menu === "womens" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("kids");
          }}
        >
          <NavLink
            style={{ textDecoration: "none", color: "#626262" }}
            to={"/kids"}
          >
            Kids
          </NavLink>
          {menu === "kids" ? <hr /> : <></>}
        </li>
      </ul>

      <div className="nav-login-cart">
        {localStorage.getItem("auth-token") ? (
          <button
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.replace("/");
            }}
          >
            Logout
          </button>
        ) : (
          <NavLink style={{ textDecoration: "none" }} to={"/login"}>
            <button>Login</button>
          </NavLink>
        )}

        <NavLink style={{ textDecoration: "none" }} to={"/cart"}>
          <img src={cart_icon} />
        </NavLink>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};
