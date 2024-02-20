import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Login/style.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import { loginRoute } from "../../utils/APIRoutes";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const [errorShows, setErrorShows] = useState(false);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };
  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/chat")
    }
  }, [])

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const helper = () => {
    setTimeout(() => {
      setErrorShows(false);
    }, 4000)
  }

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Username and Password is required.", toastOptions);
      setErrorShows(true);
      helper();
      return false;
    } else if (password === "") {
      toast.error("Username and Password is required.", toastOptions);
      setErrorShows(true);
      helper();
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        setErrorShows(true);
        helper();
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        // localStorage.setItem(
        //   process.env.REACT_APP_LOCALHOST_KEY,
        //   JSON.stringify(data.user)
        // );
        const str = JSON.stringify(data.user)
        localStorage.setItem("chat-app-user", str)
        navigate("/chat");
      }
    }
  };



 


  return (
    <>
      <div className={styles.login_container}>
          <a href= "./" className={styles.brand}>
            <img src="/images/logo1.png" className={styles.brand_img}></img>
            <h1 className={styles.brand_title}>Chatify</h1>
          </a>
        <form className={styles.form} onSubmit={(event) => handleSubmit(event)}>
          <div className={styles.welcome_text}>Welcome!</div>
          <input
            type="text"
            placeholder="username"
            name="username"
            min="4"
            className={styles.username}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            className={styles.password}
            onChange={(e) => handleChange(e)}
          />
          <button type="submit" className={styles.submit}>Sign In</button>
          <span className={styles.login_link}>
            Don't have an account? <Link to="/register" className={styles.register}>Create One.</Link>
          </span>
        </form>
      </div>
      <ToastContainer className={styles.toast_container} />
    </>
  );
}
