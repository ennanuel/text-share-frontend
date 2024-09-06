import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { BsDot } from "react-icons/bs";
import { MdMoreHoriz, MdPerson, MdClose, MdOutlineDelete, MdArrowForward } from "react-icons/md";
import { FiCopy } from "react-icons/fi";

const OPTIONS = [
    {
        title: "Go to space",
        action: "navigate",
        hoverBackground: "hover:bg-blue-100",
        hoverColor: "hover:text-blue-600",
        Icon: MdArrowForward
    },
    {
        title: "Copy link",
        action: "copy",
        hoverBackground: "hover:bg-blue-100",
        hoverColor: "hover:text-blue-600",
        Icon: FiCopy
    },
    {
        title: "Delete space",
        action: "delete",
        hoverBackground: "hover:bg-red-100",
        hoverColor: "hover:text-red-600",
        Icon: MdOutlineDelete
    }
]

export default function TextSpaceCard({ id, index = 0 }: { id: number | string; index?: number; }) {
    const navigate = useNavigate();
    const [showOptions, setShowOptions] = useState(false);
    const [isCloserToLeft, setIsCloserToLeft] = useState(false);

    const toggleModal: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        setShowOptions(!showOptions);
        if (showOptions) return;
        setIsCloserToLeft(event.clientX < window.innerWidth / 2);
    }

    const handleClick: React.MouseEventHandler<HTMLElement> = (event) => {
        if((event.target as HTMLElement).classList.contains('toggle-btn') || showOptions) event.preventDefault();
    }

    return (
        <div className={`relative ${showOptions ? 'before:opacity-100 z-10' : 'before:opacity-0 before:pointer-events-none'} before:transition-opacity before:duration-300 before:fixed before:top-0 before:left-0 before:w-full before:h-full before:backdrop-blur-sm before:bg-black/10`}>
            <div className="hiddden"></div>
            <div className={`${showOptions ? '' : 'scale-50 opacity-0 pointer-events-none'} ${isCloserToLeft ? 'origin-top-left translate-x-[260px]' : 'origin-top-right'} transition-[transform,opacity] duration-300 absolute w-[240px] top-0 right-0 bg-white rounded-[20px] p-3 z-[9999]`}>
                <ul className={`${showOptions ? 'delay-100 duration-300' : 'opacity-0'} transition-opacity flex flex-col`}>
                    {
                        OPTIONS.map(({ title, action, hoverBackground, hoverColor, Icon }, index) => (
                            <li key={index}>
                                <button className={`${hoverBackground} ${hoverColor} w-full rounded-full flex items-center justify-between p-3 pl-4 transition-[background-color]`}>
                                    <span className="text-sm font-semibold">{title}</span>
                                    <Icon size={18} />
                                </button>
                            </li>
                        ))
                    }
                </ul>
            </div>

            <Link to={`/spaces/space/${id}`} style={{ '--delay': `${(Number(index) * 100) + 200}ms` } as React.CSSProperties} onClick={handleClick} className={`${showOptions ? !isCloserToLeft && 'translate-x-[-260px]' : ''} animated-card opacity-0 transition-transform duration-300 relative p-4 flex flex-col gap-4 aspect-square bg-white rounded-[30px] shadow-sm shadow-black/10 justify-between`}>
                <div className="flex justify-between items-center gap-3">
                    <div className="flex flex-col">
                        <h3 className="font-bold text-lg">Space title</h3>
                        <p className="text-sm text-gray-400">Space description</p>
                    </div>
                    <button onClick={toggleModal} className={`${showOptions ? 'hover:bg-red-100 hover:text-red-500 hover:border-red-100' : 'hover:bg-gray-100'} toggle-btn flex items-center justify-center h-[40px] w-[40px] rounded-[15px] border border-gray-200`}>
                        <span className={`${showOptions ? 'rotate-90' : ''} flex items-center justify-center transition-transform duration-300 pointer-events-none`}>
                            {
                                showOptions ? <MdClose size={20} /> : <MdMoreHoriz size={20} />
                            }
                        </span>
                    </button>
                </div>
                <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-2 rounded-full">
                        <span className="flex items-center justify-center h-[26px] aspect-square rounded-full bg-black text-white">
                            <MdPerson size={18} />
                        </span>
                        <span className='text-sm'>Anonymous</span>
                    </span>
                    <div className="flex items-center gap-1 text-gray-400">
                        <span className="font-semibold text-sm">10 views</span>
                        <BsDot size={16} />
                        <span className="font-semibold text-sm">1 min.</span>
                    </div>
                </div>
            </Link>
        </div>
    )
}