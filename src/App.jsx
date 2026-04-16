import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home.jsx'
import Login from './pages/login/Login.jsx'
import SignUp from './pages/signup/SignUp.jsx'
import {Toaster} from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext.jsx'

function App() {
  const {authUser}= useAuthContext();
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Toaster position="top-center"  />
       <Routes>
        <Route path='/' element={authUser ? <Home></Home>:<Navigate to = {'/login'}></Navigate>}/>
        <Route path='/login' element={authUser ? <Navigate to = '/'></Navigate>:<Login></Login>}/>
        <Route path='/signup' element={authUser ? <Navigate to = '/'></Navigate> : <SignUp></SignUp>}/>
       </Routes>
       <Toaster></Toaster>
    </div>
  )
}

export default App
