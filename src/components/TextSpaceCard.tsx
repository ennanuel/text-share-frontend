import React, { useState } from "react";
import { Link } from "react-router-dom";

import { BsDot } from "react-icons/bs";
import { MdMoreHoriz, MdPerson, MdClose, MdOutlineDelete, MdArrowForward, MdOutlineFavorite } from "react-icons/md";
import { FiCopy } from "react-icons/fi";

import { TextSpace } from "../types/textSpace.type";


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
        title: "Add to favorite",
        action: "favorite",
        hoverBackground: "hover:bg-purple-100",
        hoverColor: "hover:text-purple-600",
        Icon: MdOutlineFavorite
    },
    {
        title: "Delete space",
        action: "delete",
        hoverBackground: "hover:bg-red-100",
        hoverColor: "hover:text-red-600",
        Icon: MdOutlineDelete
    }
];

const ONE_YEAR_IN_MILLISECONDS = 31536000000;
const ONE_MONTH_IN_MILLISECONDS = 2592000000;
const ONE_WEEK_IN_MILLISECONDS = 604800000;
const ONE_DAY_IN_MILLISECONDS = 86400000;
const ONE_HOUR_IN_MILLISECONDS = 3600000;
const ONE_MINUTE_IN_MILLISECONDS = 60000;

const getTime = (timestamp: string) => {
    const timePassedInMilliseconds = Date.now() - (new Date(timestamp)).getTime();
    
    if (timePassedInMilliseconds < ONE_MINUTE_IN_MILLISECONDS) return "now";
    else if (timePassedInMilliseconds >= ONE_MINUTE_IN_MILLISECONDS && timePassedInMilliseconds < ONE_HOUR_IN_MILLISECONDS) return `${Math.floor(timePassedInMilliseconds/ONE_MINUTE_IN_MILLISECONDS)} min.`;
    else if (timePassedInMilliseconds >= ONE_HOUR_IN_MILLISECONDS && timePassedInMilliseconds < ONE_DAY_IN_MILLISECONDS) return `${Math.floor(timePassedInMilliseconds / ONE_HOUR_IN_MILLISECONDS)} hr.`;
    else if (timePassedInMilliseconds >= ONE_DAY_IN_MILLISECONDS && timePassedInMilliseconds < ONE_WEEK_IN_MILLISECONDS) return `${Math.floor(timePassedInMilliseconds / ONE_DAY_IN_MILLISECONDS)} d.`;
    else if (timePassedInMilliseconds >= ONE_WEEK_IN_MILLISECONDS && timePassedInMilliseconds < ONE_MONTH_IN_MILLISECONDS) return `${Math.floor(timePassedInMilliseconds / ONE_WEEK_IN_MILLISECONDS)} wk.`;
    else if (timePassedInMilliseconds >= ONE_MONTH_IN_MILLISECONDS && timePassedInMilliseconds < ONE_YEAR_IN_MILLISECONDS) return `${Math.floor(timePassedInMilliseconds / ONE_MONTH_IN_MILLISECONDS)} wks.`;
    else return `${Math.floor(timePassedInMilliseconds / ONE_YEAR_IN_MILLISECONDS)} yr.`;
}

export default function TextSpaceCard({ index = 0, data }: { index?: number; data?: TextSpace; }) {
    const [showOptions, setShowOptions] = useState(false);
    const [isCloserToLeft, setIsCloserToLeft] = useState(false);

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
        <div onClick={toggleModal} className={`relative ${showOptions ? 'before:opacity-100 z-10' : 'before:opacity-0 before:pointer-events-none'} before:transition-opacity before:duration-300 before:fixed before:top-0 before:left-0 before:w-full before:h-full before:backdrop-blur-sm before:bg-black/10 max-w-[400px]`}>
            <div
                className={`${showOptions ? '' : 'scale-50 opacity-0 pointer-events-none'} ${isCloserToLeft ? 'origin-top-left md:translate-x-[260px]' : 'md:origin-top-right origin-top'} transition-[transform,opacity] duration-300 absolute w-full md:w-[240px] top-0 right-0 bg-white rounded-[20px] p-[12px] md:p-3 z-[9999]`}
            >
                <ul className={`${showOptions ? 'delay-100 duration-300' : 'opacity-0'} transition-opacity flex flex-col`}>
                    {
                        OPTIONS.map(({ title, hoverBackground, hoverColor, Icon }, index) => (
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

            <Link to={`/spaces/space/${data?._id}`} style={{ '--delay': `${(Number(index) * 100) + 200}ms` } as React.CSSProperties} onClick={handleClick} className={`${showOptions ? `${!isCloserToLeft && 'md:translate-x-[-260px]'} translate-y-[220px] md:translate-y-0` : ''} animated-card opacity-0 transition-transform duration-300 relative p-4 flex flex-col gap-4 aspect-square bg-white rounded-[30px] shadow-sm shadow-black/10 justify-between`}>
                <div className="flex justify-between items-center gap-3">
                    <div className="flex flex-col">
                        <h3 className="font-bold text-lg">{data?.title || "Untitled space"}</h3>
                        <p className="text-sm text-gray-400">{data?.desc || "No description"}</p>
                    </div>
                    <button className={`${showOptions ? 'hover:bg-red-100 hover:text-red-500 hover:border-red-100' : 'hover:bg-gray-100'} toggle-btn flex items-center justify-center h-[40px] w-[40px] rounded-[15px] border border-gray-200`}>
                        <span className={`${showOptions ? 'rotate-90' : ''} flex items-center justify-center transition-transform duration-300 pointer-events-none`}>
                            {
                                showOptions ? <MdClose size={20} /> : <MdMoreHoriz size={20} />
                            }
                        </span>
                    </button>
                </div>
                <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="flex items-center gap-2 rounded-full">
                        <span className="flex items-center justify-center h-[26px] aspect-square rounded-full bg-black text-white">
                            <MdPerson size={20} />
                        </span>
                        <span className='text-sm'>{data?.owner?.username || "Anonymous"}</span>
                    </span>
                    <div className="flex items-center text-gray-400">
                        <span className="font-semibold text-sm">{data?.views || 10} {`${data?.views === 1 ? 'view': 'views'}`}</span>
                        <BsDot size={16} />
                        <span className="font-semibold text-sm">{data?.createdAt ? getTime(data?.createdAt) : "2 mins."}</span>
                    </div>
                </div>
            </Link>
        </div>
    )
}