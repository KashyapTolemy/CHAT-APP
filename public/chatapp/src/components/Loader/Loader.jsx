import styles from "../Loader/style.module.scss";
import React, { useState, useEffect } from "react";
import loader1 from "../../assets/loader4.gif"

const Loader = () => {
    return (
        <>
            <div className={styles.loadercontainer}>
                <div className={styles.smallLight1}></div>
                <img src={loader1} className={styles.loader1}/>
            </div>
        </>
    )
}

export default Loader
