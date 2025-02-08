import { Link, useNavigate } from "react-router-dom";

import { FaVimeoV, FaArrowRight } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiAlertTriangle } from "react-icons/fi";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useContext, useState } from "react";

import { ModifiedError } from "../types/error.type";
import { fetchOptions } from "../assets/data";
import { authContext } from "../App";

export default function Register() {
    const navigate = useNavigate();
    const { checkAuthentication } = useContext(authContext);

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string; } | null>(null);

    const [values, setValues] = useState({ name: "", email: "", username: "", password: "", confirmPassword: "" });
    const [showPassword, setShowPassword] = useState(false);

    const clearValues = () => setValues({ name: "", email: "", username: "", password: "", confirmPassword: "" });

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const element = event.target as HTMLInputElement;
        setValues(prev => ({ ...prev, [(element.name)]: element.value }));
        setErrors(prev => {
            if (!prev) return prev;

            const newPrev = { ...prev };
            delete newPrev[element.name];

            return newPrev;
        })
    };

    const register: React.FormEventHandler<HTMLFormElement> = async (event) => { 
        try {
            event.preventDefault();

            if(loading) return;
            setLoading(true);
            setErrors(null);

            const options = {
                ...fetchOptions,
                method: "POST",
                body: JSON.stringify(values)
            };

            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/register`, options);
            const result = await response.json();
            
            if (response.status !== 200) throw result;

            clearValues();
            checkAuthentication();
            navigate('/')
        } catch (error) {
            
            const message = (error as ModifiedError).message;
            const errors = ((error as ModifiedError).errors) || {};

            console.error(message);
            if ((error as ModifiedError).errors) setErrors({ ...errors });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id="register-page" className="relative w-full min-h-[100vh] flex flex-col items-center justify-center p-4 md:p-10 overflow-clip">
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
                    <h2 className="font-bold text-3xl text-gray-800">Sign up</h2>
                    <p className="text-gray-500">Set up a new account</p>
                </div>
                <form onSubmit={register} className="flex-1 flex flex-col gap-4 w-full">
                    {
                        errors ?
                            <div className="flex items-center px-3 py-2 bg-red-100 text-red-500 rounded-full gap-2">
                                <FiAlertTriangle size={12} />
                                <span className="flex-1 text-xs font-semibold">Registeration failed!</span>
                            </div> :
                            null
                    }
                    <div className="text-gray-600 flex flex-col gap-1">
                        <input
                            type="text"
                            name="email"
                            onChange={handleChange}
                            value={values.email}
                            placeholder="Email address"
                            className={`${errors?.email ? 'text-red-500 placeholder:text-red-500 border-red-300' : 'border-gray-300'} min-h-[40px] w-full px-4 block text-sm flex-1 border rounded-full focus:outline-none`}
                        />
                        {
                            errors?.email ?
                                <span className="text-xs text-red-500 px-4">{errors?.email}</span> : 
                                null
                        }
                    </div>
                    <div className="text-gray-600 flex flex-col gap-1">
                        <input
                            type="text"
                            name="username"
                            onChange={handleChange}
                            value={values.username}
                            placeholder="Username"
                            className={`${errors?.username ? 'text-red-500 placeholder:text-red-500 border-red-300' : 'border-gray-300'} min-h-[40px] w-full px-4 block text-sm flex-1 border rounded-full focus:outline-none`}
                        />
                        {
                            errors?.username ?
                                <span className="text-xs text-red-500 px-4">{errors?.username}</span> : 
                                null
                        }
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className={`flex items-center border ${errors?.password ? 'text-red-500 border-red-300' : 'text-gray-600 border-gray-300'} rounded-full pr-[5px]`}>
                            <input
                                type={showPassword ? 'text' : "password"}
                                name="password"
                                onChange={handleChange}
                                value={values.password}
                                placeholder="Password"
                                className={`${errors?.password ? 'placeholder:text-red-500' : ''} h-[40px] rounded-l-full px-4 block text-sm flex-1 bg-transparent focus:outline-none`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="flex items-center justify-center h-[30px] aspect-square rounded-full bg-gray-100 text-black"
                            >
                                {
                                    showPassword ?
                                        <VscEyeClosed size={16} /> :
                                        <VscEye size={16} />
                                }
                            </button>
                        </div>
                        {
                            errors?.password ?
                                <span className="text-xs text-red-500 px-4">{errors?.password}</span> : 
                                null
                        }
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className={`flex items-center border ${errors?.confirmPassword ? 'text-red-500 border-red-300' : 'text-gray-600 border-gray-300'} rounded-full pr-[5px]`}>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="confirmPassword"
                                onChange={handleChange}
                                value={values.confirmPassword}
                                placeholder="Confirm password"
                                className={`${errors?.confirmPassword ? 'placeholder:text-red-500' : ''} h-[40px] rounded-l-full px-4 block text-sm flex-1 bg-transparent focus:outline-none`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="flex items-center justify-center h-[30px] aspect-square rounded-full bg-gray-100 text-black"
                            >
                                {
                                    showPassword ?
                                        <VscEyeClosed size={16} /> :
                                        <VscEye size={16} />
                                }
                            </button>
                        </div>
                        {
                            errors?.confirmPassword ?
                                <span className="text-xs text-red-500 px-4">{errors?.confirmPassword}</span> : 
                                null
                        }
                    </div>
                    <div className="flex items-center justify-center gap-4 mt-6">
                        <button className={`${loading ? 'pointer-events-none' : ''} peer btn relative group flex items-center justify-center px-4 h-[50px] rounded-full w-[95%]`}>
                            {
                                loading ?
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="text-sm font-semibold relative">Please wait...</span>
                                    </span> :
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="text-sm font-semibold relative">Create account</span>
                                        <FaArrowRight size={14} className="group-hover:translate-x-2 transition-transform relative" />
                                    </span>
                            }
                        </button>

                        <span className="h-[50px] aspect-square rounded-full border border-gray-300 flex items-center justify-center gap-2 hover:bg-gray-100 peer-hover:scale-75 transition-transform">
                            <FcGoogle size={20} />
                        </span>
                    </div>
                </form>

                <span className="m-auto text-sm text-gray-500">Already have an account? <Link to="/sign-in" className="font-semibold text-gray-800 hover:underline">Sign in</Link></span>
            </div>
        </div>
    )
}