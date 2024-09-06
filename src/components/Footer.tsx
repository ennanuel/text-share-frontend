
import { AiOutlineArrowRight } from "react-icons/ai";
import { FaVimeoV } from "react-icons/fa";
import { FiLinkedin, FiGithub, FiTwitter, FiInstagram } from "react-icons/fi";
import { Link } from "react-router-dom";

const NAV_LINKS = [
    {
        title: "Home",
        link: "/"
    },
    {
        title: "Explore spaces",
        link: "/spaces"
    },
    {
        title: "About",
        link: "/about"
    }
]

export default function Footer() { 
    return (
        <footer className="min-h-[200px] bg-black text-white mt-[50px] relative overflow-clip p-20 flex justify-between items-center gap-10">
            <span className="absolute bottom-0 left-[50%] translate-x-[-50%] translate-y-[50%] h-[100px] w-[600px] block">
                <span className="block w-full h-[20%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-gradient-to-r from-purple-800 via-purple-600 to-purple-800 rounded-[50%] blur-[50px]"></span>
                <span className="block h-[50%] aspect-square absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-purple-500 rounded-[50%] blur-[50px]"></span>
            </span>
            <div className="flex flex-1 flex-col justify-between gap-8">
                <div className="flex items-center gap-4">
                    <FaVimeoV size={60} />
                    <div className="flex flex-col gap-1">
                        <h2 className="text-3xl font-semibold">Text Sharer</h2>
                        <h3 className="text-lg font-semibold text-gray-300">Share your text privately between friends and devices.</h3>
                    </div>
                </div>
                <p className="text-sm text-gray-400 mt-2">This is a passion project built and developed by Ezema Emmanuel. Learn more about this <span>project</span></p>
                <ul className="flex items-center gap-4 border-t border-white/20 pt-6">
                    <li className="flex items-center justify-center w-[46px] aspect-square rounded-full bg-white text-black">
                        <FiGithub size={20} />
                    </li>
                    <li className="flex items-center justify-center w-[46px] aspect-square rounded-full bg-white text-black">
                        <FiLinkedin size={20} />
                    </li>
                    <li className="flex items-center justify-center w-[46px] aspect-square rounded-full bg-white text-black">
                        <FiTwitter size={20} />
                    </li>
                    <li className="flex items-center justify-center w-[46px] aspect-square rounded-full bg-white text-black">
                        <FiInstagram size={20} />
                    </li>
                </ul>
            </div>
            <div className="flex justify-end flex-1 gap-6">
                <ul className="flex flex-col gap-2">
                    {
                        NAV_LINKS.map(({ title, link }, index) => (
                            <li key={index}>
                                <Link to={link} className="text-sm text-gray-300 h-[40px] rounded-full px-6 flex items-center  hover:bg-white/10 hover:text-white">{title}</Link>
                            </li>
                        ))
                    }
                    <li className="group rounded-full p-[2px] bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600">
                        <Link to="/signup" className="relative h-[50px] flex items-center gap-4 px-6 bg-black rounded-full">
                            <span className="relative text-white text-sm font-semibold">Sign up</span>
                            <AiOutlineArrowRight size={18} className="relative group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
    )
};