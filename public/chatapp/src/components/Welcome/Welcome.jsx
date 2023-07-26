import styles from "../Welcome/style.module.scss";
import React, { useState, useEffect } from "react";
import Robot from '../../assets/welcome.gif'

const Welcome = ({ currentUser }) => {
  const [str,setStr]=useState("");
  useEffect(()=>{
    const stringa =currentUser.username;
    setStr(stringa.charAt(0).toUpperCase()+stringa.slice(1));
    console.log(str);
  })
  return (
    <>
      <div className={styles.container}>
        <div className={styles.imagif}>
          <img className={styles.image} src={Robot} alt="" />
        </div>
        <div className={styles.text}>
          <h1 className={styles.t1}>
            Welcome, <span className={styles.t2}>{str}!!</span>
          </h1>
          <h2 className={styles.t3}>Please select a chat to start messaging.</h2>
        </div>

      </div>
    </>
  )
}

export default Welcome
