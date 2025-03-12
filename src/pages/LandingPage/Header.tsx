import { motion } from 'framer-motion';
import { useState } from 'react';

import logo from "../../assets/images/tekst_logo_dark.svg";
import logoLight from "../../assets/images/tekst_logo.svg";
import { FiGithub } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { MdOutlineMoreHoriz } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';

type Props = {
    chooseSection: (index: number, changePrevSectionToo?: boolean) => void;
    activeSection: {
        index: number;
        value: string;
        width: number;
        translateX: number;
    };
    prevSection: React.MutableRefObject<{
        index: number;
        value: string;
        width: number;
        translateX: number;
    }>;
}

const LINKS = [
    {
        title: "Intro",
        value: ""
    },
    {
        title: "Features",
        value: "features"
    },
    {
        title: "How it works",
        value: "how-it-works"
    },
    {
        title: "FAQs",
        value: "faq"
    },
];


export default function Header({ chooseSection, activeSection, prevSection }: Props) {    
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const chooseNewSection = () => {
        prevSection.current = activeSection;
        setShowMobileMenu(false);
    };
    const revertBackToOriginal = () => {
        chooseSection(prevSection.current.index);
    };

    return (
        <header className="bg-gray-100 sticky top-0 z-10">
            <div className="my-0 mx-auto max-w-[var(--big-max-width)] hidden lg:grid grid-cols-[200px_1fr_200px] items-center p-4 md:px-6">
                <div className="flex items-center justify-start">
                    <a href={`${import.meta.env.BASE_URL}`} className="flex items-center justify-center">
                        <img src={logo} alt="Website logo" className="w-10 h-auto" />
                        <span className="font-bold text-4xl text-gray-800 -ml-1 tracking-tighter">ekst</span>
                    </a>
                </div>
                <div className="flex items-center justify-center">
                    <ul className="relative flex items-center justify-center border border-gray-300 rounded-full bg-gray-100 overflow-">
                        <span style={{ transform: `translateX(${activeSection.translateX}px)` }} className="transition-transform ease-expo duration-500 absolute top-0 left-0 flex items-center justify-center h-full"
                        >
                            <motion.span className="block rounded-full bg-[var(--blue)] max-w-[calc(100%_-_8px)] w-full h-[calc(100%_-_8px)]" layout style={{ width: activeSection.width }} />
                        </span>
                        {
                            LINKS.map(({ title, value }, index) => (
                                <li key={index} className="relative" onMouseOver={() => chooseSection(index)}>
                                    <a
                                        onClick={chooseNewSection} 
                                        onMouseOut={revertBackToOriginal}
                                        href={`#${value}`}
                                        className={ `${prevSection.current.index === index && activeSection.index === index ? 'text-white' : 'text-gray-500 hover:text-white'} section-btn transition-colors duration-300 h-12 min-w-[120px] p-5 flex items-center justify-center`}
                                    >
                                        <span className="text-sm sm:text-base font-semibold tracking-tight pointer-events-none">{title}</span>
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="flex items-center justify-end gap-2">
                    <a href="https://github.com/ennanuel/text-share-frontend.git" className="h-12 w-12 rounded-full bg-gray-200 text-[var(--blue)] flex items-center justify-center">
                        <FiGithub size={20} />
                    </a>
                    <Link to="/spaces" className="h-12 rounded-full px-6 flex items-center justify-center bg-[var(--blue)] text-white">
                        <span className="text-sm sm:text-base font-semibold">Get started</span>
                    </Link>
                </div>
            </div>
            <div className="relative flex justify-between items-center lg:hidden w-full">
                <div className="w-full px-4 md:px-6 p-4 flex items-center justify-between">
                    <a href={`${import.meta.env.BASE_URL}`} className="flex items-center justify-center">
                        <img src={logo} alt="Website logo" className="w-10 h-auto" />
                        <span className="text-gray-800 font-bold text-4xl -ml-1 tracking-tighter">ekst</span>
                    </a>
                    <button onClick={() => setShowMobileMenu(true)} className="text-gray-800 border-gray-800 flex items-center justify-center w-10 aspect-square rounded-full border-2 sm:border-4">
                        <MdOutlineMoreHoriz size={24} />
                    </button>
                </div>
                <div 
                    style={{ 
                        clipPath: showMobileMenu ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" : "polygon(0 0, 100% 0, 100% 0, 0 0)",
                        pointerEvents: showMobileMenu ? "all" : "none"
                    }} 
                    className={`transition-[clip-path] duration-500 ease-expo pt-4 pb-4 md:pb-6 md:pt-40 px-4 md:px-6 top-0 left-0 flex flex-col justify-between gap-6 fixed w-screen h-dvh bg-[var(--blue)]`}
                >
                    <div className="w-full flex items-center justify-between relative z-10">
                        <a href={`${import.meta.env.BASE_URL}`} className="flex items-center justify-center">
                            <img src={logoLight} alt="Website logo" className="w-10 h-auto" />
                            <span className="text-white font-bold text-4xl -ml-1 tracking-tighter">ekst</span>
                        </a>
                        <button onClick={() => setShowMobileMenu(false)} className="border-white text-white flex items-center justify-center w-10 aspect-square rounded-full border-4">
                            <IoClose size={24} />
                        </button>
                    </div>
                    <ul className="flex flex-col gap-4">
                        {
                            LINKS.map(({ title, value }, index) => (
                                <li key={index} className="relative" onMouseOver={() => chooseSection(index)}>
                                    <a
                                        href={`#${value}`}
                                        onClick={chooseNewSection} 
                                        onMouseOut={revertBackToOriginal}
                                        className={ `${prevSection.current.index === index && activeSection.index === index ? 'text-yellow-300 font-inter font-bold' : 'text-white font-semibold'}`}
                                    >
                                        <span className="text-4xl md:text-5xl tracking-tight pointer-events-none">{title}</span>
                                    </a>
                                </li>
                            ))
                        }
                    </ul> 
                    <div className="flex justify-between gap-4">
                        <Link to="/spaces" className="h-12 md:h-14 rounded-full border border-white bg-white text-[var(--blue)] flex items-center justify-center px-6">
                            <span className="text-lg md:text-2xl font-semibold tracking-tight">Get started</span>
                        </Link>
                        <Link to="/sign-up" className="h-12 md:h-14 rounded-full border border-white bg-[var(--blue)] text-white flex items-center justify-center px-6">
                            <span className="text-lg md:text-2xl font-semibold tracking-tight">Sign up</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}