import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const Register = () => {

    const navigate = useNavigate()
    const [name, setName] = useState('');
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, { name, emailId, password })

            if (data.success) {
                alert(data.message);
                navigate('/login')
            } else {
                alert(data.message)
            }

        } catch (error) {
            console.log(error);
            alert('something went wrong')

        }
    }

    return (
        <div>
            <Header />
            <form className='auth-form' onSubmit={handleSubmit}>
                <input onChange={(e) => setName(e.target.value)} type="text" placeholder='Enter your name...' value={name} />
                <input onChange={(e) => setEmailId(e.target.value)} type="email" placeholder='Enter your email id...' value={emailId} />
                <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Create password...' value={password} />
                <button type='submit'>Submit</button>

            </form>

            <Footer />
        </div>
    )

}

export default Register