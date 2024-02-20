import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Register/style.module.scss";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios"
import { registerRoute } from "../../utils/APIRoutes";

const Register = () => {

  const [errorShows, setErrorShows] = useState(false);
  const navigate = useNavigate()

  const helper = () => {
    setTimeout(() => {
      setErrorShows(false);
    }, 4000)
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, email, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions)
        setErrorShows(true);
        helper();
      };
      if (data.status === true) {
        const str = JSON.stringify(data.user)
        localStorage.setItem("chat-app-user", str)
        navigate("/chat")
      }
    }
  };
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme:'light',
  };
  const handleValidation = () => {
    const { username, email, password, confirmPassword } = values;
    if (password != confirmPassword) {
      toast.error(
        "Password and Confirm Password should be the same. ", toastOptions
      );
      setErrorShows(true);
      helper();
      return false;
    } else if (username.length < 4) {
      toast.error(
        "Username should be greater than 3 characters. ", toastOptions
      );
      setErrorShows(true);
      helper();
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be greater than or equal to 8 characters. ", toastOptions
      );
      setErrorShows(true);
      helper();
      return false;
    } else if (email === "") {
      toast.error(
        "Email is required. ", toastOptions
      );
      setErrorShows(true);
      helper();
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

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/chat")
    }
  })

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };



  return (
    <>
      <div className={styles.register_container}>
          <a href="./" className={styles.brand}>
            <img src="/images/logo1.png" className={styles.brand_img}></img>
            <h1 className={styles.brand_title}>Chatify</h1>
          </a>
        <form className={styles.form} onSubmit={(event) => handleSubmit(event)}>
          <div className={styles.welcome_text}>Welcome!</div>
          <input
            type="text"
            placeholder="username"
            name="username"
            className={styles.username}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="email"
            name="email"
            className={styles.email}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            className={styles.password}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="confirm password"
            name="confirmPassword"
            className={styles.confirm_password}
            onChange={(e) => handleChange(e)}
          />
          <button className={styles.submit} type="submit">Create User</button>
          <span className={styles.register_link}>
            Already have an account? <Link to="/login" className={styles.login}>Login.</Link>
          </span>
        </form>
      </div>
      <ToastContainer className={styles.toast_container}/>
    </>
  );
};

export default Register;
