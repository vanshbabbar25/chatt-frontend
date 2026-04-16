import React from 'react'
import SearchInput from './SearchInput.jsx';
import Conversations from './Conversations.jsx';
import LogoutButton from './LogoutButton.jsx';
function Sidebar() {
  return (
		<div className='border-r border-slate-100 p-4 flex flex-col w-[50%] h-screen px-4 sm:px-5 md:px-6'>
			<div className="mb-5"><SearchInput /></div>
			
			<Conversations />
			<div className="mt-5 pb-2 px-3 pt-1"><LogoutButton /></div>
		</div>
	);
}

export default Sidebar
