
import { BsDot } from "react-icons/bs";
import { FaAngleDown } from "react-icons/fa6";
import { FiSave } from "react-icons/fi";
import { VscEyeClosed } from "react-icons/vsc";

import ToggleKeyboardButton from "./Keyboard/ToggleKeyboardBtn";


import { TextSpace } from "../types/textSpace.type";
import { MdCheck } from "react-icons/md";
import { TEXT_SPACE_COLOR_OPTIONS } from "../assets/constants";


export default function EditTextSpace({ textSpace }: { textSpace: TextSpace | null }) {

    if(!textSpace) return;

    return (
        <form className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[calc(100vh_-_60px)] relative">
            <div className="flex flex-col gap-10">
                <div className="flex items-center gap-4 border-b border-gray-400 pr-2">
                    <input 
                        id="text-space-title"
                        name="title"
                        placeholder="Space title" 
                        value={textSpace.title} 
                        className="h-12 md:h-16 pr-2 flex-1 text-lg md:text-[2rem] font-semibold bg-transparent placeholder:text-gray-600 text-gray-800 focus:outline-none" 
                    />
                    <ToggleKeyboardButton inputId="text-space-title" />
                </div>
                <ul className="flex flex-wrap items-center gap-2">
                    {
                        TEXT_SPACE_COLOR_OPTIONS.map(({ value, background }) => (
                            <li className={`relative w-8 aspect-square rounded-full ${background}`}>
                                <input type="radio" name="color" value={value} className="peer absolute top-0 left-0 w-full h-full opacity-0" />
                                <span className="peer-checked:opacity-100 opacity-0 pointer-events-none w-full h-full flex items-center justify-center rounded-full bg-black/50 text-white">
                                    <MdCheck size={20} />
                                </span>
                            </li>
                        ))
                    }
                </ul>
                <div className="flex flex-col gap-6">
                    <h3 className="font-semibold text-xl text-gray-500">Advanced options</h3>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between gap-4">
                            <h4 className="font-semibold text-gray-600">Read only</h4>
                            <button type="button" className="w-12 rounded-full p-1 bg-white border border-gray-200">
                                <span className="block h-6 w-6 bg-gray-300 rounded-full"></span>
                            </button>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                            <h4 className="font-semibold text-gray-600">Keep annonymous</h4>
                            <button type="button" className="w-12 rounded-full p-1 bg-white border border-gray-200">
                                <span className="block h-6 w-6 bg-gray-300 rounded-full"></span>
                            </button>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                            <h4 className="font-semibold text-gray-600">Secured</h4>
                            <button type="button" className="w-12 rounded-full p-1 bg-white border border-gray-200">
                                <span className="block h-6 w-6 bg-gray-300 rounded-full"></span>
                            </button>
                        </div>
                        <div className="flex items-center gap-2 border-b border-gray-400 has-[input:focus]:border-gray-800 overflow-clip">
                            <input 
                                type="password" 
                                id="text-space-password"
                                name="password"
                                placeholder="Password" 
                                className="h-12 placeholder:text-gray-400 text-gray-800 flex-1 bg-transparent focus:outline-none focus:border-none" 
                            />
                            <ToggleKeyboardButton inputId="text-space-password" />
                            <button type="button" className="min-w-10 aspect-square rounded-full ml-2 flex items-center justify-center bg-white hover:bg-gray-100 text-gray-800">
                                <VscEyeClosed size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex flex-col gap-4">
                <div className="relative">
                    <textarea name="content" id="text-space-area" value={textSpace?.content} className="w-full min-h-[60vh] rounded-[30px] bg-transparent border border-gray-400 p-6" placeholder="Write something...">
                    </textarea>
                    <div className="absolute bottom-4 right-4">
                        <ToggleKeyboardButton inputId="text-space-area" />
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <ul className="text-gray-400 flex items-center flex-wrap">
                        <li className="flex items-center justify-center gap-2">
                            <span className="text-sm font-semibold"><span className="text-gray-600">{textSpace?.content?.split(/\s/)?.length}</span> / 250 words</span>
                        </li>
                        <BsDot size={24} />
                        <li className="flex items-center justify-center gap-2">
                            <span className="text-sm font-semibold"><span className="text-gray-600">{textSpace?.content?.length}</span> / 2600 chars.</span>
                        </li>
                    </ul>
                    <button className="flex items-center justify-center gap-2 text-black px-2">
                        <span className="text-sm font-semibold">{textSpace?.links?.length} {textSpace?.links?.length === 1 ? 'link' : 'links'}</span>
                        <FaAngleDown size={12} />
                    </button>
                </div>
                <div className="flex items-center gap-4 mt-2">
                    <button className="btn group relative flex items-center justify-center gap-3 w-[90%] m-auto">
                        <span className="font-semibold relative text-sm">Save Changes</span>
                        <FiSave size={18} className="relative group-hover:scale-110 transition-transform" />
                    </button>
                </div>
            </div>
        </form>
    )
}