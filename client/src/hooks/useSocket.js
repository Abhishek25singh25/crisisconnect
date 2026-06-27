import { useEffect,useState } from "react";
import { io } from "socket.io-client";

const useSocket = () => {
    const [socket ,setSocket] = useState(null);
    useEffect (() => {
        const socketUrl = import.meta.env.VITE_API_URL;
        const socketInstance = io(socketUrl);
        setSocket(socketInstance);
        return () => {
            socketInstance.disconnect();
        }
    }, []);
    return socket;

}

export default useSocket;