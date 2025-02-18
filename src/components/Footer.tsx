
import { useContext } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../App";
import { CiLogout } from "react-icons/ci";

import logo from "../assets/images/tekst_logo.svg"

const NAV_LINKS = [
    {
        title: "Home",
        link: "/my-spaces"
    },
    {
        title: "Explore spaces",
        link: "/spaces"
    },
    {
        title: "About developer",
        link: "/about"
    },
    {
        title: "Donate",
        link: "/about"
    },
    {
        title: "GitHub",
        link: "/about"
    }
]

export default function Footer() { 
    const { user, clearAuthentication } = useContext(authContext);
    const navigate = useNavigate();

    function logout() {
        clearAuthentication();
        navigate('/spaces');
    }

    return (
        <div className="bg-[#101010] min-h-screen flex flex-col pt-10 -mt-8">
            <div className="bg-[#efefef] w-full -mt-10 h-10 rounded-b-[20px] md:rounded-b-[40px]"></div>
            <footer className=" flex-1 text-white relative overflow-clip pt-10 pb-4 md:pb-10 px-2 md:px-0 flex flex-col justify-end md:justify-between gap-10 md:gap-6">
                <span className="absolute bottom-0 left-[50%] translate-x-[-50%] translate-y-[50%] h-[100px] w-[600px] block">
                    <span className="block w-full h-[20%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-gradient-to-r from-purple-800 via-purple-600 to-purple-800 rounded-[50%] blur-[50px]"></span>
                    <span className="block h-[50%] aspect-square absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-purple-500 rounded-[50%] blur-[50px]"></span>
                </span>
                <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4 gap-y-8 max-w-[var(--max-width)] w-full my-0 m-auto px-4 md:px-8 py-10">
                    <div className="sm:col-span-2 md:col-span-1 flex flex-col gap-12">
                        <Link to="/" className="flex items-center justify-center w-20 aspect-square rounded-full bg-gradient-to-br from-blue-500 to-pink-400">
                            <img src={logo} className="w-10" />
                        </Link>
                        <div className="flex flex-col gap-4">
                            <h2 className="text-3xl md:text-3xl font-bold">Tekst</h2>
                            <h3 className="text-xl text-gray-400 max-w-[32ch]">Share your text privately between friends and devices.</h3>
                        </div>
                    </div>
                    <div className="flex flex-1 gap-6">
                        <ul className="flex flex-col gap-2">
                            {
                                NAV_LINKS.map(({ title, link }, index) => (
                                    <li key={index}>
                                        <Link to={!user?.id && title === "Home" ? "/" : link} className="text-lg font-semibold text-gray-300 h-12 rounded-full md:px-6 flex items-center justify-start md:justify-start md:hover:bg-white/10 hover:text-white whitespace-nowrap">{title}</Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="flex flex-wrap h-fit gap-2 md:gap-4">
                        {
                            user?.id ?
                                <button onClick={logout} className="h-12 min-w-[120px] flex items-center justify-center gap-2 px-6 border border-white/20 text-white/60 hover:border-transparent hover:bg-white/10 hover:text-white/80 transition-colors backdrop-blug-lg rounded-full">
                                    <CiLogout size={16} />
                                    <span className="text-sm whitespace-nowrap font-light">Log out</span>
                                </button> :
                                <>
                                <span className="group relative rounded-full p-[1px] w-fit sm:w-full md:w-auto h-fit bg-gradient-to-r from-pink-400 via-purple-500 to-blue-600">
                                    <Link to="/sign-in" className="relative h-12 min-w-[120px] flex items-center justify-center gap-4 px-6 bg-[#101010] group-hover:bg-transparent transition-colors backdrop-blur-lg rounded-full">
                                        <span className="relative text-white text-sm whitespace-nowrap font-light">Sign in</span>
                                    </Link>
                                </span>
                                <span className="group relative rounded-full p-[1px] w-fit sm:w-full md:w-auto h-fit bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600">
                                    <Link to="/sign-up" className="relative h-12 min-w-[120px] flex items-center justify-center gap-4 px-6 bg-[#101010] group-hover:bg-transparent transition-colors backdrop-blug-lg rounded-full">
                                        <span className="relative text-white text-sm whitespace-nowrap font-light">Create an account</span>
                                        <AiOutlineArrowRight size={16} className="hidden md:inline-block" />
                                    </Link>
                                </span>
                                </>
                        }
                    </div>
                </div>
                <div className="relative border border-white/20 rounded-3xl my-0 m-auto p-4 md:p-8 grid md:grid-cols-2 gap-4 w-full max-w-[var(--max-width)]">
                    <div className="flex flex-col gap-4">
                        <p className="text-sm text-gray-400 mt-2 max-w-[48ch]">This is a passion project built and developed by Ezema Emmanuel.</p>
                        <p className="text-sm text-gray-300 mt-2 max-w-[48ch] font-semibold">&#169; Copyright {(new Date()).getFullYear()} Tekst.</p>
                    </div>
                    <div className="flex flex-col gap-4 justify-between">
                        <p className="font-semibold text-sm text-gray-300 mt-2 max-w-[48ch]">Follow us</p>
                        <ul className="w-full md:w-fit flex flex-wrap items-center gap-4 border-none">
                            {
                                ["GH", "LN", "TW", "IN"].map((socials, index) => (
                                    <li key={index} className="group flex-1 h-12 min-w-16 px-6 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
                                        <span className="font-light text-lg text-gray-200 group-hover:text-white">{socials}</span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    )
};