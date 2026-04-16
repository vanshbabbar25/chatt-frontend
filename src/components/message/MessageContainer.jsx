import React, { useEffect } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import { TiMessages } from 'react-icons/ti'
import useConversation from '../../zustand/useConversation'
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
  const { authUser } = useAuthContext();
  const conversation = useConversation();
  const selectedConversation = conversation.selectedConversation;
  const setSelectedConversation = conversation.setSelectedConversation;
  const setMessages = conversation.setMessages;

useEffect(() => {
  return () => {
    setSelectedConversation(null);
  };
}, []);

  return (
    <div className='w-[60%] flex flex-col h-full'>
      
      {!selectedConversation ? (
        <NoChatSelected authUser={authUser} />
      ) : (
        <>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/30 bg-black/70 backdrop-blur-md rounded-t-md">
            
            <p className="text-lg font-extrabold text-white">
              To: {selectedConversation?.fullName}
            </p>
            
            <div className="h-10 w-10 rounded-full overflow-hidden">
              <img
                src={selectedConversation?.profilePic || "/default-avatar.png"}
                alt="User avatar"
                className="h-full w-full object-cover"
              />
            </div>
          
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
      
    </div>
  )
}

export default MessageContainer;


// ✅ Reusable Component
const NoChatSelected = ({ authUser }) => {
  return (
    <div className='flex items-center bg-black/40 justify-center w-full h-full'>
      <div className='px-4 text-center sm:text-xl md:text-3xl text-white font-extrabold flex flex-col items-center gap-2'>
        
        <p>Welcome {authUser?.fullName || "User"}!!</p>
        <p>Select a chat to start <br />messaging</p>
        
        <TiMessages className='text-2xl md:text-8xl text-center' />
      
      </div>
    </div>
  )
}