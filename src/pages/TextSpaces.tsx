
import { useContext, useEffect, useState } from "react";

import TextSpaceCard from "../components/TextSpaceCard";
import Error from "../components/Error";
import Loading from "../components/Loading";
import MoreButton from "../components/MoreButton";

import { authContext, socket } from "../App";
import { useFetch } from "../utils/fetch";

import { fetchOptions } from "../assets/data";

import { TextSpacesFetchResult } from "../types/textSpace.type";
import ReloadButton from "../components/ReloadButton";
import { FETCH_FILTERS } from "../assets/constants";


const LIMIT = 9;

export default function TextSpaces() {
    const { user } = useContext(authContext);
    const [reloadText, setReloadText] = useState("");

    const [limit, setLimit] = useState(LIMIT);
    const [filter, setFilter] = useState("");
    const { data, loading, error, retry } = useFetch<TextSpacesFetchResult>(`${import.meta.env.VITE_SERVER_URL}/spaces/explore/0?limit=${limit}&filter=${filter}`, fetchOptions);

    const reload = () => {
        retry();
        setReloadText("");
    }

    useEffect(() => {
        socket.on('created', ({ userId }: { userId: string }) => {
            const showToast = (user?.id !== userId || !userId);

            if(showToast) setReloadText("New text space");
        });
        socket.on('editted', ({ textSpaceId }: { userId: string; textSpaceId: string; }) => {
            const showToast = data?.textSpaces?.map(({ _id }) => _id).includes(textSpaceId);

            if(showToast) setReloadText("Text space changed")
        });
        socket.on('deleted', ({ textSpaceId }: { textSpaceId: string }) => {
            const shouldRefresh = data?.textSpaces?.map(({ _id }) => _id)?.includes(textSpaceId);

            if(shouldRefresh) retry();
        });

        return () => {
            socket.removeAllListeners();
        }
    }, [socket, data]);

    useEffect(() => {
        const pageTitleElement = document.getElementById("page-title");

        if(pageTitleElement) pageTitleElement.innerText = "Tekst | Explore Text Spaces";
    }, []);
    
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
        <div id="text-spaces" className="min-h-[calc(100vh_-_80px)] relative pt-10 flex flex-col gap-10 px-4">
            <div className="flex flex-col gap-6 md:gap-10">
                <h1 className="font-bold text-gray-800 text-4xl md:text-[3rem] lg:text-[4rem] animate-[fade-in_1s_ease]">Explore text spaces...</h1>
                <ul className="flex items-center mt-6 md:mt-0 gap-6 px-4">
                    {
                        FETCH_FILTERS.map(({ title, value }, index) => (
                            value !== "OWNED" ?
                                <li key={index}>
                                    <button onClick={() => setFilter(value)} className={`${filter === value ? 'text-gray-800 before:bg-gray-800' : 'text-gray-400 hover:before:bg-gray-400 hover:text-gray-600'} px-2 h-[40px] flex relative items-center justify-center before:absolute before:bottom-0 before:left-[50%] before:translate-x-[-50%] before:w-[80%] before:min-w-[40px] before:h-1 before:rounded-t-full animate-[fade-in_1s_ease_300ms_forwards] opacity-0`}>
                                        <span className="font-semibold text-sm md:text-base">{title}</span>
                                    </button>
                                </li> :
                                null
                        ))
                    }
                </ul>
            </div>
            <ReloadButton text={reloadText} reload={reload} />
            <div className="flex flex-col gap-4 pb-10">
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-3">
                    {
                        data?.textSpaces?.map((textSpace, index) => (
                            <li key={index}>
                                <TextSpaceCard data={textSpace} index={index} limit={LIMIT} refetch={retry}  />
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