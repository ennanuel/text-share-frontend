
import React, { useContext, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { FaVimeoV, FaArrowRight } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { FiAlertTriangle } from "react-icons/fi";

import { authContext } from "../App";
import { fetchOptions } from "../assets/data";
import { Bounce, toast } from "react-toastify";

export default function Login() {
    const navigate = useNavigate();

    const { checkAuthentication } = useContext(authContext);

    const [showPassword, setShowPassword] = useState(false);
    const [{ usernameOrEmail, password }, setValues] = useState({ usernameOrEmail: "", password: "" });    
    
    const [{ loading, error }, setFetchState] = useState({ loading: false, error: false });

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        try {
            event.preventDefault();
            if(loading) return;
            
            setFetchState({ error: false, loading: true });
            
            const options = {
                ...fetchOptions,
                method: "POST",
                body: JSON.stringify({ usernameOrEmail, password })
            };

            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/login`, options);
            const result = await response.json();
            
            if (response.status !== 200) throw result;

            checkAuthentication();
            navigate('/my-spaces');
            toast.success(`Welcome back ${usernameOrEmail}!`, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        } catch (error) {
            setFetchState((prev) => ({ ...prev, error: true }));
        } finally {
            setFetchState((prev) => ({ ...prev, loading: false }));
        }
    }

    return (
        <div id="login-page" className="relative w-full min-h-[100vh] flex flex-col items-center justify-center p-4 md:p-10 overflow-clip">
            <div className="fixed top-0 left-0 w-[100vw] h-[100vh]">
                <span className="absolute block w-[600px] h-[50px] top-0 left-0 translate-x-[-50%] translate-y-[-50%] bg-[#5757c6] rounded-[50%] blur-[60px]"></span>
                <span className="absolute block w-[100px] h-[100px] top-0 left-0 translate-x-[-50%] translate-y-[-50%] bg-[#4040a7] rounded-full blur-[60px]"></span>
                <span className="absolute block w-[600px] h-[50px] bottom-0 right-0 translate-x-[50%] translate-y-[50%] bg-pink-400 rounded-[50%] blur-[60px]"></span>
                <span className="absolute block w-[500px] aspect-square bottom-0 right-0 translate-x-[50%] translate-y-[50%] bg-pink-300 rounded-full blur-[60px]"></span>
                <span className="absolute block w-[50px] h-[400px] top-[50%] right-0 translate-x-[50%] translate-y-[-50%] bg-purple-400 rounded-[50%] blur-[60px]"></span>
                <span className="absolute block w-[100px] aspect-square top-[50%] right-0 translate-x-[50%] translate-y-[-50%] bg-purple-200 rounded-full blur-[60px]"></span>
            </div>
            <div className="relative w-full max-w-[400px] bg-white rounded-[30px] shadow-lg shadow-black/10 p-4 md:p-8 flex flex-col gap-6 justify-center items-center">
                <FaVimeoV size={40} className="m-auto" />
                <div className="flex flex-col gap-1 justify-center items-center">
                    <h2 className="font-bold text-3xl text-gray-800">Welcome back!</h2>
                    <p className="text-gray-500">Sign in to your account</p>
                </div>
                {
                    error ?
                        <div className="w-full flex items-center px-3 py-2 bg-red-100 text-red-500 rounded-full gap-2">
                            <FiAlertTriangle size={12} />
                            <span className="flex-1 text-xs font-semibold">Log in failed!</span>
                        </div> :
                        null
                }
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4 w-full">
                    <div>
                        <input 
                            type="text" 
                            placeholder="Username or email" 
                            value={usernameOrEmail}
                            onChange={handleChange}
                            name="usernameOrEmail" 
                            id="username" 
                            className="h-[40px] w-full border border-gray-300 rounded-full px-4 block text-sm flex-1 bg-transparent" 
                        />
                    </div>

                    <div className="flex items-center border border-gray-300 text-gray-600 rounded-full pr-[5px]">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            value={password}
                            onChange={handleChange}
                            id="passord"
                            name="password"
                            placeholder="Password" 
                            className="h-[40px] px-4 block text-sm flex-1 bg-transparent rounded-l-full" 
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="flex items-center justify-center h-[30px] aspect-square rounded-full bg-gray-100">
                            {showPassword ? <VscEyeClosed size={16} /> : <VscEye size={16} />}
                        </button>
                    </div>
                    <a href="#" className="text-sm text-gray-600 hover:underline w-max px-4 mt-[-8px]">Forgot password?</a>
                    <div className="flex items-center justify-center gap-4 mt-4">
                        <button className={`${loading ? 'pointer-events-none' : ''} peer btn relative group flex items-center justify-center px-4 h-[50px] rounded-full w-[95%]`}>
                            {
                                loading ?
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="text-sm font-semibold relative">Please wait...</span>
                                    </span> :
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="text-sm font-semibold relative">Log in</span>
                                        <FaArrowRight size={14} className="group-hover:translate-x-2 transition-transform relative" />
                                    </span>
                            }
                        </button>

                        <button type="button" className="h-[50px] aspect-square rounded-full border border-gray-300 flex items-center justify-center gap-2 hover:bg-gray-100 peer-hover:scale-75 transition-transform">
                            <FcGoogle size={20} />
                        </button>
                    </div>
                </form>

                <span className="m-auto text-sm text-gray-500">Don't have an account? <Link to="/sign-up" className="font-semibold hover:underline text-gray-800">Sign up</Link></span>
            </div>
        </div>
    )
}