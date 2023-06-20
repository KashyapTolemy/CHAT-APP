import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../SetAvatar/style.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import { SetAvatarRoute } from "../../utils/APIRoutes";
import { motion } from 'framer-motion';
import { Buffer } from "buffer";

const SetAvatar = () => {
  const api = 'https://api.multiavatar.com/4645646'
  const apiKey = '4zgBsur12FtEPY'
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
  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(
        localStorage.getItem("chat-app-user")
      );

      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem(
          "chat-app-user",
          JSON.stringify(user)
        );
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };
  useEffect(() => {
    (async () => {
      const data = [];
      for (let i = 0; i < 6; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}?apikey=${apiKey}`
        )
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    })();
  }, []);

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  const [cursorVariant, setCursorVariant] = useState("default");


  useEffect(() => {
    const mouseMove = e => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
    }

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    }
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
    },
    text: {
      height: 40,
      width: 40,
      x: mousePosition.x - 45,
      y: mousePosition.y - 45,
      backgroundColor: "yellow",
      mixBlendMode: "difference"
    }
  }

  const textEnter = () => setCursorVariant("text");
  const textLeave = () => setCursorVariant("default");

  return (
    <>{
      isLoading ? (
        <div className={styles.loader}>
          <div className={styles.spinnerbox}>
            <div className={styles.configureborder1}>
              <div className={styles.configurecore}></div>
            </div>
            <div className={styles.configureborder2}>
              <div className={styles.configurecore}></div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.page}>
          <div className={styles.container}>
            <div className={styles.smallLight}></div>
            <motion.div
              className={styles.cursor1}
              variants={variants}
              animate={cursorVariant}
            />
            <div onMouseEnter={textEnter} onMouseLeave={textLeave} className={styles.container1}>
              <div className={styles.title_container}>
                <h1 className={styles.title}>Pick an avatar as your profile picture. </h1>
              </div>
              <div className={styles.avatars}>
                {avatars.map((avatar, index) => {
                  return (
                    <div
                      className={`${styles.avatar} ${selectedAvatar === index ? `${styles.selected}` : ""
                        }`}
                    >
                      <img
                        className={styles.image}
                        src={`data:image/svg+xml;base64,${avatar}`}
                        alt="avatar"
                        key={avatar}
                        onClick={() => setSelectedAvatar(index)}
                      />
                    </div>
                  );
                })}
              </div>
              <button onClick={setProfilePicture} className={styles.submit}>
                Set as Profile Picture
              </button>
            </div>
          </div >
          <ToastContainer />
        </div>
      )
    }
    </>
  )
}

export default SetAvatar
