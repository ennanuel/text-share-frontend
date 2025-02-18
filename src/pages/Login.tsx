
import React, { useContext, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { FaArrowRight } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

import { authContext } from "../App";
import { fetchOptions } from "../assets/data";
import { Bounce, toast } from "react-toastify";
import { TbAlertCircleFilled } from "react-icons/tb";

export default function Login() {
    const navigate = useNavigate();

    const { checkAuthentication, user } = useContext(authContext);

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
    };

    useEffect(() => {
        user?.id && navigate('/my-spaces');
        const pageTitleElement = document.getElementById("page-title");

        if(pageTitleElement) pageTitleElement.innerText = "Tekst | Sign in";
    }, []);

    return (
        <div id="login-page" className="relative w-full p-4 md:p-10">
            <div className="m-auto my-0 max-w-[var(--max-width)] h-full flex flex-col lg:flex-row justify-center lg:justify-end items-center">
                <div className="hidden md:block flex-1">
                    <h2 className="text-[4.5rem] leading-[5rem] font-bold text-white">Great to have you back</h2>
                </div>
                <div className="rounded-[32px] w-full max-w-[480px] bg-white border-2 border-gray-800 p-4 sm:p-6 md:p-8 flex flex-col items-center gap-6">
                    {
                        error ?
                            <div className="relative w-full overflow-clip flex items-center px-4 h-12 bg-red-200/50 text-red-500 rounded-xl gap-3 before:absolute before:top-0 before:left-0 before:w-[6px] before:h-full before:bg-red-500 border border-red-200/80">
                                <TbAlertCircleFilled size={16} />
                                <span className="flex-1 text-xs font-semibold">Log in failed!</span>
                            </div> :
                            null
                    }
                    <h3 className="text-3xl font-semibold text-gray-800">Sign in</h3>
                    <div className="w-full flex flex-col gap-2">
                        <button type="button" className="w-full px-4 h-12 rounded-full border border-gray-300 flex items-center justify-center gap-2 hover:bg-gray-100 peer-hover:scale-75 transition-transform">
                            <FcGoogle size={20} />
                            <span className="text-gray-800 text-sm font-semibold whitespace-nowrap">Continue with Google</span>
                        </button>
                    </div>
                    <div className="w-4/5 h-[1px] flex items-center justify-center gap-3 bg-gray-200 my-4">
                        <span className="text-gray-400 text-xs font-light px-3 bg-white w-fit">or</span>
                    </div>
                    <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4 w-full">
                        <div>
                            <input 
                                type="text" 
                                placeholder="Username or email" 
                                value={usernameOrEmail}
                                onChange={handleChange}
                                name="usernameOrEmail" 
                                id="username" 
                                className="h-12 w-full border border-gray-300 rounded-full px-4 block text-sm flex-1 bg-transparent focus:outline-none focus:border-gray-600" 
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center border border-gray-300 text-gray-600 rounded-full pr-1 has-[input:focus]:border-gray-600">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    value={password}
                                    onChange={handleChange}
                                    id="passord"
                                    name="password"
                                    placeholder="Password" 
                                    className="h-12 px-4 block text-sm flex-1 bg-transparent rounded-l-full focus:outline-none" 
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="flex items-center justify-center h-8 aspect-square rounded-full bg-gray-100">
                                    {showPassword ? <VscEyeClosed size={16} /> : <VscEye size={16} />}
                                </button>
                            </div>

                            <a href="#" className="text-sm text-gray-600 underline w-max px-4">Forgot Password?</a>
                        </div>
                        <div className="flex items-center justify-center gap-4 mt-4">
                            <button className={`${loading ? 'pointer-events-none' : ''} relative group flex items-center justify-center px-4 h-14 bg-black/80 text-white rounded-full w-full`}>
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
                        </div>
                    </form>

                    <span className="m-auto text-sm text-gray-500">New here? <Link to="/sign-up" className="underline text-gray-800">Create an account</Link></span>
                </div>
            </div>
        </div>
    )
}