import { useState } from "react";

import { MdMoreHoriz, MdClose } from "react-icons/md";
import { TEXT_SPACE_PAGE_OPTIONS } from "../assets/constants";

export default function OptionsModal({ enterEditMode, share, copyLink, remove }: { 
    enterEditMode: () => void;
    share: () => void; 
    copyLink: () => void;
    remove: () => void; 
}) {
    const [showOptions, setShowOptions] = useState(false);

    const open = () => setShowOptions(true);
    const close = () => setShowOptions(false);

    const handleClick = () => setShowOptions(!showOptions);
    
    return (
        <div className={`relative ${showOptions ? 'z-[2] md:z-10': ''}`}>
            <button onClick={showOptions ? close : open} className={`${showOptions ? 'hover:bg-red-100 hover:text-red-500 hover:border-red-200 z-10' : ''} relative w-[50px] aspect-square bg-white rounded-full flex items-center justify-center border border-gray-200`}>
                <span className={`${showOptions ? 'rotate-[90deg]' : ''} transition-transform duration-300`}>
                    {showOptions ? <MdClose size={20} /> : <MdMoreHoriz size={20} />}
                </span>
            </button>

            <div onClick={handleClick} className={`${showOptions ? '' : 'opacity-0 pointer-events-none'} transition-opacity duration-300 absolute top-0 right-[calc(100%_+_20px)] w-max min-w-[300px]`}>
                <div className="fixed top-0 left-0 w-full h-full bg-black/10 backdrop-blur-sm"></div>
                <ul className={`${showOptions ? 'delay-100' : 'scale-50 opacity-0'} duration-300 transition-[transform,opacity] origin-top-right relative flex flex-col w-full rounded-[30px] bg-white p-2`}>
                    {
                        TEXT_SPACE_PAGE_OPTIONS.map(({ type, title, color, background, hoverBackground, Icon }, index) => (
                            <li key={index}>
                                <button 
                                    onClick={
                                        type === "edit" ? 
                                            enterEditMode : 
                                                type === "copy" ? 
                                                    copyLink : 
                                                    type === "share" ?
                                                        share : 
                                                        type === "remove" ? 
                                                        remove : 
                                            undefined
                                    } 
                                    className={`w-full flex items-center gap-3 p-2 rounded-full pr-3 ${hoverBackground} ${showOptions ? 'delay-200 duration-300' : 'opacity-0'} transition-opacity`}
                                >
                                    <span className={`w-[40px] aspect-square rounded-full ${background} ${color} flex items-center justify-center`}>
                                        <Icon size={18} />
                                    </span>
                                    <span className="font-semibold">{title}</span>
                                </button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}