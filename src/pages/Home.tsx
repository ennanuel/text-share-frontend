import { useContext } from "react";

import { FiInfo } from "react-icons/fi";
import { MdAdd } from "react-icons/md";

import { createModalContext } from "../components/Layout";
import { AiOutlineHeart } from "react-icons/ai";

import TextSpaceCard from "../components/TextSpaceCard";


export default function Home() {
    const { openCreateModal } = useContext(createModalContext)
    return (
        <>
            <div className="p-[10%] pt-10 min-h-[100vh] flex gap-10 flex-col">
            
                <h2 className="text-4xl font-bold">Your spaces</h2>
                <div className="flex justify-between items-center gap-4">
                    <ul className="flex items-center gap-4">
                        <li>
                            <button className="px-2 h-[40px] flex relative items-center justify-center before:absolute before:bottom-0 before:left-0 before:w-full before:h-1 before:bg-black">
                                <span className="font-semibold">All</span>
                            </button>
                        </li>
                        <li>
                            <button className="px-2 h-[40px] flex relative items-center justify-center before:absolute before:bottom-0 before:left-0 before:w-full before:h-1 text-gray-400">
                                <span className="font-semibold">Secured</span>
                            </button>
                        </li>
                        <li>
                            <button className="px-2 h-[40px] flex relative items-center justify-center before:absolute before:bottom-0 before:left-0 before:w-full before:h-1 text-gray-400">
                                <span className="font-semibold">Unsecured</span>
                            </button>
                        </li>
                    </ul>
                    <button className="group h-[40px] px-4 flex gap-2 relative items-center justify-center before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-full before:bg-white before:shadow-md before:shadow-black/10 hover:before:scale-110 before:transition-transform">
                        <AiOutlineHeart size={18} className="relative group-hover:scale-110 transition-transform" />
                        <span className="relative font-semibold text-sm">Favorites</span>
                    </button>
                </div>
                <ul className="grid grid-cols-3 gap-4">
                    {
                        [1, 2, 3, 4].map((item, index) => (
                            <li key={index}><TextSpaceCard id={item} index={index} /></li>
                        ))
                    }
                </ul>
            </div>

            <div className="flex sticky bottom-8 justify-between px-6 mb-20">
                <button className="flex items-center justify-center h-[50px] w-[50px] rounded-[25px] bg-white shadow-md shadow-black/20">
                    <FiInfo size={18} />
                </button>
                <button onClick={openCreateModal} className='btn group relative flex items-center justify-center h-[50px] pl-6 pr-3 gap-2 text-sm font-semibold'>
                    <span className='relative z-[1]'>Add space</span>
                    <MdAdd size={24} className="relative z-[1] group-hover:scale-90 transition-transform duration-300" />
                </button>
            </div>
        </>
    )
};