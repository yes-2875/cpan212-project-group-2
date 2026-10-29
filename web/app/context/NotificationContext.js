"use client";

import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const [notification, setNotification] = useState("");

    const showNotification = (message) => {
        setNotification(message);
    };

    const clearNotification = () => {
        setNotification("");
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