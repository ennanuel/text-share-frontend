
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useFetch } from "../utils/fetch";
import { fetchOptions } from "../assets/data";

import TextSpaceCard from "../components/TextSpaceCard";

import Loading from "../components/Loading";
import Error from "../components/Error";

import { TextSpacesFetchResult } from "../types/textSpace.type";
import { useContext, useEffect, useState } from "react";
import { authContext, socket } from "../App";
import MoreButton from "../components/MoreButton";


const LIMIT = 9;

export default function MySpaces() {
    const { user } = useContext(authContext);
    const [limit, setLimit] = useState(LIMIT);
    const { loading, error, data, retry } = useFetch<TextSpacesFetchResult>(`${import.meta.env.VITE_SERVER_URL}/spaces/user/0?limit=${limit}`, fetchOptions);

    useEffect(() => {
        socket.on('created', ({ userId }: { userId: string }) => {
            if(user?.id === userId) retry();
        });
        socket.on('editted', ({ userId }: { userId: string }) => {
            if(user?.id !== userId) retry();
        });
        socket.on('deleted', ({ textSpaceId }: { textSpaceId: string }) => {
            if(data?.textSpaces?.map(({ _id }) => _id)?.includes(textSpaceId)) retry();
        });
    }, [socket]);

    if(!data && loading) return <Loading text="Fetching your spaces..." />
    else if(error) return <Error retry={retry} />;

    return (
        <div className="min-h-[screen]">
            <div className="px-4 md:px-6 pt-10 min-h-[100vh] flex gap-10 flex-col">
                <h2 className="text-gray-800 text-[3rem] md:text-[4rem] font-bold animate-[fade-in_1s_ease]">Your spaces</h2>
                <div className="flex justify-between items-center gap-2 md:gap-4 -mt-6">
                    <ul className="flex items-center gap-4">
                        <li>
                            <button className="px-2 h-[40px] flex relative items-center justify-center before:absolute before:bottom-0 before:left-[50%] before:translate-x-[-50%] before:w-[80%] before:min-w-[40px] before:h-1 before:bg-gray-800 animate-[fade-in_1s_ease_300ms_forwards] opacity-0">
                                <span className="font-semibold text-base text-gray-800">All</span>
                            </button>
                        </li>
                        <li>
                            <button className="px-2 h-[40px] flex relative items-center justify-center before:absolute before:bottom-0 before:left-0 before:w-full before:h-1 hover:before:bg-text-400 text-gray-400 animate-[fade-in_1s_ease_400ms_forwards] opacity-0">
                                <span className="font-semibold text-base">Secured</span>
                            </button>
                        </li>
                        <li>
                            <button className="px-2 h-[40px] flex relative items-center justify-center before:absolute before:bottom-0 before:left-0 before:w-full before:h-1 hover:before:bg-text-400 text-gray-400 animate-[fade-in_1s_ease_500ms_forwards] opacity-0">
                                <span className="font-semibold text-base">Unsecured</span>
                            </button>
                        </li>
                    </ul>
                    <button className="group h-[50px] min-w-[50px] md:px-6 flex gap-2 relative items-center justify-center before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-full before:bg-white before:border before:border-gray-200 hover:before:scale-110 before:transition-transform text-gray-800 focus:text-red-500 focus:before:border-red-500/30 transition-colors">
                        <AiOutlineHeart size={18} className="relative group-hover:scale-110 transition-transform group-focus:scale-110 group-focus:hidden" />
                        <AiFillHeart size={18} className="relative group-hover:scale-110 transition-transform group-focus:scale-110 hidden group-focus:block" />
                        <span className="relative font-semibold text-sm hidden md:block">Favorites</span>
                    </button>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        data?.textSpaces?.map((item, index) => (
                            <li key={index}><TextSpaceCard index={index} limit={LIMIT} data={item} /></li>
                        ))
                    }
                </ul>
                <MoreButton limit={limit} setLimit={setLimit} loading={loading} totalPages={data?.totalPages} />
            </div>
        </div>
    )
};