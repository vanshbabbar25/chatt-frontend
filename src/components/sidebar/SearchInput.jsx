import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import useConversation from '../../zustand/useConversation';
import useGetConversations from '../../hooks/useGetConversations';
import toast from 'react-hot-toast';

const SearchInput = () => {
	const [search, setSearch] = useState("");
	const { setSelectedConversation } = useConversation();
	const { conversations } = useGetConversations();

	const handleSubmit = (e) => {
		e.preventDefault();

		const trimmedSearch = search.trim();

		if (!trimmedSearch) return;

		if (trimmedSearch.length < 3) {
			return toast.error('Search term must be at least 3 characters');
		}

		const conversation = conversations?.find((c) =>
			c.fullName?.toLowerCase().includes(trimmedSearch.toLowerCase())
		);

		if (conversation) {
			setSelectedConversation(conversation);
			setSearch('');
		} else {
			toast.error('No such user found');
		}
	};

	return (
		<form className='flex items-center gap-2' onSubmit={handleSubmit}>
			<div className="flex items-center gap-2 bg-black/70 backdrop-blur-md px-4 py-2 rounded-full w-full max-w-sm border border-white/10 shadow-md">
				
				<input
					type="text"
					placeholder="Search..."
					className="bg-transparent outline-none text-white placeholder-white/70 flex-1"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>

				<button
					disabled={!search.trim()}
					className="text-white hover:text-orange-900 transition disabled:opacity-50"
				>
					<FaSearch />
				</button>

			</div>
		</form>
	);
};

export default SearchInput;