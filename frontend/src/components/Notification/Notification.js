import React, { useEffect, useState } from "react";
import {initializeNotificationEvent} from "../../events/NotificationEvent";
import styles from "./Notification.module.css";

export const Notification = () => {
    const [notification, setNotification] = useState({
        level: "info",
        text: "",
    });

    const handleCloseNotification = () => {
        setNotification({...notification, text: ""});
    };

    useEffect(() => {
        initializeNotificationEvent(setNotification);
    }, []);

    if (notification.text) {
        return (
            <div className={[styles.container, styles[notification.level]].join(" ")}>
                <p>{notification.text}</p>
                <button onClick={handleCloseNotification} className={styles.CloseButton}>close</button>
            </div>
        );
    }
    return null;
};

