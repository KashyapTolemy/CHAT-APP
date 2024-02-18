import styles from "../ChatContainer/style.module.scss";
import React, { useState, useEffect, useRef } from "react";
import ChatInput from "../ChatInput/ChatInput";
import axios from "axios";
import { AiOutlineHome, AiOutlineLogout } from 'react-icons/ai'
import { getAllMessageRoute, sendMessageRoute } from "../../utils/APIRoutes";
import { v4 as uuidv4 } from "uuid"
import { Link, useNavigate } from "react-router-dom";

const ChatContainer = ({ currentChat, currentUser, socket }) => {
    const [messages, setMessages] = useState([])
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const scrollRef = useRef();
    const navigate = useNavigate();
    const [str, setStr] = useState("");

    useEffect(() => {
        const stringa = currentChat.username;
        setStr(stringa.charAt(0).toUpperCase() + stringa.slice(1));
        // console.log(str);
    })

    useEffect(() => {
        (async () => {
            if (currentChat) {
                const response = await axios.post(getAllMessageRoute, {
                    from: currentUser._id,
                    to: currentChat._id,
                });
                setMessages(response.data);
            }
        })()
    }, [currentChat])

    const handleSendMsg = async (msg) => {
        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });
        setMessages(msgs);
        socket.emit("send-msg", {
            to: currentChat._id,
            from: currentUser._id,
            message: msg,
        });
        await axios.post(sendMessageRoute, {
            from: currentUser._id,
            to: currentChat._id,
            message: msg,
        });
        // console.log(msg);
    };

    const handleBack = () => {
        navigate("/");
    }

    useEffect(() => {
        if (socket) {
            socket.on("msg-receive", ({ message, from }) => {
                // console.log(message)
                // console.log(from)
                // console.log(currentChat._id)
                if (from !== currentChat._id) return;
                setArrivalMessage({ fromSelf: false, message: message })
            })
        }
    }, [socket]);

    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleClick = async () => {
        // console.log("working")
        localStorage.clear();
        navigate('/login');
    }

    return (
        <>{
            currentChat && (
                <div className={styles.chatcontainer_page}>
                    <div className={styles.navbar}>
                        <div className={styles.chat_avatar}>
                            <img
                                className={styles.chat_img}
                                src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                                alt=""
                            />
                            <div className={styles.chat_user}>{str}
                            </div>
                        </div>
                        <div className={styles.chat_btn}>
                            <AiOutlineHome onClick={handleBack} className={styles.home_btn} />
                            <AiOutlineLogout className={styles.logout_btn} onClick={handleClick} />
                        </div>
                    </div>
                    <div className={styles.chat_msgs}>{
                        messages.map((message) => {
                            return (
                                <div className={styles.msg_inout} ref={scrollRef} key={uuidv4()}>
                                    <div className={`${styles.msg_container} 
                                        ${message.fromSelf ? styles.sent : styles.received}
                                    `}>
                                        <div className={styles.content}>
                                            <div className={styles.mainmessage}>{message.message}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    </div>
                    <ChatInput handleSendMsg={handleSendMsg} />
                </div>
            )
        }
        </>
    )
}

export default ChatContainer
