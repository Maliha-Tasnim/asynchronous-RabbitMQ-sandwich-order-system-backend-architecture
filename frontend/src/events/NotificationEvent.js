import {NotificationLevel} from "../enums";

const notificationEventName = "event-notification";

export const fireNotificationEvent = async (text, level = NotificationLevel.INFO) => {
    const event = new CustomEvent(notificationEventName, { detail: { level, text } });
    window.dispatchEvent(event);
};

export const initializeNotificationEvent = (setNotificationHook) => {
    console.debug("Add event listener: notification");
    window.addEventListener(notificationEventName, (event) => {
        setNotificationHook(event.detail);
    });
};
