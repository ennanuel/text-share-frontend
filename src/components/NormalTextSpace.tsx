

import { BiCopy, BiUser } from "react-icons/bi";
import { BsDot } from "react-icons/bs";
import { FaAngleDown } from "react-icons/fa6";
import { FiCheck, FiClock, FiCopy } from "react-icons/fi";
import { VscEye } from "react-icons/vsc";

import OptionsModal from "./OptionsModal";

import { getTextSpaceTime } from "../utils/tekst";

import { TextSpace } from "../types/textSpace.type";



export default function NormalTextSpace({ textSpace, copied, enterEditMode, share, copyLink, remove }: { 
    textSpace: TextSpace | null; 
    enterEditMode: () => void;
    share: () => void; 
    copyLink: () => void;
    remove: () => void; 
    copied: { [key: string]: boolean; }
}) {

    if(!textSpace) return;

    return (
        <div className="flex flex-col md:flex-row gap-8 min-h-[calc(100vh_-_60px)] relative">
            <div className="flex flex-1 flex-col gap-10">
                <div className="flex items-center justify-between gap-4">
                    <h1 className="text-[2rem] font-bold flex-1 text-gray-800">{textSpace?.title || "No title"}</h1>
                    <OptionsModal enterEditMode={enterEditMode} share={share} copyLink={copyLink} remove={remove} />
                </div>
                <ul className="flex flex-wrap items-center gap-2">
                    <li className="font-semibold flex items-center gap-2 h-10 rounded-full bg-white pl-1 pr-4">
                        {
                            textSpace?.owner?.profileImage ?
                                <img className="w-6 aspect-square rounded-full object-cover" /> :
                                <span className="flex items-center justify-center w-8 aspect-square rounded-full bg-gray-200 text-gray-800">
                                    <BiUser size={16} />
                                </span>
                        }
                        <span className="text-sm font-semibold text-gray-800">{textSpace?.owner?.username}</span>
                    </li>
                    <li className="h-10 rounded-full bg-white text-sm font-semibold flex gap-2 items-center justify-center pl-1 pr-4">
                        <span className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 text-gray-800">
                            <FiClock size={16} />
                        </span>
                        <span className="text-gray-800">{getTextSpaceTime(String(textSpace?.createdAt))}</span>
                    </li>
                    <li className="h-10 rounded-full bg-white text-sm font-semibold flex gap-2 items-center justify-center pl-[5px] pr-3">
                        <span className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 text-gray-800">
                            <VscEye size={16} />
                        </span>
                        <span className="text-gray-800">{`${textSpace?.views ? textSpace?.views : 'No'} ${textSpace?.views === 1 ? 'view' : 'views'}`}</span>
                    </li>
                </ul>
                <p className="text-gray-400">Visit the website on two devices or browser windows <br />Enter your text in the field to share.</p>
                <div className="flex items-center gap-4 bg-white rounded-full p-2 border border-gray-200 h-16">
                    <span className="flex-1 text-sm bg-transparent ml-4 text-gray-400 relative block">
                        <span className="absolute top-1/2 -translate-y-1/2 left-0 w-full truncate">{import.meta.env.VITE_LIVE_URL}/space/{textSpace?._id}</span>
                    </span>
                    <button className="relative w-12 aspect-square bg-black text-white hover:bg-black/90 rounded-full flex items-center justify-center gap-2">
                        {copied.link ? <FiCheck size={20} /> : <FiCopy size={20} />}
                    </button>
                </div>
            </div>
            <div className="flex-1 flex flex-col gap-4">
                <div className="relative">
                    <textarea name="" readOnly={true} id="text-space-area" className="w-full min-h-[60vh] rounded-[30px] ng-white shadow-lg shadow-black/10 p-6" placeholder="Text that is in this space...">
                        {textSpace?.content}
                    </textarea>
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
                        <span className="font-semibold relative text-sm">{copied.content ? "Content copied" : "Copy to clipboard"}</span>
                        {
                            copied.content ? 
                                <FiCheck size={18} className="relative group-hover:scale-110 transition-transform" /> : 
                                <BiCopy size={18} className="relative group-hover:scale-110 transition-transform" /> 
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}