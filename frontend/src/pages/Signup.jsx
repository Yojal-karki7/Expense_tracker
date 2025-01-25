import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils/Utils'

const Signup = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: '',
    })
    const navgiate = useNavigate()


    const handleChange = (e)=>{
        const {name, value} = e.target;
        const copySignupInfo = {...signupInfo}
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo)
    }

    const handleSignup = async(e)=>{
        e.preventDefault();
        const {name, email, password} = signupInfo;
        if(!name || !email || !password){
            return handleError('Please fill the form correctly!')
        }
        try {
            const url = backendUrl + "/auth/signup";
            const response = await fetch(url, {
                method: "POST", 
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify(signupInfo),
            })
            const result = await response.json();
            const { success, message, error} = result;
            if(success){
                handleSuccess(message);
                setTimeout(() => {
                    navgiate('/login')
                }, 1000);
            }
            else if(error) {
                const details = error?.details[0].message;
                handleError(details)
            }else if(!success) {
                handleError(message)
            }
        } catch (error) {
            handleError(error)
        }
    }
    
  return (
    <div className='bg-[#fff] py-8 px-12 rounded-lg w-[100%] max-w-[400px] shadow-2xl'>
        <h1 className='text-3xl font-bold mb-5'>Signup</h1>
        <form className='flex flex-col gap-2' onSubmit={handleSignup}>
            <div className='flex flex-col'>
                <label className='text-lg' htmlFor='name'>Name</label>
                <input className='w-[100%] text-lg p-2 border-b border-black outline-none placeholder:text-xs placeholder:italic'
                type="text" 
                onChange={handleChange}
                name='name'
                autoFocus
                placeholder='Enter your name'
                value={signupInfo.name}
                />
            </div>
            <div className='flex flex-col'>
                <label className='text-lg' htmlFor='email'>Email</label>
                <input className='w-[100%] text-lg p-2 border-b border-black outline-none placeholder:text-xs placeholder:italic' 
                onChange={handleChange}
                type="email" 
                name='email'
                placeholder='Enter your email'
                value={signupInfo.email}
                />
            </div>
            <div className='flex flex-col'>
                <label className='text-lg' htmlFor='password'>Password</label>
                <input className='w-[100%] text-lg p-2 border-b border-black outline-none placeholder:text-xs placeholder:italic'
                onChange={handleChange}
                type="password" 
                name='password'
                placeholder='Enter your password'
                value={signupInfo.password}
                />
            </div>
            <button type='submit' className='bg-purple-800 border-none text-xl text-white rounded-md p-2 my-2.5 cursor-pointer'>Signup</button>
            <span>Already have an account?  
                <Link to="/login" className='no-underline text-blue-500 hover:underline'>login</Link>
            </span>
        </form>
        <ToastContainer />
    </div>
  )
}

export default Signup
