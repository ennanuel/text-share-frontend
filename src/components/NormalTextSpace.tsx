

import { BiCopy, BiUser } from "react-icons/bi";
import { BsDot } from "react-icons/bs";
import { FaAngleDown } from "react-icons/fa6";
import { FiCheck, FiClock, FiCopy } from "react-icons/fi";
import { VscEye } from "react-icons/vsc";

import OptionsModal from "./OptionsModal";

import { copy, getTextSpaceColors, getTextSpaceTime } from "../utils/tekst";

import { TextSpace } from "../types/textSpace.type";
import { useMemo } from "react";

type Props = { 
    textSpace: TextSpace | null; 
    copiedLink: boolean;
    copiedContent: boolean;
    refetch: () => void;
    setCopiedLink: React.Dispatch<React.SetStateAction<boolean>>;
    setCopiedContent: React.Dispatch<React.SetStateAction<boolean>>;
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}


export default function NormalTextSpace({ textSpace, copiedLink, copiedContent, refetch, setCopiedLink, setCopiedContent, setEditMode }: Props) {
    const colors = useMemo(() => getTextSpaceColors(textSpace?.color), [textSpace]);

    if(!textSpace) return;

    return (
        <div className="flex flex-col md:flex-row gap-8 min-h-[calc(100vh_-_60px)] relative">
            <div className="flex flex-1 flex-col gap-10">
                <div className="flex items-center justify-between gap-4">
                    <h1 className="text-[2rem] font-bold flex-1 text-gray-800">{textSpace?.title || "No title"}</h1>
                    <OptionsModal refetch={refetch} textSpace={textSpace} setCopy={setCopiedLink} copied={copiedLink} setEditMode={setEditMode} />
                </div>
                <ul className="flex flex-wrap items-center gap-2">
                    <li className={`h-10 rounded-full border border-gray-200 bg-white text-black/80 text-sm font-semibold flex gap-2 items-center pl-1 pr-4`}>
                        {
                            textSpace?.owner?.profileImage ?
                                <img className="w-6 aspect-square rounded-full object-cover" /> :
                                <span className={`flex items-center justify-center w-8 aspect-square rounded-full ${colors.iconColor}`}>
                                    <BiUser size={16} />
                                </span>
                        }
                        <span className="text-sm font-semibold text-gray-800">{textSpace?.owner?.username}</span>
                    </li>
                    <li className={`h-10 rounded-full border border-gray-200 bg-white text-black/80 text-sm font-semibold flex gap-2 items-center pl-1 pr-4`}>
                        <span className={`flex items-center justify-center h-8 w-8 rounded-full ${colors.iconColor}`}>
                            <FiClock size={16} />
                        </span>
                        <span className="text-gray-800">{getTextSpaceTime(String(textSpace?.createdAt))}</span>
                    </li>
                    <li className={`h-10 rounded-full border border-gray-200 bg-white text-black/80 text-sm font-semibold flex gap-2 items-center pl-1 pr-4`}>
                        <span className={`flex items-center justify-center h-8 w-8 rounded-full ${colors.iconColor}`}>
                            <VscEye size={16} />
                        </span>
                        <span className="text-gray-800">{`${textSpace?.views ? textSpace?.views : 'No'} ${textSpace?.views === 1 ? 'view' : 'views'}`}</span>
                    </li>
                </ul>
                <p className="text-gray-400">Visit the website on two devices or browser windows <br />Enter your text in the field to share.</p>
                <div className={`flex items-center gap-4 bg-white rounded-full p-2 border border-gray-200 h-16`}>
                    <span className="flex-1 text-sm bg-transparent ml-4 text-black/50 relative block">
                        <span className="absolute top-1/2 -translate-y-1/2 left-0 w-full truncate">{import.meta.env.VITE_LIVE_URL}/space/{textSpace?._id}</span>
                    </span>
                    <button 
                        onClick={() => copy({ dispatch: setCopiedLink, content: `${import.meta.env.VITE_LIVE_URL}/space/${textSpace?._id}`})} 
                        className="relative w-12 aspect-square bg-black text-white hover:bg-black/90 rounded-full flex items-center justify-center gap-2"
                    >
                        {copiedLink ? <FiCheck size={20} /> : <FiCopy size={20} />}
                    </button>
                </div>
            </div>
            <div className="flex-1 flex flex-col gap-4">
                <div className="relative">
                    <textarea name="" value={textSpace?.content} readOnly id="text-space-area" className={`w-full min-h-[60vh] rounded-[30px] ng-white shadow-lg shadow-black/10 p-6`} placeholder="Text that is in this space...">
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
                    <button onClick={() => copy({ dispatch: setCopiedContent, content: textSpace.content })} className="btn group relative flex items-center justify-center gap-3 w-[90%] m-auto">
                        <span className="font-semibold relative text-sm">{copiedContent ? "Content copied" : "Copy to clipboard"}</span>
                        {
                            copiedContent ? 
                                <FiCheck size={18} className="relative group-hover:scale-110 transition-transform" /> : 
                                <BiCopy size={18} className="relative group-hover:scale-110 transition-transform" /> 
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}