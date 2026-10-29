"use client";

import { useNotification } from "./NotificationContext";

export default function NotificationStatus() {
    const { notification, clearNotification } = useNotification();

    if (!notification) {
        return null;
    }

    return (
        <div>
            <p>{notification}</p>

            <button onClick={clearNotification}>
                Dismiss
            </button>
        </div>
    );
}