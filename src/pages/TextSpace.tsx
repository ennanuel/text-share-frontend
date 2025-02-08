
import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

import { LuMoveLeft } from "react-icons/lu";

import Loading from "../components/Loading";
import Error from "../components/Error";

import { useFetch } from "../utils/fetch";
import { fetchOptions } from "../assets/data";

import { TextSpace } from "../types/textSpace.type";
import UnlockSecuredSpace from "../components/UnlockSecuredSpace";
import EditTextSpace from "../components/EditTextSpace";
import NormalTextSpace from "../components/NormalTextSpace";
import { socket } from "../App";


export default function TextSpacePage() { 
    const { id } = useParams();
    const [copied, setCopied] = useState({ link: false, content: false });

    const [url, setUrl] = useState(`${import.meta.env.VITE_SERVER_URL}/spaces/space/${id}`);

    const { loading, error, data, retry } = useFetch<TextSpace>(url, fetchOptions);
    const authenticationFailed = useMemo(() => error?.statusCode === 401, [error]);

    const [password, setPassword] = useState("");

    const [searchParams, setSearchParams] = useSearchParams();
    const editMode = useMemo(() => searchParams.get('edit') === 'true', [searchParams]);

    const enterEditMode = () => setSearchParams({ edit: 'true' });
    const exitEditMode = () => setSearchParams({ });

    const submitPassword: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        setUrl(`${import.meta.env.VITE_SERVER_URL}/spaces/space/${id}?p=${password}`);
        setPassword("");
    };

    useEffect(() => { 
        socket.on("editted", ({ textSpaceId }: { textSpaceId: string }) => {
            if(textSpaceId === id) retry();
        })
    }, [socket]);

    if(loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <Loading text="Loading text space..." />
        </div>
    );
    else if(error && !authenticationFailed) return (
        <div className="min-h-screen flex item-center justify-center">
            <Error />
        </div>
    );
    else if(!data && !authenticationFailed) return (
        <div className="min-h-screen flex items-center justify-center">
            <span>Nothing was found!</span>
        </div>
    );

    return (
        <div className="flex flex-col gap-10 mt-10 px-4">
            <UnlockSecuredSpace 
                setPassword={setPassword} 
                submitPassword={submitPassword}
                authenticationFailed={authenticationFailed} 
            />
            {
                editMode ?
                    <button onClick={exitEditMode} type="button" className="group hover:text-red-500 flex items-center gap-2">
                        <LuMoveLeft size={18} className="relative text-inherit transition-[transform,_color] duration-300 group-hover:-translate-x-2" />
                        <span className="font-semibold relative text-inherit transition-colors before:absolute before:bottom-0 before:w-full before:h-[2px] before:bg-red-500 before:scale-x-0 before:transition-transform before:duration-200 before:origin-left group-hover:before:scale-x-100">Back to normal</span>
                    </button> :
                    <Link to="/spaces" className="group flex items-center gap-2">
                        <LuMoveLeft size={18} className="relative transition-transform duration-300 group-hover:-translate-x-2" />
                        <span className="font-semibold relative before:absolute before:bottom-0 before:w-full before:h-[2px] before:bg-black before:scale-x-0 before:transition-transform before:duration-200 before:origin-left group-hover:before:scale-x-100">Text spaces</span>
                    </Link>

            }
            {
                editMode ?
                    <EditTextSpace textSpace={data} /> :
                    <NormalTextSpace 
                        textSpace={data} 
                        copied={copied} 
                        enterEditMode={enterEditMode} 
                        copyLink={() => null} 
                        share={() => null} 
                        remove={() => null} 
                    />
            }
        </div>
    )
};