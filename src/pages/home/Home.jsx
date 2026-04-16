import MessageContainer from "../../components/message/MessageContainer.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx";

const Home = () => {
	return (
		<div className='flex sm:h-[450px] md:h-[550px] w-[70%] 
 rounded-lg overflow-hidden bg-stone-600 bg-clip-padding backdrop-filter backdrop-blur-none bg-opacity-40'>
			<Sidebar />
            <MessageContainer></MessageContainer>
		</div>
	);
};
export default Home;

//flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'
//                               h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-none bg-opacity-40 border border-gray-100a