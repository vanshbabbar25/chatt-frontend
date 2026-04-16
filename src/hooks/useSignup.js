import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext.jsx';

const useSignup = () => {  
    const [loading,setLoading] = useState(false);
    const { setAuthUser } = useAuthContext(); // ✅ correct object destructuring

  const signup = async (inputs, profilePic) => {
		const { fullName, username, password, confirmPassword, gender } = inputs;
		const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
		if (!success) return;
       setLoading(true);

       try {
        			const formData = new FormData();
              formData.append("fullName", fullName);
              formData.append("username", username);
              formData.append("password", password);
              formData.append("confirmPassword", confirmPassword);
              formData.append("gender", gender);
              if (profilePic) {
                formData.append("profilePic", profilePic); // ✅ send only if present
              }

              const res = await fetch("/api/auth/signup", {
                method: "POST",
                body: formData, // ✅ no need for headers (browser sets it)
              });
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Server returned invalid response (HTML instead of JSON)");
        }
        const data = await res.json();
        if(data.error){
          throw new Error(data.error)
        }
        console.log(data)

        //localstorage
        localStorage.setItem("chat-user",JSON.stringify(data))
        //context
        setAuthUser(data)
       } catch (error) {
        toast.error(error.message)
       }finally{
        setLoading(false);
       }
    }
return {loading,signup}

}

export default useSignup


function handleInputErrors({fullName,username,password,confirmPassword,gender}){
  if(!fullName || !username || !password || !confirmPassword || !gender){
     toast.error("please fill in all details")
     return false;
  }
  if(password !== confirmPassword){
    toast.error('passwords do not match');
    return false;
  }
  if(password.length<6){
    toast.error("password must be at least of 6 characters");
    return false;
  }
  return true;
}