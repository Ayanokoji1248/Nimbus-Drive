import { CloudUpload } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../lib';
import axios from 'axios';
import useUserStore from '../store/userStore';
import useLoadingStore from '../store/loadingStore';

const LoginPage = () => {
    const navigate = useNavigate();

    const { setUser } = useUserStore();
    const { loading, setLoading } = useLoadingStore()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axios.post(`${BACKEND_URL}/auth/login`, {
                email,
                password
            }, { withCredentials: true })

            setUser(response.data.user)
            navigate('/dashboard')
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
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
                        <h2 className="font-medium text-lg text-zinc-300">Welcome Back</h2>
                    </div>
                </div>

                <div className='w-full py-6 px-6 mt-5 flex items-start justify-start rounded-xl bg-[#181818] flex-col'>
                    <div className='flex flex-col gap-2'>
                        <h1 className='font-semibold text-lg'>Sign In</h1>
                        <p className='text-sm text-zinc-400'>Enter your email and password to access your files</p>
                    </div>

                    <div className='mt-5 w-full'>
                        <form onSubmit={handleSubmit} method='POST' className='flex flex-col gap-5'>

                            <div className='flex flex-col gap-2'>
                                <label className='text-sm font-medium' htmlFor="email">Email</label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} className='w-full p-1.5 outline-none border-[1px] rounded-md border-zinc-700 bg-[#141414] focus-within:border-violet-500 focus-within:border-2 text-sm' type="email" name="email" id="email" placeholder='example@gmail.com' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='text-sm font-medium' htmlFor="password">Password</label>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} className='w-full p-1.5 outline-none border-[1px] rounded-md border-zinc-700 bg-[#141414] focus-within:border-violet-500 focus-within:border-2 text-sm' type="password" name="password" id="password" placeholder='******' />
                            </div>

                            <button type='submit' disabled={loading} className='bg-violet-500 p-2 rounded-md font-semibold text-sm flex w-full items-center justify-center gap-3 cursor-pointer hover:bg-violet-600 transition-all duration-300'>
                                {loading &&
                                    <div role="status">
                                        <svg aria-hidden="true" className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                }
                                Sign In</button>
                        </form>
                    </div>

                    <div className='mt-5 w-full'>
                        <p className='text-zinc-400 font-medium text-sm text-center'>Don't have an account? <Link to={'/register'} className='text-violet-500'>Register</Link> </p>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default LoginPage