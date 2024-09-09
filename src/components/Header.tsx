import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { BiSearch } from "react-icons/bi";
import { FaVimeoV } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { MdOutlineLightMode, MdOutlineDarkMode, MdClose } from "react-icons/md";
import { AiOutlineArrowRight } from "react-icons/ai";
import ToggleKeyboardButton from "./Keyboard/ToggleKeyboardBtn";
import { IoMdExpand } from "react-icons/io";

const NAV_LINKS = [
    { 
        title: "Home",
        link: "/landing"
    },
    {
        title: "My spaces",
        link: "/"
    },
    {
        title: "Explore",
        link: "/spaces"
    },
    {
        title: "About",
        link: "/about"
    }
]

export default function Header({ scrolled }: { scrolled: boolean; }) {
    const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);

    const openMobileMenu = () => setMobileMenuIsOpen(true);
    const closeMobileMenu = () => setMobileMenuIsOpen(false);

    return (
        <header className={`header sticky top-0 z-10 w-full flex gap-4 items-center justify-between px-4 md:px-6 py-4 ${scrolled ? 'md:backdrop-blur-md' : ''}`}>
            <Link to="/" className="flex items-center gap-2">
                <span className="h-[50px] aspect-square rounded-[25px] flex justify-center items-center bg-white border border-gray-200 md:border-none">
                    <FaVimeoV size={20} />
                </span>
            </Link>
            <button onClick={mobileMenuIsOpen ? closeMobileMenu : openMobileMenu} className={`${mobileMenuIsOpen ? 'bg-red-100 border-red-200 text-red-600' : 'bg-white border-gray-300'} relative z-[12] flex md:hidden items-center justify-center gap-2 h-[50px] rounded-full border px-4`}>
                <span className={`${mobileMenuIsOpen ? 'rotate-90' : ''} transition-transform flex items-center justify-center`}>
                    { mobileMenuIsOpen ? <MdClose size={16} /> : <IoMdExpand size={16} />}
                </span>
                <span className="text-sm font-semibold">
                    {mobileMenuIsOpen ? "Close" : "Menu"}
                </span>
            </button>
            <div className={`${mobileMenuIsOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto' } z-[11] transition-opacity p-6 pt-[100px] md:pt-0 md:p-0 absolute md:relative top-0 left-0 w-full md:w-auto h-[100vh] md:h-auto backdrop-blur-lg md:backdrop-blur-none bg-white/80 duration-300 md:bg-transparent flex flex-col md:flex-row items-center justify-center md:justify-between flex-1 gap-10 md:gap-4`}>
                <nav className="flex-1 md:ml-6 lg:ml-8">
                    <ul className="h-full md:h-auto flex flex-col md:flex-row items-center justify-center md:justify-start gap-8 md:gap-4">
                        {
                            NAV_LINKS.map(({ title, link }, index) => (
                                <li key={index}>
                                    <NavLink to={link} className={({ isActive }) => `font-semibold px-2 whitespace-nowrap ${isActive ? 'text-black' : 'text-black/70'} text-4xl md:text-base`}>{title}</NavLink>
                                </li>
                            ))
                        }
                    </ul>
                </nav>
                <form className="h-[70px] md:h-[50px] w-full md:w-auto rounded-full bg-white flex items-center min-w-[200px] pr-[15px] md:pr-[5px] outline-2 outline-transparent has-[input:focus]:outline-black border border-gray-200">
                    <input type="text" id="search" placeholder="Search..." className="md:text-sm flex-1 pl-4 pr-2 focus:outline-none bg-transparent" />
                    <ToggleKeyboardButton inputId="search" />
                    <button className='flex items-center justify-center ml-1 h-[40px] w-[40px] rounded-full bg-black text-white'>
                        <BiSearch size={18} />
                    </button>
                </form>
                <div className="w-full md:w-auto flex flex-col-reverse gap-6 md:gap-4 md:flex-row items-center justify-center md:justify-start">
                    <div className="w-full md:w-auto flex items-center justify-between md:justify-start gap-4">
                        <button className="relative group aspect-square w-[60px] md:w-[50px] rounded-full overflow-hidden bg-white block border border-gray-200 focus:bg-black focus:border-black transition-[background-color] duration-300 focus:text-white">
                            <span className="group-focus:translate-y-[105%] transition-transform duration-500 relative flex items-center justify-center h-full w-full">
                                <MdOutlineLightMode size={18} className="transition-transform group-hover:scale-125 duration-300" />
                            </span>
                            <span className="translate-y-[-105%] group-focus:translate-y-[0] transition-transform duration-500 absolute top-0 left-0 w-full h-full flex items-center justify-center">
                                <MdOutlineDarkMode size={18} className="transition-transform group-hover:scale-125 duration-300" />
                            </span>
                        </button>
                        <a href="https://github.com/ennanuel" target="_blank" className="group h-[60px] md:h-[50px] min-w-[60px] md:min-w-[50px] bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-black hover:text-white">
                            <FiGithub size={18} className="transition-transform group-hover:scale-125 duration-300" />
                        </a>
                    </div>
                    <Link to="/signup" className="group login-nav-btn relative group h-[60px] md:h-[50px] rounded-full overflow-hidden flex items-center justify-center gap-2 px-6">
                        <span className="absolute z-[1] block top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-full rounded-full bg-white group-hover:scale-y-[.90] scale-y-[.9] group-hover:scale-x-[.96] scale-x-[.96] md:scale-100 transition-transform"></span>
                        <span className="font-semibold text-sm relative z-[1] whitespace-nowrap">Sign up</span>
                        <AiOutlineArrowRight size={16} className="transition-transform group-hover:translate-x-1 relative z-[1]" />
                    </Link>
                </div>
            </div>
        </header>
    )
}