import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils/Utils'

const Login = () => {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
    })
    const navgiate = useNavigate()


    const handleChange = (e)=>{
        const {name, value} = e.target;
        const copyLoginInfo = {...loginInfo}
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo)
    }

    const handleLogin = async(e)=>{
        e.preventDefault();
        const  {email, password} = loginInfo;
        if(!email || !password){
            return handleError('Please fill the form correctly!')
        }
        try {
            const url = "http://localhost:8080/auth/login";
            const response = await fetch(url, {
                method: "POST", 
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify(loginInfo),
            })
            const result = await response.json();
            const { success, message, jwtToken, name, error} = result;
            localStorage.setItem('token', jwtToken)
            localStorage.setItem('loggedInUser', name)
            if(success){
                handleSuccess(message);
                setTimeout(() => {
                    navgiate('/home')
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
        <h1 className='text-3xl font-bold mb-5'>Login</h1>
        <form className='flex flex-col gap-2' onSubmit={handleLogin}>
            <div className='flex flex-col'>
                <label className='text-lg' htmlFor='email'>Email</label>
                <input className='w-[100%] text-lg p-2 border-b border-black outline-none placeholder:text-xs placeholder:italic' 
                onChange={handleChange}
                type="email" 
                name='email'
                placeholder='Enter your email'
                value={loginInfo.email}
                />
            </div>
            <div className='flex flex-col'>
                <label className='text-lg' htmlFor='password'>Password</label>
                <input className='w-[100%] text-lg p-2 border-b border-black outline-none placeholder:text-xs placeholder:italic'
                onChange={handleChange}
                type="password" 
                name='password'
                placeholder='Enter your password'
                value={loginInfo.password}
                />
            </div>
            <button type='submit' className='bg-purple-800 border-none text-xl text-white rounded-md p-2 my-2.5 cursor-pointer'>Signup</button>
            <span>Don't have an account?  
                <Link to="/signup" className='no-underline text-blue-500 hover:underline'>Signup</Link>
            </span>
        </form>
    </div>
  )
}

export default Login