import { useNotification } from "./context/Notifications"

function App() {

    const notification = useNotification()

    const success = () => {
        notification.success("Hello My name is Anas Ismail this is not a drill and i want to enlongate this message as much as possible to see the lengths my message can go before shifting over to the next")
    }

    const error = () => {
        notification.error("error")
    }

    return (
        <div className="p-8">
            <button className="bg-emerald-600 text-white py-2 px-4 mx-2 rounded-lg" onClick={success}>success</button>
            <button className="bg-red-600 text-white py-2 px-4 mx-2 rounded-lg" onClick={error}>error</button>
        </div>
    )
}

export default App
