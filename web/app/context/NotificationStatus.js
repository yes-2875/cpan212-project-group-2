"use client";

import { useNotification } from "./NotificationContext";
import styles from './NotificationStatus.module.css';

export default function NotificationStatus() {
    const { notification, clearNotification } = useNotification();

    if (!notification) {
        return null;
    }

    return (
        <div className={styles.notification}>
            <p>{notification}</p>

            <button onClick={clearNotification}>
                Dismiss
            </button>
        </div>
    );
}