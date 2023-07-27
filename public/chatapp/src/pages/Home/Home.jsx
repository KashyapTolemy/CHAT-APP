import React, { useState, useEffect } from "react";
import styles from "../Home/style.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa"
import { AiFillMessage, AiFillInstagram, AiFillLinkedin, AiFillGithub } from "react-icons/ai"
import { motion } from 'framer-motion';
import logo from "/images/2.png";
import Loader from "../../components/Loader/Loader";
// import axios from "axios";
// import { allUsersRoute, getAllMessageRoute } from "../../utils/APIRoutes";

const Home = () => {
    const navigate = useNavigate();
    const [clicked, setClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 4000);
    }, []);

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
            backgroundColor: "yellow",
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
                <div className={styles.homepage}>
                    <img src={logo} className={styles.imagelogo} />
                    <div className={styles.navbarbuttons}>
                        <Link to="/login" className={styles.homelogin}>LOGIN</Link>
                        <Link to="/register" className={styles.homeregister}>REGISTER</Link>
                    </div>
                    <div className={styles.contactbutton} onClick={helper}>
                        Let's connect.
                    </div>
                    <div className={styles.cross}>
                    </div>
                    {
                        clicked && (
                            <div className={styles.contactbox}>
                                <a href="https://www.instagram.com/tolemy_kashyap/" className={styles.smcontainer}><AiFillInstagram className={styles.socialmedia} /></a>
                                <a href="https://www.linkedin.com/in/tolemy-kashyap/" className={styles.smcontainer}><AiFillLinkedin className={styles.socialmedia} /></a>
                                <a href="https://github.com/KashyapTolemy" className={styles.smcontainer}><AiFillGithub className={styles.socialmedia} /></a>
                            </div>
                        )
                    }
                    <motion.div
                        className={styles.cursor1}
                        variants={variants}
                        animate={cursorVariant}
                    />
                    <span className={styles.getstarted} onMouseEnter={textEnter} onMouseLeave={textLeave} >
                        <Link to="/chat" className={styles.arrowlink} >Get Started &nbsp;&#10230;  </Link>
                    </span>
                    <div className={styles.intro} onMouseEnter={textEnter} onMouseLeave={textLeave} >
                        <p className={styles.para}>Chatify: Where Communication Comes Alive. Connect Seamlessly and Explore the Dynamics of Conversation!<br />Join the Chatify community today.</p>
                    </div>
                    <div className={styles.homeusers} onMouseEnter={textEnter} onMouseLeave={textLeave} >
                        <FaUsers className={styles.usericon} />
                        <div className={styles.totalusers}>
                            6K+&nbsp;Users
                        </div>
                    </div>
                    <div className={styles.homemessages}>
                        <AiFillMessage className={styles.messageicon} />
                        <div className={styles.totalmessages}>
                            42K+&nbsp;Messages
                        </div>
                    </div>
                    <div className={styles.smallLight} onMouseEnter={textEnter} onMouseLeave={textLeave} ></div>
                    <div className={styles.homeherosection}>
                        <div className={styles.overlaytext}>
                            <div className={styles.webname}>PROJECT <br />&nbsp;CHATIFY</div>
                        </div>
                        <div className={styles.line}></div>
                    </div>
                </div>
            )
        }
        </>
    )
}

export default Home
