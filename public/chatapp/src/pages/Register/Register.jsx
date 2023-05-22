import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../Register/style.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

const Register = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    handleValidation()
  };
  const handleValidation = () => {
    const { username, email, password, confirmPassword } = values;
    if (password != confirmPassword) {
      toast.error(
        "Password and Confirm Password should be the same. ", {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
      }
      );
    }
  }
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
