import styles from "../ChatContainer/style.module.scss";
import React, { useState, useEffect } from "react";
import Logout from "../Logout/Logout";
import ChatInput from "../ChatInput/ChatInput";
import Messages from "../Messages/Messages";

const ChatContainer = ({ currentChat }) => {
    const handleSendMsg= async (msg)=>{
        alert(msg)
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
                    <div className={styles.chatmessages}>
                        <Messages />
                        <ChatInput handleSendMsg ={handleSendMsg}/>
                    </div>
                </div>
            )
        }
        </>
    )
}

export default ChatContainer
