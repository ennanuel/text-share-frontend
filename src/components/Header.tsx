
import { Link, NavLink } from "react-router-dom";

import { BiSearch } from "react-icons/bi";
import { FaVimeoV } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { AiOutlineArrowRight } from "react-icons/ai";

const NAV_LINKS = [
    { 
        title: "Home",
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
    return (
        <header className={`header sticky top-0 z-[10] w-full flex gap-4 items-center px-6 py-4 ${scrolled ? 'backdrop-blur-md' : ''}`}>
            <a href="#" className="flex items-center gap-2">
                <span className="h-[50px] aspect-square rounded-[25px] flex justify-center items-center bg-white">
                    <FaVimeoV size={20} />
                </span>
            </a>
            <nav className='flex-1 ml-8'>
                <ul className="flex items-center gap-4">
                    {
                        NAV_LINKS.map(({ title, link }, index) => (
                            <li key={index}>
                                <NavLink to={link} className={({ isActive }) => `font-semibold px-2 ${isActive ? 'text-black' : 'text-[#555555]'}`}>{title}</NavLink>
                            </li>
                        ))
                    }
                </ul>
            </nav>
            <form className="h-[50px] rounded-[25px] bg-white flex items-center min-w-[200px] pr-[5px] outline-2 outline-transparent has-[input:focus]:outline-black shadow-sm shadow-black/10">
                <input type="text" id="search" placeholder="Search..." className="text-sm flex-1 pl-4 pr-2 focus:outline-none bg-transparent" />
                <button className='flex items-center justify-center h-[40px] w-[40px] rounded-full bg-black text-white'>
                    <BiSearch size={18} />
                </button>
            </form>
            <button className="relative group aspect-square w-[50px] rounded-[25px] overflow-hidden bg-white block focus:bg-black transition-[background-color] duration-300 focus:text-white">
                <span className="group-focus:translate-y-[105%] transition-transform duration-500 relative flex items-center justify-center h-full w-full">
                    <MdOutlineLightMode size={18} className="transition-transform group-hover:scale-125 duration-300" />
                </span>
                <span className="translate-y-[-105%] group-focus:translate-y-[0] transition-transform duration-500 absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <MdOutlineDarkMode size={18} className="transition-transform group-hover:scale-125 duration-300" />
                </span>
            </button>
            <a href="https://github.com/ennanuel" target="_blank" className="group h-[50px] min-w-[50px] bg-white rounded-[25px] flex items-center justify-center hover:bg-black hover:text-white">
                <FiGithub size={18} className="transition-transform group-hover:scale-125 duration-300" />
            </a>
            <Link to="/signup" className="group login-nav-btn relative group h-[50px] rounded-full overflow-hidden flex items-center justify-center gap-2 px-6">
                <span className="absolute z-[1] block top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-full rounded-full bg-white group-hover:scale-y-[.90] group-hover:scale-x-[.96] transition-transform"></span>
                <span className="font-semibold text-sm relative z-[1]">Sign up</span>
                <AiOutlineArrowRight size={16} className="transition-transform group-hover:translate-x-1 relative z-[1]" />
            </Link>
        </header>
    )
}