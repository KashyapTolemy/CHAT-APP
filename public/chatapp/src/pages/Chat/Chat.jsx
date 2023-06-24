import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../Chat/style.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { allUsersRoute } from "../../utils/APIRoutes";
import Contacts from "../../components/Contacts/Contacts";
import Welcome from "../../components/Welcome/Welcome";
import ChatContainer from "../../components/ChatContainer/ChatContainer";

const Chat = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([])
  const [currentUser, setCurrentUser] = useState(undefined)
  const [currentChat, setCurrentChat] = useState(undefined)
  const [isLoaded, setIsLoaded] =useState(false)
  useEffect(() => {
    (async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login")
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        setIsLoaded(true);
      }
    })();
  }, [])
  useEffect(() => {
    (async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          // console.log(data);
          setContacts(data.data)
        } else {
          navigate("/setavatar")
        }
      }
    })()
  }, [currentUser])
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  }
  console.log("yes");
  console.log(currentChat)
  console.log(currentUser)
  return (
    <>
      <div className={styles.container1}>
        <div className={styles.container}>
          <div className={styles.contacts}>
            <Contacts className={styles.contacts1} contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
          </div>
          <div className={styles.container2}>
            {
              isLoaded && currentChat===undefined?(
                <Welcome className={styles.welcome} currentUser={currentUser}/>
              ):(
                <ChatContainer currentChat={currentChat} currentUser={currentUser}/>
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Chat
