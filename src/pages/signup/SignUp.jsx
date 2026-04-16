import React, { useState } from 'react'
import GenderCheckBox from './GenderCheckBox';
import { Link } from 'react-router-dom';
import useSignup from '../../hooks/useSignup';

const SignUp = () => {
    const [profilePic, setProfilePic] = useState(null);

	const[inputs,setInputs] = useState({
		fullName:'',
		username:'',
		password:'',
		confirmPassword:'',
		gender:'',
	})
    const {loading,signup} = useSignup()
	const handleSubmit = async (e) => {
		e.preventDefault();
		await signup(inputs, profilePic);
   };

	const handleCheckboxChange=(gender)=>{
		setInputs({...inputs,gender})
	}



return (
 		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
 			<div className='w-full p-6 rounded-lg shadow-md bg-black/30 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20'>
 				
				<h1 className='text-3xl font-semibold text-center text-white'>
 					Sign Up <span className='text-red-300'> Chatify</span>
 				</h1>

 				<form onSubmit={handleSubmit}>
 					<div>
 						<label className='label pt-3 pb-1 mt-4'>
 							<span className='text-lg label-text text-white'>Full Name</span>
 						</label>
 						<input type='text' placeholder='Enter Name' className='w-full bg-black input input-bordered  h-10'
						value={inputs.fullName} onChange={(e)=>setInputs({...inputs,fullName:e.target.value})} />
 					</div>

 					<div>
 						<label className='label pt-3 pb-1'>
 							<span className='text-lg label-text  text-white'>Username</span>
 						</label>
 						<input type='text' placeholder='create UserName' className='w-full input bg-black input-bordered h-10'
						value={inputs.username} onChange={(e)=>setInputs({...inputs,username:e.target.value})} />
 					</div>

 					<div>
 						<label className='label pt-3 pb-1'>
 							<span className='text-lg label-text  text-white'>Password</span>
 						</label>
 						<input
 							type='password'
 							placeholder='Enter Password'
 							className='w-full input input-bordered h-10 bg-black text-white'
							value={inputs.password} onChange={(e)=>setInputs({...inputs,password:e.target.value})}
 						/>
 					</div>

 					<div>
 						<label className='label pt-3 pb-1  text-white'>
 							<span className='text-lg label-text'>Confirm Password</span>
 						</label>
 						<input
 							type='password'
 							placeholder='Confirm Password'
 							className='w-full input input-bordered bg-black h-10'
							value={inputs.confirmPassword} onChange={(e)=>setInputs({...inputs,confirmPassword:e.target.value})}
 						/>
 					</div>

				    <div className='pt-3 pb-1'><GenderCheckBox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender}></GenderCheckBox></div>
                    <br></br>
 					<Link  className='text-lg hover:underline hover:text-red-300 mt-2 inline-block flex justify-center  text-white' to='/login'>
 						Already have an account?
 					</Link>

 					<div className='flex justify-center'>
 						<button className='btn w-60 btn-sm h-9 p-3 mt-3 bg-black text-white border  'disabled={loading}>
							{loading ? <span className='loading text-white  loading-spinner'></span> : "Sign Up"}
							</button>
 					</div>
 				</form>
 			</div>
 		</div>
 	);
 };

export default SignUp
