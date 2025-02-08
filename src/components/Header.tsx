import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { AiOutlineArrowRight } from "react-icons/ai";
import { BiCollection, BiSearch, BiUser } from "react-icons/bi";
import { BsFillCollectionFill, BsFillGridFill } from "react-icons/bs";
import { FaAngleDown, FaAngleLeft, } from "react-icons/fa6";
import { FiInfo } from "react-icons/fi";
import { MdOutlineLightMode, MdOutlineDarkMode, MdClose } from "react-icons/md";

import ToggleKeyboardButton from "./Keyboard/ToggleKeyboardBtn";
import { authContext } from "../App";
import { themeContext } from "./Layout";
import { keyboardContext } from "./Keyboard";

import logo from "../assets/images/tekst_logo_dark.svg";

const NAV_LINKS = [
    {
        title: "My spaces",
        Icon: BsFillCollectionFill,
        link: "/my-spaces"
    },
    {
        title: "Explore",
        Icon: BiCollection,
        link: "/spaces"
    },
    {
        title: "About",
        Icon: FiInfo,
        link: "/about"
    }
]

export default function Header() {
    const { user } = useContext(authContext);
    const { closeKeyboard } = useContext(keyboardContext);
    const { theme, changeTheme } = useContext(themeContext);
    
    const [showSearch, setShowSearch] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const toggleSearch = () => {
        setShowSearch(!showSearch);
        if(showSearch) closeKeyboard();
    };

    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
        if(showMobileMenu) closeKeyboard();
    }

    return (
        <div className={`header sticky top-0 z-10 before:pointer-events-none md:before:hidden before:absolute before:top-0 before:left-0 before:w-screen before:h-screen before:backdrop-blur-md before:bg-white/40 transition-opacity ${showMobileMenu ? 'before:duration-500' : 'before:opacity-0'}`}>
            <header className={`max-w-[var(--big-max-width)] m-auto w-full flex gap-4 items-center justify-between p-4`}>
                <div className="lg:mr-14">
                    <Link to="/" className={`flex items-center gap-2 transition-[opacity,_transform] duration-500 ease-expo origin-left ${showMobileMenu ? 'scale-50 md:scale-100 opacity-0 md:opacity-100' : 'delay-100'}`}>
                        <span className="h-12 aspect-square rounded-[24px] flex justify-center items-center bg-white">
                            <img src={logo} className="w-6" />
                        </span>
                    </Link>
                </div>
                <div className="hidden md:flex justify-between items-center gap-4 flex-1">
                    <nav className="relative flex flex-col flex-1 max-w-fit h-14">
                        <div className={`relative z-10 flex items-center justify-between gap-2 bg-black/80 backdrop-blur-md p-2 ${showSearch ? 'rounded-t-[28px]' : 'rounded-[28px]'} transition-[border-radius] duration-300`}>
                            <ul className="h-full lg:h-auto flex items-center justify-start gap-2">
                                {
                                    NAV_LINKS
                                        .filter(({ title }) => user?.id ? true : title !== "My spaces")
                                        .map(({ title, link, Icon }, index) => (
                                        <li key={index}>
                                            <NavLink to={link} className={({ isActive }) => `${isActive ? 'active-link bg-white text-black' : 'inactive-link text-white/70 hover:bg-white/10'} px-4 h-10 rounded-full flex items-center justify-center gap-2`}>
                                                <Icon size={16} className="icon" />
                                                <span className="text-sm whitespace-nowrap">{title}</span>
                                            </NavLink>
                                        </li>
                                    ))
                                }
                            </ul>
                            <button onClick={toggleSearch} className={`flex items-center justify-center w-10 aspect-square rounded-full ${showSearch ? 'bg-white text-black' : 'bg-white/10 hover:bg-white hover:text-black text-white'}`}>
                                {showSearch ? <MdClose size={20} /> : <BiSearch size={20} />}
                            </button>
                        </div>
                        <div className={`flex items-center gap-2 bg-black/80 backdrop-blur-md p-2 rounded-b-[28px] border-t border-white/20 ${showSearch ? 'rounded-b-[28px]' : 'rounded-[28px] opacity-0 -translate-y-full pointer-events-none'} transition-[opacity,_transform,_border-radius] duration-300`}>
                            <input id="search" placeholder="Search..." type="text" className="pl-4 pr-2 bg-transparent text-sm rounded-full h-8 flex-1 text-white placeholder:text-white/50 focus:outline-none focus:border-none" />
                            <ToggleKeyboardButton inputId="search" darkMode />
                        </div>
                    </nav>
                </div>
                <div className="hidden md:flex gap-3 items-center justify-end">
                    <button
                        onClick={changeTheme}
                        className={`relative group w-fit lg:w-12 h-[60px] lg:h-12 rounded-full overflow-hidden flex justify-center border ${theme === "light" ? 'bg-white border-gray-200' : 'bg-black border-black text-white'} transition-[background-color] duration-300`}
                    >
                        <span className={`flex flex-col transition-transform ${theme === "light" ? '' : 'translate-y-[-50%]'} duration-500`}>
                            <span className="flex items-center justify-center min-w-[60px] lg:min-w-12 min-h-[60px] lg:min-h-12">
                                <MdOutlineLightMode size={18} className="transition-transform group-hover:scale-125 duration-300" />
                            </span>
                            <span className="flex items-center justify-center min-w-[60px] lg:min-w-12 min-h-[60px] lg:min-h-12">
                                <MdOutlineDarkMode size={18} className="transition-transform group-hover:scale-125 duration-300" />
                            </span>
                        </span>
                    </button>
                    {
                        user?.id ?
                            <button className="flex items-center justify-center h-12 rounded-full text-gray-800 bg-white border border-gray-200 px-4 gap-3">
                                <BiUser size={20} />
                                <FaAngleDown size={14} />
                            </button> :
                            <Link to="/sign-up" className="group login-nav-btn relative group h-[60px] lg:h-12 rounded-full overflow-hidden flex items-center justify-center gap-2 px-6">
                                <span className="absolute z-[1] block top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-full rounded-full bg-white group-hover:scale-y-[.90] scale-y-100 group-hover:scale-x-[.96] scale-100 transition-transform"></span>
                                <span className="font-semibold text-sm relative z-[1] whitespace-nowrap">Sign up</span>
                                <AiOutlineArrowRight size={16} className="transition-transform group-hover:translate-x-1 relative z-[1]" />
                            </Link>
                    }
                </div>

                <div className="w-full flex md:hidden flex-col gap-6 items-end h-12 max-h-12">
                    <form className={`${showMobileMenu ? 'delay-100' : 'opacity-0 pointer-events-none'} absolute top-4 left-4 w-[calc(100%_-_92px)] transition-[opacity,_transform] duration-500 origin-right flex gap-1 items-center h-12 flex-1 rounded-full px-1 bg-white border border-gray-200`}>
                        <input type="text" id="mobile-search" placeholder="Search..." className="w-full bg-transparent h-12 px-3 focus:outline-none" />
                        <ToggleKeyboardButton inputId="mobile-search" />
                        <button className="flex items-center justify-center w-10 aspect-square rounded-full bg-black/10 text-gray-800">
                            <BiSearch size={20} />
                        </button>
                    </form>
                    <div className="flex gap-2 min-h-12 h-12">
                        <button onClick={toggleMobileMenu} className={`${showMobileMenu ? 'rotate-90' : ''} transition-transform ease-expo duration-300 flex items-center justify-center relative z-10 w-12 min-w-12 h-12 rounded-full bg-black/80 text-gray-200 border border-gray-200/50`}>
                            {showMobileMenu ? <MdClose size={20} /> : <BsFillGridFill size={20} className="text-white" /> }
                        </button>
                    </div>
                    <div className={`${!showMobileMenu && 'pointer-events-none'} relative z-[99999] flex flex-col items-end gap-10`}>
                        <ul onClick={() => setShowMobileMenu(false)} className="flex items-end flex-col gap-2">
                            {
                                NAV_LINKS
                                    .filter(({ title }) => user?.id ? true : title !== "My spaces")
                                    .map(({ title, link, Icon }, index) => (
                                    <li key={index} className="w-fit">
                                        <NavLink to={link} style={{ '--delay': `${(((index)/25) + 0.1).toFixed(2)}s` } as React.CSSProperties} className={({ isActive }) => `${isActive ? 'bg-black/80 text-gray-300 inactive-link text-white/70' : 'bg-white text-gray-800'} ${showMobileMenu ? 'delay-[var(--delay)]' : '-translate-y-1/2 scale-50 opacity-0'} duration-500 transition-[opacity,_transform] ease-expo origin-top-right pl-6 pr-3 h-12 rounded-full flex items-center justify-center gap-3 border border-gray-200`}>
                                            <span className="text-sm whitespace-nowrap">{title}</span>
                                            <Icon size={16} className="icon" />
                                        </NavLink>
                                    </li>
                                ))
                            }
                        </ul>
                        <ul className="flex flex-col items-end gap-2">
                            <li>
                                <button className={`${showMobileMenu ? 'delay-[.18s]' : '-translate-y-1/2 scale-50 opacity-0'} duration-500 transition-[opacity,_transform] ease-expo origin-top-right w-fit flex items-center justify-end gap-3 h-12 bg-white rounded-full border border-gray-200 px-3`}>
                                    <FaAngleLeft size={12} className="mr-1" />
                                    <span>My profile</span>
                                    <BiUser size={18} />
                                </button>
                            </li>
                            <li>
                                <button className={`${showMobileMenu ? 'delay-[.22s]' : '-translate-y-1/2 scale-50 opacity-0'} duration-500 transition-[opacity,_transform] ease-expo origin-top-right w-fit flex items-center justify-end gap-3 h-12 bg-white rounded-full border border-gray-200 pl-6 pr-3`}>
                                    <span>Dark mode</span>
                                    <MdOutlineDarkMode size={14} className="mr-2" />
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        </div>
    )
}