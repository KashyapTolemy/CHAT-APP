import styles from "../Loader/style.module.scss";
import React from "react";

const Loader = () => {
    return (
        <>
            <div className={styles.loader_page}>
                <img src="./stickers/lstar1.png" alt ="" className={styles.star1}/>
                <div className={styles.loader_container}>
                    <div className={styles.loader_navbar}>
                        <div className={styles.circles}>
                            <div className={styles.circle1}></div>
                            <div className={styles.circle2}></div>
                            <div className={styles.circle3}></div>
                        </div>
                        <div className={styles.extras}>
                            <img src="./images/small.png" alt ="" className={styles.minimize} />
                            <img src="./images/cancel.png" alt ="" className={styles.cross} />
                        </div>
                    </div>
                    <div className={styles.loader_content}>
                        <div className={styles.loader_title}>
                            Loading...
                        </div>
                        <div className={styles.loader_bars}>
                            <div className={styles.bar1}></div>
                            <div className={styles.bar}></div>
                            <div className={styles.bar}></div>
                            <div className={styles.bar}></div>
                            <div className={styles.bar}></div>
                            <div className={styles.bar}></div>
                            <div className={styles.bar}></div>
                            <div className={styles.bar_moving}></div>
                        </div>
                    </div>
                </div>
                <img src="./stickers/lstar3.png" alt ="" className={styles.star2}/>
            </div>
        </>
    )
}

export default Loader
