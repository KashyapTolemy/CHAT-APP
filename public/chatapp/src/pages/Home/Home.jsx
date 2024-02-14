import React, { useState, useEffect } from "react";
import styles from "../Home/style.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa"
import { AiFillMessage, AiFillInstagram, AiFillLinkedin, AiFillGithub } from "react-icons/ai"
import { motion } from 'framer-motion';
import logo from "/images/logo1.png";
import Loader from "../../components/Loader/Loader";
// import axios from "axios";
// import { allUsersRoute, getAllMessageRoute } from "../../utils/APIRoutes";

const Home = () => {
    const navigate = useNavigate();
    const [clicked, setClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setIsLoading(false);
    //     }, 4000);
    // }, []);

    const helper = () => {
        setClicked(!clicked);
    }

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
            backgroundColor: "transparent",
            mixBlendMode: "difference"
        }
    }



    const textEnter = () => setCursorVariant("text");
    const textLeave = () => setCursorVariant("default");
    return (
        <>{
            isLoading ? (
                <Loader />
            ) : (
                <div className={styles.home_container}>
                    <div className={styles.home_page1}>
                        <div className={styles.navbar}>
                            <div className={styles.brand}>
                                <img src="/images/logo1.png" className={styles.brand_img}></img>
                                <h1 className={styles.brand_title}>Chatify</h1>
                            </div>
                            <div className={styles.navbar_btn}>
                                <Link to="/login" className={styles.navbar_login}>LOGIN</Link>
                                <Link to="/register" className={styles.navbar_register}>REGISTER</Link>
                            </div>
                        </div>
                        <div className={styles.home_taglinecontainer}>
                            <p className={styles.home_tagline}>
                                CONVERSATIONS & COMMUNITY<br />IN <span className={styles.home_oneplace}>ONE PLACE</span>
                            </p>
                            <img src="./stickers/nbsticker1.png" alt="" className={styles.home_sticker1} />
                            <img src="./stickers/nbsticker5.png" alt="" className={styles.home_sticker2} />
                        </div>
                        <div className={styles.home_subtagline_container}>

                            <p className={styles.home_subtagline}>Where Communication Comes Alive. Connect Seamlessly and Explore the Dynamics of Conversation!<br />Join the Chatify community today.</p>
                            <Link to="/chat" className={styles.home_getstarted} >Get Started</Link>
                        </div>
                    </div>
                    <div className={styles.home_page2}>
                        <div className={styles.home_welcome}>
                            <p>WELCOME TO PROJECT <br /><span className={styles.home_brandname}>CHATIFY</span></p>
                        </div>
                        <div className={styles.home_twoparas}>
                            <div className={styles.home_paracontainer}>
                                <div className={styles.home_problempara}>
                                    <div className={styles.para_title}>PROBLEM</div>
                                    In the world of online communication, finding a centralized space to connect with friends, family, and colleagues without the hassle of juggling between apps poses a significant challenge.
                                </div>
                                <img src="./stickers/nbsticker2.png" alt="" className={styles.home_sticker3} />
                            </div>
                            <div className={styles.home_paracontainer}>

                                <img src="./stickers/nbsticker4.png" alt="" className={styles.home_sticker4} />
                                <div className={styles.home_taskpara}>
                                    <div className={styles.para_title}>TASK</div>
                                    With our chat website, we bring all your conversations together under one roof, offering a seamless experience . Say goodbye to the clutter and hello to simplicity – it's time to connect in style.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        </>
    )
}

export default Home
