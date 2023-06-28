import styles from "../Logout/style.module.scss";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {AiOutlineLogout} from 'react-icons/ai' 
const Logout = () => {
  const navigate =useNavigate();
  const handleClick =async()=>{
    console.log("working")
    localStorage.clear();
    navigate('/login');
  }
  return (
    <>
    <div className={styles.buttonicon} onClick={handleClick}>
      <AiOutlineLogout className={styles.buttonicon} onClick={handleClick}/>
      {/* Log Out */}
    </div>
    </>
  )
}

export default Logout
