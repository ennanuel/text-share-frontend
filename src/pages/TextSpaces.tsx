
import { AiOutlineArrowRight } from "react-icons/ai";

import TextSpaceCard from "../components/TextSpaceCard";
import { useState } from "react";
import { fetchOptions } from "../assets/data";

import Error from "../components/Error";
import Loading from "../components/Loading";

import { useFetch } from "../utils/fetch";

import { TextSpace } from "../types/textSpace.type";


type FetchResult = {
    page: number;
    limit: number;
    sortedBy: string;
    textSpaces: TextSpace[];
}


export default function TextSpaces() {
    const [page, setPage] = useState(0);
    const { data, loading, failed } = useFetch<FetchResult>(`${import.meta.env.VITE_SERVER_URL}/spaces/explore/${page}`, fetchOptions);
    
    if (loading) return (
        <div className="flex h-[calc(100vh_-_80px)] items-center justify-center">
            <Loading />
        </div>
    );

    else if (failed) return (
        <div className="flex h-[calc(100vh_-_80px)] items-center justify-center">
            <Error />
        </div>
    );

    else return (
        <div id="text-spaces" className="min-h-[calc(100vh_-_80px)] relative mt-10 flex flex-col gap-4">
            <h1 className="font-bold text-[3rem] md:text-[4rem] px-6 md:px-[10vw] animate-[fade-in_1s_ease]">Explore text spaces...</h1>
            <ul className="flex items-center gap-6 mt-6 md:mt-0 md:gap-10 px-6 md:px-[10vw]">
                <li className="flex flex-col gap-2 justify-between relative opacity-0 animate-[fade-in_1s_ease_300ms_forwards]">
                    <button className="h-[40px] relative flex items-center justify-center before:absolute before:bottom-0 before:left-[50%] before:translate-x-[-50%] before:w-[80%] before:h-[4px] before:bg-black">
                        <span className="font-semibold text-base">Popular</span>
                    </button>
                </li>
                <li className="flex flex-col gap-2 justify-between relative opacity-0 animate-[fade-in_1s_ease_400ms_forwards]">
                    <button className="h-[40px] relative flex items-center justify-center before:absolute before:bottom-0 before:left-[50%] before:translate-x-[-50%] before:w-[80%] before:h-[4px] hover:before:bg-gray-400">
                        <span className="font-semibold text-base text-gray-400">Recent</span>
                    </button>
                </li>
                <li className="flex flex-col gap-2 justify-between relative opacity-0 animate-[fade-in_1s_ease_500ms_forwards]">
                    <button className="h-[40px] relative flex items-center justify-center before:absolute before:bottom-0 before:left-[50%] before:translate-x-[-50%] before:w-[80%] before:h-[4px] hover:before:bg-gray-400">
                        <span className="font-semibold text-base text-gray-400">Random</span>
                    </button>
                </li>
            </ul>
            <div className="flex flex-col gap-4 pb-10 px-6 md:px-[10vw]">
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-3 mt-6">
                    {
                        data?.textSpaces?.map((textSpace, index) => (
                            <li key={index}>
                                <TextSpaceCard data={textSpace} index={index}  />
                            </li>
                        ))
                    }
                </ul>
                {
                    data?.textSpaces && data?.textSpaces.length >= 6 ?
                        <button className="btn relative group mt-10 flex items-center justify-center m-auto gap-2 px-6">
                            <span className="relative font-semibold text-sm">More spaces</span>
                            <AiOutlineArrowRight size={16} className="relative transition-transform group-hover:translate-x-2 duration-300" />
                        </button> :
                        null
                }
            </div>
        </div>
    )
};