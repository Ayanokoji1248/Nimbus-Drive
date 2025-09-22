import axios from 'axios';
import { CloudUpload } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../lib';
import useUserStore from '../store/userStore';

const RegisterPage = () => {
    const navigate = useNavigate()

    const { setUser } = useUserStore();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BACKEND_URL}/auth/register`, {
                username,
                email,
                password
            }, { withCredentials: true });
            setUser(response.data.user)
            navigate('/dashboard')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="w-full h-screen bg-zinc-950 text-white flex justify-center items-center">
            <div className="w-108 flex justify-center items-center py-5 flex-col">

                <div className='flex flex-col justify-center items-center gap-3'>

                    <div className='p-3 bg-[#1E1E1E] w-fit rounded-xl'>
                        <CloudUpload size={40} className='text-violet-500' />
                    </div>
                    <div className='flex flex-col items-center justify-center '>
                        <h1 className='font-bold text-3xl'>Cimbus Drive</h1>
                        <h2 className="font-medium text-lg text-zinc-300">Create account</h2>
                    </div>
                </div>

                <div className='w-full py-6 px-6 mt-5 flex items-start justify-start rounded-xl bg-[#181818] flex-col'>
                    <div className='flex flex-col gap-2'>
                        <h1 className='font-semibold text-lg'>Sign Up</h1>
                        <p className='text-sm text-zinc-400'>Create your account to start managing files</p>
                    </div>

                    <div className='mt-5 w-full'>
                        <form method='POST' onSubmit={handleSubmit} className='flex flex-col gap-5'>
                            <div className='flex flex-col gap-2'>
                                <label className='text-sm font-medium' htmlFor="username">Username</label>
                                <input value={username} onChange={(e) => setUsername(e.target.value)} className='w-full p-1.5 outline-none border-[1px] rounded-md border-zinc-700 bg-[#141414] focus-within:border-violet-500 focus-within:border-2 text-sm' type="text" name="username" id="username" placeholder='axelblaze' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='text-sm font-medium' htmlFor="email">Email</label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} className='w-full p-1.5 outline-none border-[1px] rounded-md border-zinc-700 bg-[#141414] focus-within:border-violet-500 focus-within:border-2 text-sm' type="email" name="email" id="email" placeholder='axel12@gmail.com' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='text-sm font-medium' htmlFor="password">Password</label>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} className='w-full p-1.5 outline-none border-[1px] rounded-md border-zinc-700 bg-[#141414] focus-within:border-violet-500 focus-within:border-2 text-sm' type="password" name="password" id="password" placeholder='******' />
                            </div>

                            <button type='submit' className='bg-violet-500 p-2 rounded-md font-semibold text-sm'>Sign In</button>
                        </form>
                    </div>

                    <div className='mt-5 w-full'>
                        <p className='text-zinc-400 font-medium text-sm text-center'>Already have an account? <Link to={'/login'} className='text-violet-500'>Login</Link> </p>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default RegisterPage