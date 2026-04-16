import { useState, useEffect, createContext, useContext } from 'react';
import { useAuthContext } from './AuthContext';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuthContext();

    useEffect(() => {
        if (!authUser) return;

        const socketInstance = io("https://chatify-backend.onrender.com", {
        query: { userId: authUser._id },
        transports: ["websocket"],
        reconnection: true, // ✅ ADD
        reconnectionAttempts: 5,
        });

        setSocket(socketInstance);

        // ✅ Online users
        socketInstance.on('getOnlineUsers', (users) => {
            setOnlineUsers(users);
        });

        // ✅ Debug (optional but helpful)
        socketInstance.on("connect", () => {
            console.log("🟢 Connected:", socketInstance.id);
        });

        socketInstance.on("disconnect", () => {
            console.log("🔴 Disconnected");
        });

        // 🔥 CLEANUP
        return () => {
            socketInstance.off('getOnlineUsers');
            socketInstance.disconnect();
        };

    }, [authUser]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};