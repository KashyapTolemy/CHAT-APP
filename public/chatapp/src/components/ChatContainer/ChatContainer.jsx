import styles from "../ChatContainer/style.module.scss";
import React, { useState, useEffect } from "react";
import Logout from "../Logout/Logout";
import ChatInput from "../ChatInput/ChatInput";
import Messages from "../Messages/Messages";
import axios from "axios";
import { getAllMessageRoute, sendMessageRoute } from "../../utils/APIRoutes";

const ChatContainer = ({ currentChat, currentUser }) => {
    const [messages, setMessages] = useState([])
    useEffect(() => {
        (async () => {
            // console.log(currentChat)
            // console.log(currentUser)
            const response = await axios.post(getAllMessageRoute, {
                from: currentUser._id,
                to: currentChat._id,
            });
            setMessages(response.data);
            console.log(response.data)
        })()
    }, [currentChat])
    const handleSendMsg = async (msg) => {
        await axios.post(sendMessageRoute, {
            from: currentUser._id,
            to: currentChat._id,
            message: msg,
        })
    }
    return (
        <>{
            currentChat && (
                <div className={styles.container3}>
                    <div className={styles.navbar}>
                        <div className={styles.chatheader}>
                            <div className={styles.chatavatar}>
                                <img
                                    className={styles.chatimage}
                                    src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                                    alt=""
                                />
                            </div>
                            <div className={styles.chatuser}>
                                <h2 className={styles.chatusername}>{currentChat.username}</h2>
                            </div>
                        </div>
                        <Logout />
                    </div>
                    <div className={styles.chatmessages}>{
                        messages.map((message) => {
                            return (
                                <div className={styles.messageinout}>
                                    <div className={`${styles.message1} 
                                        ${message.fromSelf ? styles.sent:styles.received}
                                    `}>
                                        <div className={styles.content}>
                                            <p className={styles.mainmessage}>{message.message}</p>
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
