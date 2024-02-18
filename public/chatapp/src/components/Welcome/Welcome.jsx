import styles from "../Welcome/style.module.scss";
import React, { useState, useEffect } from "react";

const Welcome = ({ currentUser }) => {
  const [str,setStr]=useState("");
  useEffect(()=>{
    const stringa =currentUser.username;
    setStr(stringa.charAt(0).toUpperCase()+stringa.slice(1));
  })
  return (
    <>
      <div className={styles.welcome_page}>
        <div className={styles.img_container}>
          <img className={styles.welcome_img} src='./stickers/chat3.png' alt="" />
        </div>
        <div className={styles.text_container}>
          <div className={styles.welcome_text}>
            Welcome, <span className={styles.welcome_name}>{str}!!</span>
          </div>
          <div className={styles.welcome_para}>Please select a chat to start messaging.</div>
        </div>

      </div>
    </>
  )
}

export default Welcome
