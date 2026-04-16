import React from 'react'
import useConversation from '../../zustand/useConversation';
import { useSocketContext } from '../../context/SocketContext';

const Conversation = ({ conversation, lastIdx, emoji }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const isSelected = selectedConversation?._id === conversation?._id;

	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers?.includes(conversation?._id);

	if (!conversation) return null;

	return (
		<div>
			<div
				className={`flex gap-2 items-center hover:bg-stone-900/50 rounded p-2 py-2 cursor-pointer
				${isSelected ? "bg-stone-900/50" : ""}`}
				onClick={() => setSelectedConversation(conversation)}
			>
				<div className={`avatar ${isOnline ? "online" : ""}`}>
					<div className='w-12 rounded-full'>
						<img
							src={conversation.profilePic}
							alt='user avatar'
						/>
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex justify-between items-center'>
						<p className="user-name">{conversation.fullName}</p>
						<span className='text-xl'>{emoji}</span>
					</div>
				</div>
			</div>

			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
		</div>
	);
};

export default Conversation;