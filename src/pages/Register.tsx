import { Link, useNavigate } from "react-router-dom";

import { FaArrowRight } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useContext, useEffect, useState } from "react";

import { ModifiedError } from "../types/error.type";
import { fetchOptions } from "../assets/data";
import { authContext } from "../App";
import { Bounce, toast } from "react-toastify";
import { TbAlertCircleFilled } from "react-icons/tb";

export default function Register() {
    const navigate = useNavigate();
    const { checkAuthentication, user } = useContext(authContext);

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
            navigate('/my-spaces');
            toast.success(`Welcome ${values.username || values.name}!`, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        } catch (error) {
            
            const message = (error as ModifiedError).message;
            const errors = ((error as ModifiedError).errors) || {};

            console.error(message);
            if ((error as ModifiedError).errors) setErrors({ ...errors });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        user?.id && navigate('/my-spaces');
        
        const pageTitleElement = document.getElementById("page-title");

        if(pageTitleElement) pageTitleElement.innerText = "Tekst | Sign in";
    }, []);

    return (
        <div id="register-page" className="relative w-full p-4 md:p-10">
            <div className="m-auto my-0 max-w-[var(--max-width)] h-full flex flex-col lg:flex-row justify-center lg:justify-end items-center">
                <div className="hidden md:block flex-1">
                    <h2 className="text-[4.5rem] leading-[5rem] font-bold text-white">Come on, and start sharing.</h2>
                </div>
                <div className="rounded-[32px] w-full max-w-[480px] bg-white border-2 border-gray-800 p-4 sm:p-6 md:p-8 flex flex-col items-center gap-6">
                    {
                        errors ?
                            <div className="relative w-full overflow-clip flex items-center px-4 h-12 bg-red-200/50 text-red-500 rounded-xl gap-3 before:absolute before:top-0 before:left-0 before:w-[6px] before:h-full before:bg-red-500 border border-red-200/80">
                                <TbAlertCircleFilled size={16} />
                                <span className="flex-1 text-xs font-semibold">Regiteration failed</span>
                            </div> :
                            null
                    }
                    <h3 className="text-3xl font-semibold text-gray-800">Sign up</h3>
                    <div className="w-full flex flex-col gap-2">
                        <button type="button" className="w-full px-4 h-12 rounded-full border border-gray-300 flex items-center justify-center gap-2 hover:bg-gray-100 peer-hover:scale-75 transition-transform">
                            <FcGoogle size={20} />
                            <span className="text-gray-800 text-sm font-semibold whitespace-nowrap">Continue with Google</span>
                        </button>
                    </div>
                    <div className="w-4/5 h-[1px] flex items-center justify-center gap-3 bg-gray-200 my-4">
                        <span className="text-gray-400 text-xs font-light px-3 bg-white w-fit">or</span>
                    </div>

                    <form onSubmit={register} className="flex flex-col gap-4 w-full">
                        <div className="text-gray-600 flex flex-col gap-1">
                            <input
                                type="text"
                                name="email"
                                onChange={handleChange}
                                value={values.email}
                                placeholder="Email address"
                                className={`${errors?.email ? 'text-red-500 placeholder:text-red-500 border-red-300' : 'border-gray-300'} min-h-12 w-full px-4 block text-sm flex-1 border rounded-full focus:outline-none`}
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
                                className={`${errors?.username ? 'text-red-500 placeholder:text-red-500 border-red-300' : 'border-gray-300'} min-h-12 w-full px-4 block text-sm flex-1 border rounded-full focus:outline-none`}
                            />
                            {
                                errors?.username ?
                                    <span className="text-xs text-red-500 px-4">{errors?.username}</span> : 
                                    null
                            }
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className={`flex items-center border ${errors?.password ? 'text-red-500 border-red-300' : 'text-gray-600 border-gray-300'} rounded-full pr-1`}>
                                <input
                                    type={showPassword ? 'text' : "password"}
                                    name="password"
                                    onChange={handleChange}
                                    value={values.password}
                                    placeholder="Password"
                                    className={`${errors?.password ? 'placeholder:text-red-500' : ''} h-12 rounded-l-full px-4 block text-sm flex-1 bg-transparent focus:outline-none`}
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
                            <div className={`flex items-center border ${errors?.confirmPassword ? 'text-red-500 border-red-300' : 'text-gray-600 border-gray-300'} rounded-full pr-1`}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    onChange={handleChange}
                                    value={values.confirmPassword}
                                    placeholder="Confirm password"
                                    className={`${errors?.confirmPassword ? 'placeholder:text-red-500' : ''} h-12 rounded-l-full px-4 block text-sm flex-1 bg-transparent focus:outline-none`}
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
                            <button className={`${loading ? 'pointer-events-none' : ''}  relative group flex items-center justify-center px-4 h-14 bg-black/80 text-white rounded-full w-full`}>
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
                        </div>
                    </form>
                    <span className="m-auto text-sm text-gray-500">Already have a Tekst account? <Link to="/sign-in" className="underline text-gray-800">Sign in</Link></span>
                                
                </div>
            </div>
        </div>
    )
}