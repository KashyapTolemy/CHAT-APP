import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../Register/style.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import { registerRoute } from "../../utils/APIRoutes";

const Register = () => {
  const handleSubmit = async(event) => {
    event.preventDefault();
    if(handleValidation()){
      console.log("In validation",registerRoute)
      const { username, email, password, confirmPassword } = values;
      const {data} =await axios.post(registerRoute,{
        username,
        email,
        password
      });
    }
  };
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
  };
  const handleValidation = () => {
    const { username, email, password, confirmPassword } = values;
    if (password != confirmPassword) {
      toast.error(
        "Password and Confirm Password should be the same. ", toastOptions
      );
      return false;
    } else if (username.length < 4) {
      toast.error(
        "Username should be greater than 3 characters. ", toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be greater than or equal to 8 characters. ", toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error(
        "Email is required. ", toastOptions
      );
      return false;
    }
    return true;
  };
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.smallLight}></div>
        <form className={styles.form} onSubmit={(event) => handleSubmit(event)}>
          <div className={styles.brand}>
            <img src="/images/2.png" className={styles.image}></img>
            <h1>Chatify</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            className={styles.username}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            className={styles.email}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className={styles.password}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            className={styles.confirmPassword}
            onChange={(e) => handleChange(e)}
          />
          <button className={styles.submit} type="submit">Create User</button>
          <span className={styles.loginlink}>
            Already have an account? <Link to="/login" className={styles.login}>Login.</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
