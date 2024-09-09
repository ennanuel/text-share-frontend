import { useContext } from "react";

import { AiOutlineArrowRight } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { FiInfo } from "react-icons/fi";
import { createModalContext } from "../components/Layout";

import TextSpaceCard from "../components/TextSpaceCard";
import Loading from "../components/Loading";
import Error from "../components/Error";

export default function TextSpaces() {
    const { openCreateModal } = useContext(createModalContext);

    return (
        <div id="text-spaces" className="min-h-[calc(100vh_-_60px)] relative mt-10 flex flex-col gap-4">
            <h1 className="font-bold text-[3rem] md:text-[4rem] px-6 md:px-[10vw] animate-[fade-in_1s_ease]">Explore text spaces...</h1>
            <ul className="flex items-center gap-6 mt-6 md:mt-0 md:gap-10 px-6 md:px-[10vw]">
                <li className="h-[40px] flex flex-col gap-2 justify-between relative opacity-0 animate-[fade-in_1s_ease_300ms_forwards]">
                    <span className="font-semibold text-base md:text-lg">Popular</span>
                    <span className="h-[4px] w-[90%] bg-black absolute bottom-0 left-[50%] translate-x-[-50%]"></span>
                </li>
                <li className="h-[40px] flex flex-col gap-2 justify-between relative opacity-0 animate-[fade-in_1s_ease_400ms_forwards]">
                    <span className="font-semibold text-base md:text-lg text-gray-500">Recent</span>
                </li>
                <li className="h-[40px] flex flex-col gap-2 justify-between relative opacity-0 animate-[fade-in_1s_ease_500ms_forwards]">
                    <span className="font-semibold text-base md:text-lg text-gray-500">Random</span>
                </li>
            </ul>
            <div className="flex flex-col gap-4 pb-10 px-6 md:px-[10vw]">
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-3 mt-6">
                    {
                        [1, 2, 3, 4, 5, 6].map((item, index) => (
                            <li key={index}>
                                <TextSpaceCard id={item} index={index} />
                            </li>
                        ))
                    }
                </ul>
                <button className="btn relative group mt-10 flex items-center justify-center m-auto gap-2 px-6">
                    <span className="relative font-semibold text-sm">More spaces</span>
                    <AiOutlineArrowRight size={16} className="relative transition-transform group-hover:translate-x-2 duration-300" />
                </button>
            </div>
            <div className="flex sticky bottom-8 justify-between px-6">
                <button className="flex items-center justify-center h-[50px] w-[50px] rounded-[25px] bg-white shadow-md shadow-black/20">
                    <FiInfo size={18} />
                </button>
                <button onClick={openCreateModal} className='btn group relative flex items-center justify-center h-[50px] pl-6 pr-3 gap-2 text-sm font-semibold'>
                    <span className='relative'>New space</span>
                    <MdAdd size={24} className="relative group-hover:scale-90 transition-transform duration-300" />
                </button>
            </div>
        </div>
    )
};