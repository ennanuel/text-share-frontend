
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { fetchOptions } from "../assets/data";
import { useFetch } from "../utils/fetch";

import Loading from "./Loading";

import logo from "../assets/images/tekst_logo.svg";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FiGithub, FiInstagram, FiLinkedin, FiTwitter } from "react-icons/fi";
import { BiSolidDonateHeart } from "react-icons/bi";
import { CSSProperties } from "react";

const LINKS = [
    {
        title: "Home",
        link: "/"
    },
    {
        title: "Explore",
        link: "/spaces"
    },
    {
        title: "About Developer",
        link: "/about"
    },
]

const SOCIALS = [
    {
        Icon: FiTwitter,
        link: "/"
    },
    {
        Icon: FiLinkedin,
        link: "/"
    },
    {
        Icon: FiGithub,
        link: "/"
    },
    {
        Icon: FiInstagram,
        link: "/"
    }
]


export default function LoginAndRegisterLayout () {
    const { loading, data } = useFetch<{ userId: string }>(`${import.meta.env.VITE_SERVER_URL}/auth/check`, fetchOptions);
    const { pathname } = useLocation();

    if(data?.userId) return <Navigate to="/my-spaces" />

    return (
        <div 
            style={{ 
                backgroundImage: loading ? '' : `url(./images/${pathname.includes('sign-up') ? 'background_for_signup.jpg' : 'background_for_signin.jpg)'}`, 
            }} 
            className="relative bg-white">
            <div className="min-h-screen flex bg-fixed bg-no-repeat bg-cover flex-col bg-black/30">
                <header className="sticky top-0 z-10 text-white py-4 px-4 sm:px-6">
                    <div style={headerMask} className="absolute top-0 left-0 w-full h-full pointer-events-none backdrop-blur-lg bg-black/50"></div>
                    <div className="relative my-0 m-auto max-w-[var(--max-width)] flex items-center justify-between gap-4">
                        <Link to="/" className="flex items-center justify-center">
                            <img src={logo} className="w-8 h-auto" />
                            <span className="font-bold text-3xl">ekst</span>
                        </Link>
                        {
                            pathname.includes('sign-in') ?
                                <Link to="/sign-up" className="h-10 pl-5 pr-3 rounded-full hover:bg-black/10 flex items-center justify-center gap-3 text-blue-400 hover:text-blue-200">
                                    <span className="font-semibold text-sm">Create account</span>
                                    <AiOutlineArrowRight size={16} />
                                </Link> :
                                <Link to="/sign-in" className="h-10 pl-5 pr-3 rounded-full hover:bg-black/10 flex items-center justify-center gap-3 text-blue-400 hover:text-blue-200">
                                    <span className="font-semibold text-sm">Login</span>
                                    <AiOutlineArrowRight size={16} />
                                </Link>
                        }
                    </div>
                </header>
                {
                    loading ?
                        <div className="flex-1 bg-white flex items-center justify-center">
                            <Loading text="Please wait..." />
                        </div> :
                        <div className="flex flex-1">
                            <Outlet />
                        </div>

                }
            </div>
            <footer className="bg-white border-t border-gray-200 px-6">
                <div className="my-0 m-auto max-w-[var(--max-width)] py-10 flex flex-col gap-10 md:gap-4">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between gap-8 md:gap-4">
                        <ul className="flex flex-wrap items-center gap-4">
                            {
                                LINKS.map(({ title, link }, index) => (
                                    <>
                                        {index > 0 ? <hr key={index} className="w-[1px] h-4 border-none outline-none bg-gray-400" /> : null}
                                        <li key={title}>
                                            <Link to={link} className="hover:underline h-10 flex items-center justify-center">
                                                <span className="text-sm sm:text-base text-gray-800">{title}</span>
                                            </Link>
                                        </li>
                                    </>
                                ))
                            }
                        </ul>
                        <a href="#" className="group flex items-center justify-center gap-2 h-10 pl-1 pr-4 rounded-full bg-green-400 hover:bg-white hover:text-green-500 text-white border border-white hover:border-green-300">
                            <span className="flex items-center justify-center w-8 aspect-square rounded-full bg-white group-hover:bg-green-400/20 text-green-500">
                                <BiSolidDonateHeart size={18} />
                            </span>
                            <span className="font-bold text-sm">Donate</span>
                        </a>
                    </div>
                    <ul className="-ml-2 flex items-center gap-2 flex-wrap">
                        {
                            SOCIALS.map(({ Icon, link }, index) => (
                                <li key={index}>
                                    <a href={link} className="w-10 aspect-square rounded-full hover:bg-black/10 flex items-center justify-center text-gray-800 hover:text-gray-600">
                                        <Icon size={20} />
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                    <p className="text-sm text-gray-500">© {(new Date()).getFullYear()} Tekst Trademarks and brands are the property of their respective owners.</p>
                </div>
            </footer>
        </div>
    );
};

const headerMask: CSSProperties = {
    maskImage: 'linear-gradient(black, transparent)'
}