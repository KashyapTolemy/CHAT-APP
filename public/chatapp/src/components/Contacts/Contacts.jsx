import styles from "../Contacts/style.module.scss";
import React, { useState, useEffect } from "react";

const Contacts = ({ contacts, currentUser }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser])
  const changeCurrentChat = (index, contact) => { }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.smallLight}></div>
        <div className={styles.container1}>
          {currentUserImage && currentUserName && (
            <>
              <div className={styles.brand}>
                <h1>Chatify</h1>
                <img src="/images/2.png" className={styles.logoimage}></img>
              </div>
              <div className={styles.contacts}>
                {
                  contacts.map((contact, index) => {
                    return (
                      <div className={`${styles.contact1}${index === currentSelected ? "selected" : ""
                        }`}>
                        <div className={styles.avatar}>
                          <img
                            className={styles.image}
                            src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                            alt="avatar"
                          />
                        </div>
                        <div className={styles.contact}>
                          <h3>{contact.username}</h3>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
              <div className={styles.current_user}>
                <div className={styles.useravatar}>
                  <img
                    className={styles.userimage}
                    src={`data:image/svg+xml;base64,${currentUserImage}`}
                    alt="avatar"
                  />
                </div>
                <div className={styles.usercontact}>
                  <h2>{currentUserName}</h2>
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
