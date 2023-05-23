import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Register/style.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import { SetAvatarRoute } from "../../utils/APIRoutes";
import { motion } from 'framer-motion';
import { Buffer } from "buffer";

const SetAvatar = () => {
  const api = `https://api.multiavatar.com/4645646.png?apikey=4zgBsur12FtEPY`;
  const navigate = useNavigate()
  const [avatars, setAvatars] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedAvatar, setSelectedAvatar] = useState(undefined)
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
  };
  const setProfilePicture = async () => {}
  useEffect(async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `${api}/${Math.round(Math.random() * 10000)}`
      );
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));
    }
    setAvatars(data);
    setIsLoading(false);
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title_container}>
          <h1 className={styles.title}>Pick an Avatar as your profile picture. </h1>
        </div>
        <div className={styles.avatar}>

        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default SetAvatar
