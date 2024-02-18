import styles from "../Contacts/style.module.scss";
import React, { useState, useEffect } from "react";

const Contacts = ({ contacts, currentUser, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    if (currentUser) {
      const stringa = currentUser.username;
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(stringa.charAt(0).toUpperCase() + stringa.slice(1));
    }
  }, [currentUser])

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
    // console.log(index);
  }
  return (
    <>
      <div className={styles.contacts_page}>
        <div className={styles.contacts_container}>
          {currentUserImage && currentUserName && (
            <>
              <div className={styles.brand}>
                <img src="/images/logo1.png" className={styles.brand_img}></img>
                <div className={styles.brand_title}>Chatify</div>
              </div>
              <div className={styles.contacts}>
                {
                  contacts.map((contact, index) => {
                    return (
                      <div className={`${styles.avatar_container} ${index === currentSelected ? `${styles.selected}` : ""
                        }`}
                        key={index}
                        onClick={() => { changeCurrentChat(index, contact) }}
                      >
                        <img
                          className={styles.avatar_img}
                          src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                          alt="avatar"
                        />
                        <div className={styles.username_container}>
                          {contact.username}
                        </div>
                      </div>
                    )
                  })
                }
              </div>
              <div className={styles.user_avatar}>
                <img
                  className={styles.user_img}
                  src={`data:image/svg+xml;base64,${currentUserImage}`}
                  alt="avatar"
                />
                <div className={styles.user_name}>{currentUserName}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Contacts
