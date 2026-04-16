import React from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import MessageSkeleton from '../skeleton/MessageSkeleton.jsx'
import { useRef,useEffect,useState } from 'react'
import useListenMessages from '../../hooks/useListenMessages.js'
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Messages = () => {
  const {messages,loading} = useGetMessages();
  useListenMessages();
  console.log("messages:",messages)
  const lastMessageRef = useRef();
  const { socket } = useSocketContext();
const { selectedConversation } = useConversation();

const [isTyping, setIsTyping] = useState(false);

useEffect(() => {
  lastMessageRef.current?.scrollIntoView({ behavior: "auto", block: "nearest" });
}, [messages]);

useEffect(() => {
  if (!socket) return;

  const handleTyping = (data) => {
    if (data.senderId === selectedConversation?._id) {
      setIsTyping(true);
    }
  };

  const handleStopTyping = (data) => {
    if (data.senderId === selectedConversation?._id) {
      setIsTyping(false);
    }
  };

  socket.on("typing", handleTyping);
  socket.on("stopTyping", handleStopTyping);

  return () => {
    socket.off("typing", handleTyping);
    socket.off("stopTyping", handleStopTyping);
  };
}, [socket, selectedConversation?._id]);

  return( 
    <div className='px-3 pt-2 flex-1 bg-black/30 overflow-auto scrollbar-hidden'>

 {
  Array.isArray(messages) && messages.length > 0 &&
  messages.map((message, index) => (
    <div
      key={message._id || index}
      ref={index === messages.length - 1 ? lastMessageRef : null}
    >
      <Message message={message} />
    </div>
  ))
}





			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
{!loading && (!messages || messages.length === 0) && (
				<p className='pt-3 text-center text-white text-lg'>Send a message to start the conversation</p>
			)}


      {isTyping && (
  <div className="flex items-center gap-2 px-3 py-2 text-gray-300 text-sm">
    <span className="animate-pulse">typing...</span>
  </div>
)}
    </div>
  )
}

export default Messages
