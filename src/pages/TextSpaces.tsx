
import TextSpaceCard from "../components/TextSpaceCard";
import { useContext, useEffect, useState } from "react";
import { fetchOptions } from "../assets/data";

import Error from "../components/Error";
import Loading from "../components/Loading";

import { useFetch } from "../utils/fetch";

import { TextSpacesFetchResult } from "../types/textSpace.type";
import { authContext, socket } from "../App";
import MoreButton from "../components/MoreButton";
import { Slide, toast } from "react-toastify";


const LIMIT = 9

export default function TextSpaces() {
    const { user } = useContext(authContext);

    const [limit, setLimit] = useState(LIMIT);
    const { data, loading, error, retry } = useFetch<TextSpacesFetchResult>(`${import.meta.env.VITE_SERVER_URL}/spaces/explore/0?limit=${limit}`, fetchOptions);

    useEffect(() => {
        socket.on('created', ({ userId }: { userId: string }) => {
            if(user?.id !== userId || !userId) toast.info('New Text Spaces. Refresh?', {
                position: "bottom-center",
                autoClose: 5000,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: 0.1,
                theme: "light",
                transition: Slide,
                onClick: retry
            });
        });
        socket.on('editted', ({ textSpaceId }: { userId: string; textSpaceId: string; }) => {
            if(data?.textSpaces?.map(({ _id }) => _id).includes(textSpaceId)) toast.info('A Text Space was edited, Refresh?', {
                position: "bottom-center",
                autoClose: 5000,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: 0.1,
                theme: "light",
                transition: Slide,
                onClick: retry
            });
        });
        socket.on('deleted', ({ textSpaceId }: { textSpaceId: string }) => {
            if(data?.textSpaces?.map(({ _id }) => _id)?.includes(textSpaceId)) retry();
        });
    }, [socket])
    
    if (!data && loading) return (
        <div className="flex h-[calc(100vh_-_80px)] items-center justify-center">
            <Loading />
        </div>
    );

    else if (error) return (
        <div className="flex h-[calc(100vh_-_80px)] items-center justify-center">
            <Error retry={retry} />
        </div>
    );

    else return (
        <div id="text-spaces" className="min-h-[calc(100vh_-_80px)] relative mt-10 flex flex-col gap-4 px-4">
            <h1 className="font-bold text-gray-800 text-4xl md:text-[3rem] lg:text-[4rem] animate-[fade-in_1s_ease]">Explore text spaces...</h1>
            <ul className="flex items-center gap-6 mt-6 md:mt-0 md:gap-10 px-4">
                <li className="flex flex-col gap-2 justify-between relative opacity-0 animate-[fade-in_1s_ease_300ms_forwards]">
                    <button className="h-[40px] relative flex items-center justify-center before:absolute before:bottom-0 before:left-[50%] before:translate-x-[-50%] before:w-[80%] before:h-[4px] before:bg-gray-800">
                        <span className="font-semibold text-sm md:text-base text-gray-800">Popular</span>
                    </button>
                </li>
                <li className="flex flex-col gap-2 justify-between relative opacity-0 animate-[fade-in_1s_ease_400ms_forwards]">
                    <button className="h-[40px] relative flex items-center justify-center before:absolute before:bottom-0 before:left-[50%] before:translate-x-[-50%] before:w-[80%] before:h-[4px] hover:before:bg-gray-400">
                        <span className="font-semibold text-sm md:text-base text-gray-400">Recent</span>
                    </button>
                </li>
                <li className="flex flex-col gap-2 justify-between relative opacity-0 animate-[fade-in_1s_ease_500ms_forwards]">
                    <button className="h-[40px] relative flex items-center justify-center before:absolute before:bottom-0 before:left-[50%] before:translate-x-[-50%] before:w-[80%] before:h-[4px] hover:before:bg-gray-400">
                        <span className="font-semibold text-sm md:text-base text-gray-400">Random</span>
                    </button>
                </li>
            </ul>
            <div className="flex flex-col gap-4 pb-10">
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-3 mt-6">
                    {
                        data?.textSpaces?.map((textSpace, index) => (
                            <li key={index}>
                                <TextSpaceCard data={textSpace} index={index} limit={LIMIT}  />
                            </li>
                        ))
                    }
                </ul>
                <MoreButton 
                    limit={limit} 
                    setLimit={setLimit} 
                    loading={loading} 
                    totalPages={data?.totalPages} 
                />
            </div>
        </div>
    )
};