# React Notification System

A lightweight, customizable notification system for React applications with animated stacked notifications. **Just copy two files and you're ready to go!**

## Features

- Multiple notification types (success, error, info, warning)
- Customizable icons and styling
- Animated entrance and exit using Framer Motion
- Stacked notifications with automatic management
- Configurable auto-dismiss timers
- Manual dismiss option with close button
- Smart stack management (limits to 10 notifications)
- Simple context-based API

## Quick Start

1. Install required dependencies:

```bash
npm install framer-motion lucide-react
# or
yarn add framer-motion lucide-react
```

2. Copy these two files into your project:
   - `Notifications.js` - The context definition
   - `NotificationProvider.jsx` - The provider component with all the notification logic

## Setup

1. Wrap your application with the `NotificationProvider` in your main file (e.g., `App.js` or `index.js`):

```jsx
import { NotificationProvider } from "./components/NotificationProvider";

function App() {
  return (
    <NotificationProvider>
      {/* Your app components */}
    </NotificationProvider>
  );
}
```

That's it! The system is now ready to use throughout your application.

> **Note:** The provided files already contain all the necessary code. You don't need to create anything yourself - just copy the files and import them.

## Usage

Using notifications anywhere in your application is super simple - just import the hook and call it:

```jsx
import { useNotification } from "./components/Notifications";

function MyComponent() {
  // Get the notification function from context
  const notification = useNotification();
  
  const handleAction = () => {
    // Basic usage - show different types of notifications
    notification.success("Operation completed successfully!");
    notification.error("Something went wrong!");
    notification.info("This is an informational message");
    notification.warning("This is a warning message");
    
    // Default notification
    notification("This is a default message");
    
    // With custom duration (in milliseconds, 0 for no auto-dismiss)
    notification.info("Processing...", 10000);
    
    // Manually dismiss by ID (when auto-dismiss is disabled)
    const id = notification.info("Working on it...", 0);
    // Later when operation completes:
    notification.remove(id);
    
    // Clear all notifications
    notification.clearAll();
  };
  
  return (
    <button onClick={handleAction}>
      Show Notification
    </button>
  );
}
```

That's all you need! No additional setup or configuration required.

## Customization

You can easily customize the notification system by modifying a few variables in the `NotificationProvider.jsx` file:

```jsx
// Style customization - change colors and appearance
const notificationClasses = {
  success: "border-green-200 bg-green-100 text-green-500",
  error: "border-red-200 bg-red-100 text-red-500",
  info: "border-blue-200 bg-blue-100 text-blue-500",
  warning: "border-yellow-200 bg-yellow-100 text-yellow-500",
  default: "border-gray-200 bg-gray-100 text-gray-500",
}

// Change icons
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

const notificationIcons = {
  success: <CheckCircle size={20} />,
  error: <AlertCircle size={20} />,
  info: <Info size={20} />,
  warning: <AlertTriangle size={20} />,
  default: <Info size={20} />
}
```

## Configuration Options

The notification system can be configured by modifying these values in the `NotificationProvider.jsx` file:

- `MAX_NOTIFICATIONS`: Maximum number of notifications to show at once (default: 4)
- Default duration: Change the default duration in the `addNotification` function (default: 5000ms)
- Animation timing: Adjust the animation durations in the `motion.div` components
- Position: Change the positioning classes in the container div

## What's In The Files?

- **Notifications.js** - A simple context definition with the `useNotification` hook
- **NotificationProvider.jsx** - The complete notification system with all logic and UI components

## License

MIT
