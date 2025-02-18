
import { useContext, useEffect, useState } from "react";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useFetch } from "../utils/fetch";

import TextSpaceCard from "../components/TextSpaceCard";

import Loading from "../components/Loading";
import Error from "../components/Error";
import MoreButton from "../components/MoreButton";

import { TextSpacesFetchResult } from "../types/textSpace.type";
import { authContext, socket } from "../App";

import { fetchOptions } from "../assets/data";

import { FETCH_FILTERS } from "../assets/constants";


const LIMIT = 9;

const getURL = ({ limit, filter, showFavoritesOnly }: { limit: number, filter: string, showFavoritesOnly: boolean }) => {
    const filters = showFavoritesOnly && !Boolean(filter) ? 
        "FAVORITES" : 
        Boolean(filter) && !showFavoritesOnly ? 
            filter : 
            Boolean(filter) && showFavoritesOnly ?
                `${filter}+FAVORITES` :
                "";

    return `${import.meta.env.VITE_SERVER_URL}/spaces/user/0?limit=${limit}&filter=${filters}`
}

export default function MySpaces() {
    const { user } = useContext(authContext);
    const [limit, setLimit] = useState(LIMIT);
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const [filter, setFilter] = useState("");

    const toggleFavorites = () => setShowFavoritesOnly(!showFavoritesOnly);

    const { loading, error, data, retry } = useFetch<TextSpacesFetchResult>(getURL({ showFavoritesOnly, limit, filter }), fetchOptions);

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

        return () => {
            socket.removeAllListeners();
        }
    }, [socket, data]);

    useEffect(() => {
        const pageTitleElement = document.getElementById("page-title");

        if(pageTitleElement) pageTitleElement.innerText = "Tekst | Your Text Spaces";
    }, []);

    if(!data && loading) return (
        <div className="min-h-[calc(100vh_-_80px)] pt-20">
            <Loading text="Fetching your spaces..." />
        </div>
    );
    else if(error) return (
        <div className="min-h-[calc(100vh_-_80px)] pt-20">
            <Error retry={retry} />
        </div>
    );

    return (
        <div className="min-h-[screen]">
            <div className="px-4 md:px-6 pt-10 min-h-screen flex gap-6 sm:gap-10 flex-col">
                <div className="flex flex-col gap-6 md:gap-10">
                    <h2 className="text-gray-800 text-4xl md:text-[3rem] lg:text-[4rem] font-bold animate-[fade-in_1s_ease]">Your spaces</h2>
                    <div className="flex justify-between items-center gap-2 md:gap-4">
                        <ul className="flex items-center gap-4">
                            {
                                FETCH_FILTERS.map(({ title, value }, index) => (
                                    <li key={index}>
                                        <button onClick={() => setFilter(value)} className={`${filter === value ? 'text-gray-800 before:bg-gray-800' : 'text-gray-400 hover:before:bg-gray-400 hover:text-gray-600'} px-2 h-[40px] flex relative items-center justify-center before:absolute before:bottom-0 before:left-[50%] before:translate-x-[-50%] before:w-[80%] before:min-w-[40px] before:h-1 before:rounded-t-full animate-[fade-in_1s_ease_300ms_forwards] opacity-0`}>
                                            <span className="font-semibold text-sm md:text-base">{title}</span>
                                        </button>
                                    </li>
                                ))
                            }
                        </ul>
                        <button onClick={toggleFavorites} className={`group h-12 sm:h-10 min-w-12 sm:min-w-10 md:px-4 flex gap-2 relative items-center justify-center before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-full before:bg-white before:border hover:before:scale-110 before:transition-transform shadow shadow-transparent ${showFavoritesOnly ? 'before:border-red-200/50 text-red-500 shadow-red-600/20' : 'text-gray-800 before:border-gray-200'} transition-colors`}>
                            {
                                showFavoritesOnly ? 
                                    <AiFillHeart size={18} className="relative group-hover:scale-110 transition-transform" /> :
                                    <AiOutlineHeart size={18} className="relative group-hover:scale-110 transition-transform" />
                            }
                            <span className="relative font-semibold text-sm hidden md:block">Favorites</span>
                        </button>
                    </div>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        data?.textSpaces?.map((item, index) => (
                            <li key={index}><TextSpaceCard index={index} limit={LIMIT} data={item} refetch={retry} /></li>
                        ))
                    }
                </ul>
                <MoreButton limit={limit} setLimit={setLimit} loading={loading} totalPages={data?.totalPages} />
            </div>
        </div>
    )
};