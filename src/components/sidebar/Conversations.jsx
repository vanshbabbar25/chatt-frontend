import React from 'react'
import Conversation from './Conversation'
import useGetConversations from '../../hooks/useGetConversations';
import { getRandomEmoji } from "../../utils/emojis";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  console.log(conversations);

  return (
    <div className='w-full rounded-lg shadow-md bg-stone-100 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10'>
      
      <div className="h-[400px] overflow-y-auto rounded-md bg-black/30 scrollbar-hidden space-y-0 py-1 pr-0">
        
        {conversations?.map((conversation, idx) => (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            emoji={getRandomEmoji()}
            lastIdx={idx === conversations.length - 1}
          />
        ))}

        {loading && (
          <span className='loading loading-spinner mx-auto'></span>
        )}
      
      </div>
    </div>
  )
}

export default Conversations;