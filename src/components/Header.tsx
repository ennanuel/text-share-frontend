import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { BiSearch } from "react-icons/bi";
import { FaVimeoV } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { MdOutlineLightMode, MdOutlineDarkMode, MdClose } from "react-icons/md";
import { AiOutlineArrowRight } from "react-icons/ai";
import ToggleKeyboardButton from "./Keyboard/ToggleKeyboardBtn";
import { IoMdExpand } from "react-icons/io";
import { themeContext } from "./Layout";

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
    const { theme, changeTheme } = useContext(themeContext);
    const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);

    const openMobileMenu = () => setMobileMenuIsOpen(true);
    const closeMobileMenu = () => setMobileMenuIsOpen(false);

    return (
        <header className={`header sticky top-0 z-10 w-full flex gap-4 items-center justify-between px-4 lg:px-6 py-4 ${scrolled ? 'lg:backdrop-blur-md' : ''}`}>
            <Link to="/" className="flex items-center gap-2">
                <span className="h-[50px] aspect-square rounded-[25px] flex justify-center items-center bg-white border border-gray-200 lg:border-none">
                    <FaVimeoV size={20} />
                </span>
            </Link>
            <button onClick={mobileMenuIsOpen ? closeMobileMenu : openMobileMenu} className={`${mobileMenuIsOpen ? 'bg-red-100 border-red-200 text-red-600' : 'bg-white border-gray-300'} relative z-[12] flex lg:hidden items-center justify-center gap-2 h-[50px] rounded-full border px-4`}>
                <span className={`${mobileMenuIsOpen ? 'rotate-90' : ''} transition-transform flex items-center justify-center`}>
                    { mobileMenuIsOpen ? <MdClose size={16} /> : <IoMdExpand size={16} />}
                </span>
                <span className="text-sm font-semibold">
                    {mobileMenuIsOpen ? "Close" : "Menu"}
                </span>
            </button>
            <div className={`${mobileMenuIsOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto' } z-[11] transition-opacity p-6 pt-[100px] lg:pt-0 lg:p-0 absolute lg:relative top-0 left-0 w-full lg:w-auto h-[100vh] lg:h-auto backdrop-blur-lg lg:backdrop-blur-none bg-white/80 duration-300 lg:bg-transparent flex flex-col lg:flex-row items-center justify-center lg:justify-between flex-1 gap-10 lg:gap-4`}>
                <nav className="flex-1 md:ml-6 lg:ml-8">
                    <ul className="h-full lg:h-auto flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-8 lg:gap-4">
                        {
                            NAV_LINKS.map(({ title, link }, index) => (
                                <li key={index}>
                                    <NavLink to={link} className={({ isActive }) => `font-semibold px-2 whitespace-nowrap ${isActive ? 'text-black' : 'text-black/70'} text-4xl lg:text-base`}>{title}</NavLink>
                                </li>
                            ))
                        }
                    </ul>
                </nav>
                <form className="h-[70px] lg:h-[50px] w-full lg:w-auto rounded-full bg-white flex items-center min-w-[200px] pr-[15px] lg:pr-[5px] outline-2 outline-transparent has-[input:focus]:outline-black border border-gray-200">
                    <input type="text" id="search" placeholder="Search..." className="lg:text-sm flex-1 pl-4 pr-2 focus:outline-none bg-transparent" />
                    <ToggleKeyboardButton inputId="search" />
                    <button className='flex items-center justify-center ml-1 h-[40px] w-[40px] rounded-full bg-black text-white'>
                        <BiSearch size={18} />
                    </button>
                </form>
                <div className="w-full lg:w-auto flex flex-col-reverse gap-6 lg:gap-4 lg:flex-row items-center justify-center lg:justify-start">
                    <div className="w-full lg:w-auto flex items-center justify-between lg:justify-start gap-4">
                        <button
                            onClick={changeTheme}
                            className={`relative group h-[60px] lg:h-[50px] w-[60px] lg:w-[50px] rounded-full overflow-hidden block border ${theme === "light" ? 'bg-white border-gray-200' : 'bg-black border-black text-white'} transition-[background-color] duration-300`}
                        >
                            <span className={`flex flex-col transition-transform ${theme === "light" ? '' : 'translate-y-[-50%]'} duration-500`}>
                                <span className="flex items-center justify-center min-w-[60px] lg:min-w-[50px] min-h-[60px] lg:min-h-[50px]">
                                    <MdOutlineLightMode size={18} className="transition-transform group-hover:scale-125 duration-300" />
                                </span>
                                <span className="flex items-center justify-center min-w-[60px] lg:min-w-[50px] min-h-[60px] lg:min-h-[50px]">
                                    <MdOutlineDarkMode size={18} className="transition-transform group-hover:scale-125 duration-300" />
                                </span>
                            </span>
                        </button>
                        <a href="https://github.com/ennanuel" target="_blank" className="group h-[60px] lg:h-[50px] min-w-[60px] lg:min-w-[50px] bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-black hover:text-white">
                            <FiGithub size={18} className="transition-transform group-hover:scale-125 duration-300" />
                        </a>
                    </div>
                    <Link to="/signup" className="group login-nav-btn relative group h-[60px] lg:h-[50px] rounded-full overflow-hidden flex items-center justify-center gap-2 px-6">
                        <span className="absolute z-[1] block top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-full rounded-full bg-white group-hover:scale-y-[.90] scale-y-[.9] group-hover:scale-x-[.96] scale-x-[.96] lg:scale-100 transition-transform"></span>
                        <span className="font-semibold text-sm relative z-[1] whitespace-nowrap">Sign up</span>
                        <AiOutlineArrowRight size={16} className="transition-transform group-hover:translate-x-1 relative z-[1]" />
                    </Link>
                </div>
            </div>
        </header>
    )
}