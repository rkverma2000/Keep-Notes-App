import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/auth'

const Login = () => {
    const navigate = useNavigate()
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [auth, setAuth] = useAuth()

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {

            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, { emailId, password });
            if (data?.success) {
                alert(data.message)
                setAuth({
                    ...auth,
                    user: data.user,
                    token: data.token
                })
                localStorage.setItem('auth', JSON.stringify(data))
                navigate("/my-notes")
            } else {
                alert(data.message);
            }

        } catch (error) {
            console.log(error);
            alert('something went wrong')

        }

    }

    return (
        <div>
            <Header />
            <form className='auth-form' onSubmit={handleSubmit} >
                <input onChange={(e) => setEmailId(e.target.value)} type="email" placeholder='Enter your email id...' value={emailId} />
                <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter your password...' value={password} />
                <button type='submit'>Submit</button>
            </form>
            <Footer />
        </div>
    )
}

export default Login