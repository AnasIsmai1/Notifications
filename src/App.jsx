import { useRef, useState } from 'react';
import { useNotification } from "./context/Notifications";
import { Clipboard } from 'lucide-react';

function NotificationDemo() {
    const notification = useNotification();
    const [duration, setDuration] = useState(5000);
    const [message, setMessage] = useState("This is a notification message");
    const [notificationId, setNotificationId] = useState(null);
    const [currentCode, setCurrentCode] = useState(null);

    const copyComponentCode = (e) => {
        const codeText = e.target.nextElementSibling.textContent;

        console.log(codeText)
        console.log(typeof codeText)

        navigator.clipboard.writeText(codeText)
            .then(() => {
                notification.success("Code copied to clipboard!", { duration: 2000 });
            })
            .catch(err => {
                notification.error("Failed to copy: " + err, { duration: 3000 });
            });
    }

    const showSuccess = () => {
        notification.success(message, { duration });
        setCurrentCode(`notification.success("${message}", { duration: ${duration} });`);
    };

    const showError = () => {
        notification.error(message, { duration });
        setCurrentCode(`notification.error("${message}", { duration: ${duration} });`);
    };

    const showInfo = () => {
        notification.info(message, { duration });
        setCurrentCode(`notification.info("${message}", { duration: ${duration} });`);
    };

    const showWarning = () => {
        notification.warning(message, { duration });
        setCurrentCode(`notification.warning("${message}", { duration: ${duration} });`);
    };

    const showDefault = () => {
        notification(message, { duration });
        setCurrentCode(`notification("${message}", { duration: ${duration} });`);
    };

    const showPersistent = () => {
        const id = notification.info(`${message} (persistent)`, { duration: 0 });
        setNotificationId(id);
        setCurrentCode(`const id = notification.info("${message} (persistent)", { duration: 0 });
// Save the ID to use it later for removal`);
    };

    const removeById = () => {
        if (notificationId !== null) {
            notification.remove(notificationId);
            setCurrentCode(`// Using the previously saved ID: ${notificationId}
notification.remove(${notificationId});`);
            setNotificationId(null);
        } else {
            notification.error("No persistent notification to remove");
            setCurrentCode(`// Error: No ID available to remove
notification.error("No persistent notification to remove");`);
        }
    };

    const clearAll = () => {
        notification.clearAll();
        setCurrentCode(`// Remove all active notifications
notification.clearAll();`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 py-8">
            <div className="max-w-4xl mx-auto p-8">
                <div className="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-indigo-700">
                    <h1 className="text-3xl font-bold mb-2 text-indigo-300">React Notification System</h1>
                    <p className="text-gray-300 mb-6">
                        A lightweight, customizable notification system with animated stacked notifications.
                    </p>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-3 text-indigo-300">Customize Notification</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Message:
                                </label>
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Duration (ms):
                                </label>
                                <input
                                    type="number"
                                    value={duration}
                                    onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                                />
                                <div className="text-xs text-gray-400 mt-1">
                                    Set to 0 for persistent notifications
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold mb-3 text-indigo-300">Notification Types</h2>
                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={showSuccess}
                                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors shadow-sm"
                            >
                                Success
                            </button>
                            <button
                                onClick={showError}
                                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors shadow-sm"
                            >
                                Error
                            </button>
                            <button
                                onClick={showInfo}
                                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors shadow-sm"
                            >
                                Info
                            </button>
                            <button
                                onClick={showWarning}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg transition-colors shadow-sm"
                            >
                                Warning
                            </button>
                            <button
                                onClick={showDefault}
                                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors shadow-sm"
                            >
                                Default
                            </button>
                        </div>

                        <h2 className="text-xl font-semibold mb-3 mt-6 text-indigo-300">Management Functions</h2>
                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={showPersistent}
                                className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition-colors shadow-sm"
                            >
                                Create Persistent
                            </button>
                            <button
                                onClick={removeById}
                                className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg transition-colors shadow-sm"
                                disabled={notificationId === null}
                            >
                                Remove by ID
                            </button>
                            <button
                                onClick={clearAll}
                                className="bg-rose-500 hover:bg-rose-600 text-white py-2 px-4 rounded-lg transition-colors shadow-sm"
                            >
                                Clear All
                            </button>
                        </div>

                        {currentCode && (
                            <div className="mt-6 bg-gray-700 rounded-lg border border-gray-600 p-4">
                                <h3 className="font-medium text-gray-200 mb-2">Code Example:</h3>
                                <pre className="bg-gray-900 text-gray-100 p-3 rounded-md overflow-x-auto relative">
                                    <button className='bg-white rounded p-2 py-1 text-black absolute right-3' onClick={copyComponentCode}>
                                        <Clipboard size={20} className='pointer-events-none' />
                                    </button>
                                    <code>{currentCode}</code>
                                </pre>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-indigo-700">
                    <h2 className="text-xl font-semibold mb-4 text-indigo-300">Usage Instructions</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-medium text-lg text-indigo-300">1. Install required dependencies</h3>
                            <pre className="bg-gray-900 text-gray-100 p-3 rounded-md overflow-x-auto my-2 relative">
                                <button className='bg-white rounded p-2 py-1 text-black absolute right-3' onClick={copyComponentCode}>
                                    <Clipboard size={20} className='pointer-events-none' />
                                </button>
                                <code>npm install framer-motion lucide-react</code>
                            </pre>
                        </div>

                        <div>
                            <h3 className="font-medium text-lg text-indigo-300">2. Setup in your main file</h3>
                            <pre className="bg-gray-900 text-gray-100 p-3 rounded-md overflow-x-auto my-2 relative">
                                <button className='bg-white rounded p-2 py-1 text-black absolute right-3' onClick={copyComponentCode}>
                                    <Clipboard size={20} className='pointer-events-none' />
                                </button>
                                <code>{`import { NotificationProvider } from "./components/NotificationProvider";

function App() {
  return (
    <NotificationProvider>
      {/* Your app components */}
    </NotificationProvider>
  );
}`}</code>
                            </pre>
                        </div>

                        <div>
                            <h3 className="font-medium text-lg text-indigo-300">3. Using the notification system</h3>
                            <pre className="bg-gray-900 text-gray-100 p-3 rounded-md overflow-x-auto my-2 relative">
                                <button className='bg-white rounded p-2 py-1 text-black absolute right-3' onClick={copyComponentCode}>
                                    <Clipboard size={20} className='pointer-events-none' />
                                </button>
                                <code>{`import { useNotification } from "./components/Notifications";

function MyComponent() {
  const notification = useNotification();
  
  // Basic usage examples
  notification.success("Operation completed successfully!");
  notification.error("Something went wrong!");
  notification.info("This is an informational message");
  notification.warning("This is a warning message");
  
  // Default notification
  notification("This is a default message");
  
  // With custom duration (in milliseconds, 0 for no auto-dismiss)
  notification.info("Processing...", { duration: 10000 });
  
  // Create persistent notification and save its ID
  const id = notification.info("Working on it...", { duration: 0 });
  
  // Later, remove by ID
  notification.remove(id);
  
  // Clear all notifications
  notification.clearAll();
  
  // You can also pass additional options
  notification.success("Profile updated", { 
    duration: 3000,
    // Any additional options can be added here
  });
}`}</code>
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotificationDemo;
