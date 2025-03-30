import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NotificationContext } from "./Notifications";
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [idCounter, setIdCounter] = useState(0);

    const MAX_NOTIFICATIONS = 4;

    const notificationClasses = {
        success: "border-green-200 bg-green-100 text-green-500",
        error: "border-red-200 bg-red-100 text-red-500",
        info: "border-blue-200 bg-blue-100 text-blue-500",
        warning: "border-yellow-200 bg-yellow-100 text-yellow-500",
        default: "border-gray-200 bg-gray-100 text-gray-500",
    }

    const notificationIcons = {
        success: <CheckCircle size={20} />,
        error: <AlertCircle size={20} />,
        info: <Info size={20} />,
        warning: <AlertTriangle size={20} />,
    }

    const removeNotification = (id) => {
        setNotifications(prev => prev.filter(notification => notification.id !== id));
    }

    const addNotification = (type, message, duration = 5000) => {
        const id = idCounter;
        setIdCounter(prev => prev + 1);

        const newNotification = {
            id,
            type,
            message,
            icon: notificationIcons[type] || notificationIcons.default,
            style: notificationClasses[type] || notificationClasses.default,
            duration,
            timestamp: Date.now()
        };

        setNotifications(prev => {
            const updatedNotifications = [...prev];

            if (updatedNotifications.length > MAX_NOTIFICATIONS) {
                return updatedNotifications
                    .sort((a, b) => b.timestamp - a.timestamp)
                    .slice(0, MAX_NOTIFICATIONS);
            }

            return [...updatedNotifications, newNotification];
        });

        if (duration > 0) {
            setTimeout(() => {
                removeNotification(id);
            }, duration);
        }

        return id;
    };

    const notification = (type, message, duration) => {
        if (typeof type === 'string' && message === undefined) {
            message = type;
            type = 'default';
        }

        return addNotification(type, message, duration);
    };

    notification.success = (message, duration) => notification('success', message, duration);
    notification.error = (message, duration) => notification('error', message, duration);
    notification.info = (message, duration) => notification('info', message, duration);
    notification.warning = (message, duration) => notification('warning', message, duration);
    notification.remove = removeNotification;
    notification.clearAll = () => setNotifications([]);

    return (
        <NotificationContext.Provider value={notification}>
            <div className="fixed top-0 right-0 z-50 m-4 flex flex-col items-end space-y-2">
                <AnimatePresence>
                    {notifications.map((notif) => (
                        <motion.div
                            key={notif.id}
                            initial={{ opacity: 0, y: -50, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                            className={`${notif.style} border-2 rounded-xl py-2 px-4 flex justify-between items-center max-w-md`}
                        >
                            <div className="flex items-center">
                                <span className="mr-2">{notif.icon}</span>
                                {notif.message}
                            </div>
                            <button
                                onClick={() => removeNotification(notif.id)}
                                className="ml-4 hover:text-black rounded p-1 transition-colors cursor-pointer"
                                aria-label="Close notification"
                            >
                                <X size={16} />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            {children}
        </NotificationContext.Provider>
    )
}
