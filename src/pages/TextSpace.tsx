import { BiCopy } from "react-icons/bi";
import { BsDot } from "react-icons/bs";
import { FaAngleDown } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { IoLink } from "react-icons/io5";
import { MdPerson } from "react-icons/md";
import OptionsModal from "../components/OptionsModal";
import { AiOutlineArrowLeft } from "react-icons/ai";

import ToggleKeyboardButton from "../components/Keyboard/ToggleKeyboardBtn";


export default function TextSpace() { 
    return (
        <body className="flex flex-col md:flex-row gap-8 min-h-[calc(100vh_-_60px)] relative mt-10 px-6 md:px-[10vw]">
            <div className="flex-1 flex-col justify-between gap-10">
                <div className="flex flex-col gap-10">
                    <div className="flex items-center justify-between gap-4">
                        <button className="btn relative aspect-square flex items-center justify-center">
                            <AiOutlineArrowLeft size={20} className="relative" />
                        </button>
                        <h1 className="text-[2rem] font-bold flex-1">Page title</h1>
                        <OptionsModal />
                    </div>
                    <ul className="flex flex-wrap items-center gap-2">
                        <li className="font-semibold flex items-center gap-2 h-[35px] rounded-full bg-white pl-[5px] pr-3">
                            <span className="flex items-center justify-center h-[25px] w-[25px] rounded-full bg-black text-white">
                                <MdPerson size={16} />
                            </span>
                            <span className="text-sm font-semibold">Anonymous</span>
                        </li>
                        <li className="h-[35px] rounded-full bg-white text-sm font-semibold flex gap-2 items-center justify-center pl-[5px] pr-3">
                            <span className="flex items-center justify-center h-[25px] w-[25px] rounded-full bg-black text-white">
                                <FiClock size={16} />
                            </span>
                            <span>20 mins. ago</span>
                        </li>
                        <li className="h-[35px] rounded-full bg-white text-sm font-semibold flex flex-row-reverse gap-2 items-center justify-center pl-[5px] pr-3">
                            <span>10 views</span>
                            {
                                [1, 2, 3, 4, 5].map((item, index, arr) => (
                                    <span key={index} className={`relative flex ${index == arr.length - 1 ? '' : 'ml-[-20px]'} items-center justify-center h-[23px] w-[23px] rounded-full bg-gray-200 border-2 border-white`}>
                                        <MdPerson size={16} />
                                    </span>
                                ))
                            }
                        </li>
                    </ul>
                    <p className="text-gray-400">Visit the website on two devices or browser windows <br />Enter your text in the field to share.</p>
                    <div className="flex items-center gap-4 bg-white rounded-full p-2 shadow-md shadow-black/10">
                        <input type="url" className="flex-1 h-[45px] text-sm bg-transparent px-4" placeholder="https://google.com" />
                        <button className="relative h-[45px] bg-black text-white hover:bg-black/90 rounded-full flex items-center justify-center gap-2 px-4">
                            <IoLink size={18} />
                            <span className="text-sm font-semibold">Copy Link</span>
                        </button>
                    </div>
                </div>
                <div></div>
            </div>
            <div className="flex-1 flex flex-col gap-4">
                <div className="relative">
                    <textarea name="" id="text-space-area" className="w-full min-h-[60vh] rounded-[30px] ng-white shadow-lg shadow-black/10 p-6" placeholder="Text that is in this space..."></textarea>
                    <div className="absolute bottom-4 right-4">
                        <ToggleKeyboardButton inputId="text-space-area" />
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <ul className="text-gray-400 flex items-center flex-wrap">
                        <li className="flex items-center justify-center gap-2">
                            <span className="text-sm font-semibold"><span className="text-gray-600">50</span> / 250 words</span>
                        </li>
                        <BsDot size={24} />
                        <li className="flex items-center justify-center gap-2">
                            <span className="text-sm font-semibold"><span className="text-gray-600">140</span> / 2600 chars.</span>
                        </li>
                    </ul>
                    <button className="flex items-center justify-center gap-2 text-black px-2">
                        <span className="text-sm font-semibold">10 links</span>
                        <FaAngleDown size={12} />
                    </button>
                </div>
                <div className="flex items-center gap-4 mt-2">
                    <button className="btn group relative flex items-center justify-center gap-3 w-[90%] m-auto">
                        <span className="font-semibold relative text-sm">Copy to clipboard</span>
                        <BiCopy size={18} className="relative group-hover:scale-110 transition-transform" />
                    </button>
                </div>
            </div>
        </body>
    )
};