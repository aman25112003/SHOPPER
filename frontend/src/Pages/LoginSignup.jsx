import React from "react";
import "./CSS/LoginSignup.css";
import { useState } from "react";
export const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const changeHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const login = async () => {
    let responseData;
    await fetch("https://shopper-ht1j.onrender.com/login", {
      method: "POST",
      headers: {
        Accept: "application/for-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  const signUp = async () => {
    let responseData;
    await fetch("https://shopper-ht1j.onrender.com/signup", {
      method: "POST",
      headers: {
        Accept: "application/for-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? (
            <input
              name="username"
              value={formData.username}
              onChange={(e) => changeHandler(e)}
              type="text"
              placeholder="Your Name..."
            />
          ) : (
            <></>
          )}
          <input
            name="email"
            value={formData.email}
            onChange={(e) => changeHandler(e)}
            type="email"
            placeholder="Email Address..."
          />
          <input
            name="password"
            value={formData.password}
            onChange={(e) => changeHandler(e)}
            type="password"
            placeholder="Password..."
          />
        </div>

        <button
          onClick={() => {
            state === "Login" ? login() : signUp();
          }}
        >
          Continue
        </button>
        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span
              className="span"
              onClick={() => {
                setState("Login");
              }}
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account?{" "}
            <span
              className="span"
              onClick={() => {
                setState("Sign Up");
              }}
            >
              Click here
            </span>
          </p>
        )}

        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing,i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};
