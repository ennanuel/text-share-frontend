import { Link } from "react-router-dom";

import { FaVimeoV, FaArrowRight } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { VscEye } from "react-icons/vsc";

export default function Register({ show }: { show: boolean }) {


    if (!show) return null;

    return (
        <div className="relative w-full max-w-[400px] bg-white rounded-[30px] shadow-lg shadow-black/10 p-8 flex flex-col gap-6 justify-center items-center">
            <FaVimeoV size={40} className="m-auto" />
            <div className="flex flex-col gap-1 justify-center items-center">
                <h2 className="font-bold text-3xl">Sign up</h2>
                <p className="text-gray-500">Set up a new account</p>
            </div>
            <form className="flex-1 flex flex-col gap-4 w-full">
                <div className="text-gray-600">
                    <input type="text" id="email" placeholder="Email address" className="h-[40px] w-full px-4 block text-sm flex-1 border border-gray-300 rounded-full focus:outline-none" />
                </div>
                <div className="text-gray-600">
                    <input type="text" id="username" placeholder="Username" className="h-[40px] w-full px-4 block text-sm flex-1 border border-gray-300 rounded-full focus:outline-none" />
                </div>
                <div className="flex items-center border text-gray-600 border-gray-300 rounded-full pr-[5px]">
                    <input type="password" id="password" placeholder="Password" className="h-[40px] rounded-l-full px-4 block text-sm flex-1 bg-transparent focus:outline-none" />
                    <button className="flex items-center justify-center h-[30px] aspect-square rounded-full bg-gray-100">
                        <VscEye size={16} />
                    </button>
                </div>
                <div className="flex items-center border border-gray-300 text-gray-600 rounded-full pr-[5px]">
                    <input type="password" id="confirm_password" placeholder="Confirm password" className="h-[40px] rounded-l-full px-4 block text-sm flex-1 bg-transparent focus:outline-none" />
                    <button className="flex items-center justify-center h-[30px] aspect-square rounded-full bg-gray-100">
                        <VscEye size={16} />
                    </button>
                </div>
                <div className="flex items-center justify-center gap-4 mt-6">
                    <Link to="/" className="peer btn relative group flex items-center justify-center gap-2 px-4 h-[50px] rounded-full w-[95%]">
                        <span className="text-sm font-semibold relative">Create account</span>
                        <FaArrowRight size={14} className="group-hover:translate-x-2 transition-transform relative" />
                    </Link>

                    <button className="h-[50px] aspect-square rounded-full border border-gray-300 flex items-center justify-center gap-2 hover:bg-gray-100 peer-hover:scale-75 transition-transform">
                        <FcGoogle size={20} />
                    </button>
                </div>
            </form>

            <span className="m-auto text-sm">Already have an account? <Link to="/signup" className="font-bold hover:underline">Sign in</Link></span>
        </div>
    )
}