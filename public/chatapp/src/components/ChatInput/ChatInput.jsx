import styles from "../ChatInput/style.module.scss";
import "../ChatInput/emoji-picker.scss";
import React, { useState, useEffect, useRef } from "react";
import EmojiPicker from "emoji-picker-react";
// import "emoji-picker-element";
// import { Emoji } from 'emoji-mart';
import { BsEmojiSmile, BsEmojiSmileFill } from 'react-icons/bs'
import { IoMdSend } from 'react-icons/io'
import audio1 from '../../assets/notification2.mp3';


const ChatInput = ({ handleSendMsg }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState("")
    const audioRef = useRef(null);
    const handleEmojiPickerHideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);

    }
    const handleEmojiClick = (event, emojiObject) => {
        let message = msg;
        message += emojiObject.emoji;
        setMsg(message);
    };
    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
            handleSendMsg(msg);
            setMsg("")
        }
    }
    return (
        <>
            <div className={styles.input_page}>
                <div className={styles.emoji_container}>
                    <BsEmojiSmile className={styles.emoji} onClick={handleEmojiPickerHideShow} />
                    {
                        showEmojiPicker && (<EmojiPicker
                            onEmojiClick={handleEmojiClick} />)
                    }
                </div>
                <form className={styles.input_container} onSubmit={(e) => {
                    sendChat(e);
                    if (audioRef.current) {
                        audioRef.current.play();
                    }
                }}>
                    <audio ref={audioRef} src={audio1} />
                    <input className={styles.msg_input} value={msg} onChange={(e) => setMsg(e.target.value)} type="text" placeholder=" Type your message" />
                    <button className={styles.send_container}>
                        <IoMdSend className={styles.send_btn} />
                    </button>
                </form>
            </div>
        </>
    )
}

export default ChatInput
