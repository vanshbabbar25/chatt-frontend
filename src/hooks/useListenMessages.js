import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import { useAuthContext } from "../context/AuthContext";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (msg) => {
      // Skip own messages — useSendMessage already appends them optimistically
      if (msg.senderId === authUser?._id) return;
      setMessages((prev) => [...(Array.isArray(prev) ? prev : []), msg]);
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, authUser, setMessages]);
};

export default useListenMessages;