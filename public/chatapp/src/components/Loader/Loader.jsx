import styles from "../Loader/style.module.scss";
import React, { useState, useEffect } from "react";

const Loader = () => {
    const [name, setName] = useState("CHATIFY");
    const alphas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    useEffect(() => {
        let count = 0;
        const interval = setInterval(() => {
            let value = ["C", "H", "A", "T", "I", "F","Y"];
            for (var i = Math.floor(count); i < 7; i++) {
                value[i] = alphas[Math.floor(Math.random() * 26)];
            }
            setName(value.join(""));
            count += 1 / 30;
            console.log("lol");
        }, 10);
        return () => clearInterval(interval);
    }, []);
    return (
        <>
            <div className={styles.loadercontainer}>
                <div className={styles.smallLight1}></div>
                {/* <img src={loader1} className={styles.loader1}/> */}
                <div className={styles.loader1}>
                    <p className={styles.project}>PROJECT</p>
                    <p>{name}</p>
                </div>
            </div>
        </>
    )
}

export default Loader
