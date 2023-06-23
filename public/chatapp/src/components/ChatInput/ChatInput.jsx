import styles from "../ChatInput/style.module.scss";
import "../ChatInput/emoji-picker.scss";
import React, { useState, useEffect } from "react";
import Picker from "emoji-picker-react"
import { BsEmojiSmile, BsEmojiSmileFill } from 'react-icons/bs'
import { IoMdSend } from 'react-icons/io'

const ChatInput = ({handleSendMsg}) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg,setMsg]=useState("")
    const handleEmojiPickerHideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    }
    const sendChat =(event) =>{
        event.preventDefault();
        if(msg.length>0){
            handleSendMsg(msg);
            setMsg("")
        }
    }
    return (
        <>
            <div className={styles.chatinputcontainer}>
                <div className={styles.buttoncontainer}>
                    <div className={styles.emojii}>
                        <BsEmojiSmile className={styles.emojiicon} onClick={handleEmojiPickerHideShow} />
                        {
                            showEmojiPicker && (<Picker onEmojiClick={(emojiObject)=> setMsg((msg)=>msg+emojiObject.emoji)}/>)
                        }
                    </div>
                </div>
                <form className={styles.inputcontainer} onSubmit={(e)=>sendChat(e)}>
                    <input className={styles.messageinput} value={msg} onChange={(e)=>setMsg(e.target.value)} type="text" placeholder=" Type your message" />
                    <button className={styles.sendbutton}>
                        <IoMdSend className={styles.emojisend} />
                    </button>
                </form>
            </div>
        </>
    )
}

export default ChatInput
