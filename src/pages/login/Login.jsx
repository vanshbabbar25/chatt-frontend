import React from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { useState } from 'react';
import { TbLockPassword } from "react-icons/tb";
import { Link } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const { loading, login } = useLogin();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(username, password);
	};
 	return (
 		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
 			<div className='w-full p-9 rounded-lg shadow-md bg-black/30 bg-clip-padding backdrop-filter backdrop-blur-none bg-opacity-30'>
 				<h1 className='text-3xl font-semibold text-center text-white'>
 					Login
 					<span className='text-red-300'> Chatify</span>
 				</h1>

 				<form onSubmit={handleSubmit}>
 					<div className='text-slate-700'>
 						<label className='label p-2 mt-5'>
					        <FaRegUserCircle className="mr-2 text-lg  text-white" />
 							<span className='text-lg text-white flex label-text'>Username</span>
 						</label>
						
 						<input type='text' placeholder='Enter username' className='w-full bg-black text-white input input-bordered h-10' 
						value={username} onChange={(e)=>setUsername(e.target.value)}/>
 					</div>

 					<div>
 						<label className='label p-2 mt-2'>
							<TbLockPassword className='text-base text-white'/>
 							<span className='text-base label-text text-lg text-white'>Password</span>
 						</label>
 						<input
 							type='password'
 							placeholder='Enter Password'
 							className='w-full input input-bordered bg-black h-10 text-white'
							value={password} onChange={(e)=>setPassword(e.target.value)}
 						/>
 					</div>
          <br></br>
 					<Link to='/signup' className='text-md  hover:underline hover:text-red-300  text-white mt-2 inline-block'>
 						{"Don't"} have an account?
 					</Link>

 					<div>
 						<button className='btn flex items-center justify-center bg-black text-white btn-lg h-9 w-44 mt-2' disabled={loading}>
							{loading ? <span className='loading loading-spinner '></span> : "Login"}
							</button>
 					</div>
 				</form>
 			</div>
 		</div>
 	);
 };

export default Login
