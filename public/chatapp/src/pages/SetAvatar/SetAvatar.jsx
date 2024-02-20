import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../SetAvatar/style.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import { SetAvatarRoute } from "../../utils/APIRoutes";
import { Buffer } from "buffer";
import Loader from "../../components/Loader/Loader";

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
  useEffect(() => {
    (async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login")
      }
    })();
  }, []);
  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(
        localStorage.getItem("chat-app-user")
      );

      const { data } = await axios.post(`${SetAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem(
          "chat-app-user",
          JSON.stringify(user)
        );
        navigate("/chat");
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





  return (
    <>{
      isLoading ? (
        <Loader />
      ) : (
        <div className={styles.set_avatar_container}>
            <div className={styles.select_avatar_container}>
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
                        className={styles.avatar_img}
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
          <ToastContainer className={styles.toastcontainer} />
        </div>
      )
    }
    </>
  )
}

export default SetAvatar
