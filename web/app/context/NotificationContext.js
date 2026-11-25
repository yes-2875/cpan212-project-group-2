"use client";

import { createContext, useContext, useRef, useState } from "react";

const NotificationContext = createContext();

// How long a notification stays before it hides itself. It's fixed to the bottom of the screen,
// so leaving it up forever can cover buttons, e.g. the Save button on smaller windows.
const AUTO_DISMISS_MS = 5000;

export function NotificationProvider({ children }) {
    const [notification, setNotification] = useState("");
    const timer = useRef(null);

    const clearNotification = () => {
        clearTimeout(timer.current);
        setNotification("");
    };

    // A new notification restarts the timer, so it always gets the full 5 seconds.
    const showNotification = (message) => {
        clearTimeout(timer.current);
        setNotification(message);
        timer.current = setTimeout(() => setNotification(""), AUTO_DISMISS_MS);
    };

    return (
        <NotificationContext.Provider
            value={{ notification, showNotification, clearNotification }}
        >
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    return useContext(NotificationContext);
}