import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "../Chat/style.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { allUsersRoute, host } from "../../utils/APIRoutes";
import Contacts from "../../components/Contacts/Contacts";
import Welcome from "../../components/Welcome/Welcome";
import ChatContainer from "../../components/ChatContainer/ChatContainer";
import { io } from "socket.io-client"
import Loader from "../../components/Loader/Loader";
// import Logout from "../../components/Logout/Logout";


const Chat = () => {
  const [socket, setSocket] = useState();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([])
  const [currentUser, setCurrentUser] = useState(undefined)
  const [currentChat, setCurrentChat] = useState(undefined)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [showContactSection, setShowContactSection] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setShowButton(window.innerWidth < 1000);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  const handleContact = () => {
    setShowContactSection(!showContactSection);
    // console.log(showContactSection);
  }

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
    if (currentUser) {
      setSocket(() => {
        const socket = io(host);
        socket.emit("add-user", currentUser._id);
        return socket;
      });
    }
  }, [currentUser])

  useEffect(() => {
    (async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data)
        } else {
          navigate("/setavatar")
        }
      }
    })()
  }, [currentUser])

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
    setShowContactSection(false);
  }
  // console.log(showButton);
  // console.log(showContactSection);
  return (
    <>{
      isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.chat_page}>
            <div className={styles.container}>
              <div className={styles.contacts_container} style={{ display: !showButton || (showButton && showContactSection) ? '' : 'none' }}>
                {/* <div className={`${styles.contacts_container} ${(showButton && showContactSection) ? styles.cc_dontwant : styles.cc_want}`}> */}



                <Contacts className={styles.contacts1} contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}  />

              </div>

              <div className={styles.chat_container} style={{ display: showButton && showContactSection ? 'none' : '' }}>
                {
                  isLoaded && currentChat === undefined ? (
                    <Welcome className={styles.welcome} currentUser={currentUser} />
                  ) : (
                    <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
                  )
                }
              </div>
              <div className={styles.contactopen_btn} style={{ display: showButton ? '' : 'none' }}>
                {
                    (!showContactSection ?
                      <button className={styles.chat_btn} onClick={handleContact}>CHAT</button>
                      :
                      <button className={styles.chat_btn} onClick={handleContact}>CANCEL</button>
                    )
                }
              </div>
            </div>
          </div>
        </>
      )
    }
    </>
  )
}

export default Chat