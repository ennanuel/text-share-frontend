import React, { useState } from "react";
import { Link } from "react-router-dom";

import { BsDot } from "react-icons/bs";
import { MdMoreHoriz, MdPerson, MdClose } from "react-icons/md";

import { getTextSpaceTime, getTextSpaceCardBackground } from "../../utils/tekst";

import { TextSpace } from "../../types/textSpace.type";
import { TEXT_SPACE_OPTIONS } from "../../assets/constants";
import { FiLock } from "react-icons/fi";

export default function TextSpaceCard({ index = 0, data, limit }: { index?: number; data?: TextSpace; limit: number; }) {
    const [showOptions, setShowOptions] = useState(false);
    const [isCloserToLeft, setIsCloserToLeft] = useState(false);
    const { background } = getTextSpaceCardBackground(data?.color);

    const toggleModal: React.MouseEventHandler<HTMLDivElement> = (event) => {
        const element = (event.target) as HTMLElement;
        setIsCloserToLeft(event.clientX < window.innerWidth / 2);

        if (element.classList.contains('toggle-btn') || showOptions) setShowOptions(!showOptions);
        else setShowOptions(false);
    };

    const handleClick: React.MouseEventHandler<HTMLElement> = (event) => {
        const element = (event.target) as HTMLElement
        if (element.classList.contains('toggle-btn') || element.classList.contains('text-space-option') || showOptions) event.preventDefault();
    };

    return (
        <div onClick={toggleModal} className={`group relative ${showOptions ? 'before:opacity-100 z-10' : 'before:opacity-0 before:pointer-events-none'} before:transition-opacity before:duration-300 before:fixed before:top-0 before:left-0 before:w-full before:h-full before:backdrop-blur-sm before:bg-black/10 max-w-[400px]`}>
            <div
                className={`${showOptions ? '' : 'scale-50 opacity-0 pointer-events-none'} ${isCloserToLeft ? 'origin-top-left md:translate-x-[260px]' : 'md:origin-top-right origin-top'} transition-[transform,opacity] duration-300 absolute w-full md:w-[240px] top-0 right-0 bg-white rounded-[20px] p-[12px] md:p-3 z-[9999]`}
            >
                <ul className={`${showOptions ? 'delay-100 duration-300' : 'opacity-0'} transition-opacity flex flex-col`}>
                    {
                        TEXT_SPACE_OPTIONS.map(({ title, hoverBackground, hoverColor, Icon }, index) => (
                            <li key={index}>
                                <button className={`text-space-option ${hoverBackground} ${hoverColor} w-full rounded-full flex items-center justify-between h-[45px] pr-2 md:pr-3 md:h-auto md:p-3 pl-3 md:pl-4 transition-[background-color]`}>
                                    <span className="text-sm font-semibold">{title}</span>
                                    <Icon size={18} />
                                </button>
                            </li>
                        ))
                    }
                </ul>
            </div>

            <Link to={`/space/${data?._id}`} style={{ '--delay': `${((Number(index) * 100) + 200) % limit}ms` } as React.CSSProperties} onClick={handleClick} className={`${showOptions ? `${!isCloserToLeft && 'md:translate-x-[-260px]'} translate-y-[220px] md:translate-y-0` : ' md:group-hover:shadow-lg md:group-hover:scale-[1.02]'} ${background} animated-card overflow-clip opacity-0 transition-[transform,_box-shadow] duration-300 relative p-4 flex flex-col gap-4 aspect-square rounded-[32px] shadow-sm shadow-black/10 justify-between`}>
                <div className="flex justify-between gap-3">
                    <div className="flex flex-1 flex-col gap-1">
                        <h3 className="font-semibold text-xl text-gray-800">{data?.title || "Untitled space"}</h3>
                        <span className="block relative w-full h-5">
                            <p className="absolute top-0 left-0 w-full text-sm text-black/50 truncate">{data?.desc || "No description"}</p>
                        </span>
                    </div>
                    <button className={`${showOptions ? 'hover:bg-red-100 hover:text-red-500 hover:border-red-100' : 'hover:bg-black/5'} toggle-btn flex items-center justify-center h-10 w-10 min-w-10 rounded-2xl border border-black/10`}>
                        <span className={`${showOptions ? 'rotate-90' : ''} flex items-center justify-center transition-transform duration-300 pointer-events-none`}>
                            {
                                showOptions ? <MdClose size={20} /> : <MdMoreHoriz size={20} />
                            }
                        </span>
                    </button>
                </div>
                <h4 className="flex-1"></h4>
                <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="flex items-center gap-2 rounded-full">
                        <span className="flex items-center justify-center h-[26px] aspect-square rounded-full bg-gray-800 text-white">
                            <MdPerson size={20} />
                        </span>
                        <span className='text-sm text-black/80'>{data?.owner?.username || "Anonymous"}</span>
                    </span>
                    <div className="flex items-center text-black/50">
                        {
                            data?.secured ?
                                <span className="flex items-center justify-center">
                                    <FiLock size={18} />
                                    <BsDot size={16} />
                                </span> :
                                null
                        }
                        <span className="font-semibold text-sm">{data?.views ? data.views : 'No'} {data?.views === 1 ? 'view': 'views'}</span>
                        {
                            data?.createdAt ?
                                <>
                                <BsDot size={16} />
                                <span className="font-semibold text-sm">{getTextSpaceTime(data.createdAt)}</span>
                                </> :
                                null
                        }
                    </div>
                </div>
            </Link>
        </div>
    )
}