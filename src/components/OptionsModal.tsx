import { useState } from "react";

import { FiEdit, FiShare, FiCopy } from "react-icons/fi";

import { MdMoreHoriz, MdClose, MdOutlineDelete } from "react-icons/md";

const OPTIONS = [
    {
        title: "Edit space",
        color: "text-blue-600",
        background: "bg-blue-400/20",
        hoverBackground: "hover:bg-blue-100",
        Icon: FiEdit
    },
    {
        title: "Copy space link",
        color: "text-yellow-500",
        background: "bg-yellow-500/20",
        hoverBackground: "hover:bg-yellow-100",
        Icon: FiCopy
    },
    {
        title: "Share",
        color: "text-purple-600",
        background: "bg-purple-600/20",
        hoverBackground: "hover:bg-purple-100",
        Icon: FiShare
    },
    {
        title: "Remove space",
        color: "text-red-600",
        background: "bg-red-600/20",
        hoverBackground: "hover:bg-red-100",
        Icon: MdOutlineDelete
    }
]

export default function OptionsModal() {
    const [showOptions, setShowOptions] = useState(false);

    const open = () => setShowOptions(true);
    const close = () => setShowOptions(false);

    const handleClick = () => setShowOptions(!showOptions);
    
    return (
        <div className="relative z-[2] md:z-[10]">
            <button onClick={showOptions ? close : open} className={`${showOptions ? 'hover:bg-red-100 hover:text-red-500 hover:border-red-300' : ''} peer relative z-10 w-[50px] aspect-square bg-white rounded-full flex items-center justify-center border border-gray-300`}>
                <span className={`${showOptions ? 'rotate-[90deg]' : ''} transition-transform duration-300`}>
                    {showOptions ? <MdClose size={20} /> : <MdMoreHoriz size={20} />}
                </span>
            </button>

            <div onClick={handleClick} className={`${showOptions ? '' : 'opacity-0 pointer-events-none'} transition-opacity duration-300 absolute top-0 right-[calc(100%_+_20px)] w-max min-w-[300px] border border-gray-300 peer-hover:border-red-300`}>
                <div className="fixed top-0 left-0 w-full h-full bg-black/10 backdrop-blur-sm"></div>
                <ul className={`${showOptions ? 'delay-100' : 'scale-50 opacity-0'} duration-300 transition-[transform,opacity] origin-top-right relative flex flex-col w-full rounded-[20px] bg-white p-2`}>
                    {
                        OPTIONS.map(({ title, color, background, hoverBackground, Icon }, index) => (
                            <li key={index} className={`flex items-center gap-3 p-2 rounded-full pr-3 ${hoverBackground} ${showOptions ? 'delay-200 duration-300' : 'opacity-0'} transition-opacity`}>
                                <span className={`w-[40px] aspect-square rounded-full ${background} ${color} flex items-center justify-center`}>
                                    <Icon size={18} />
                                </span>
                                <span className="font-semibold">{title}</span>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}