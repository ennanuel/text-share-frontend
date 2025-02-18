
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { LuMoveLeft } from "react-icons/lu";

import UnlockSecuredSpace from "../components/UnlockSecuredSpace";
import EditTextSpace from "../components/EditTextSpace";
import NormalTextSpace from "../components/NormalTextSpace";
import Loading from "../components/Loading";
import Error from "../components/Error";

import { useFetch } from "../utils/fetch";
import { fetchOptions } from "../assets/data";

import { socket } from "../App";
import { TextSpace } from "../types/textSpace.type";
import NotFound from "./NotFound";


export default function TextSpacePage() { 
    const { id } = useParams();
    const [copiedLink, setCopiedLink] = useState(false);
    const [copiedContent, setCopiedContent] = useState(false);

    const [editMode, setEditMode] = useState(false);

    const [url, setUrl] = useState(`${import.meta.env.VITE_SERVER_URL}/spaces/space/${id}`);

    const { loading, error, data, retry } = useFetch<TextSpace>(url, fetchOptions);
    const authenticationFailed = useMemo(() => error?.statusCode === 401, [error]);

    const [password, setPassword] = useState("");

    const submitPassword: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        setUrl(`${import.meta.env.VITE_SERVER_URL}/spaces/space/${id}?p=${password}`);
        setPassword("");
    };

    useEffect(() => { 
        socket.on("editted", ({ textSpaceId }: { textSpaceId: string }) => {
            if(textSpaceId === id) retry();
        });
        
        return () => {
            socket.removeAllListeners();
        }
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
            <NotFound />
        </div>
    );

    return (
        <div className="flex flex-col gap-10 mt-10 px-4 min-h-screen">
            <UnlockSecuredSpace 
                setPassword={setPassword} 
                submitPassword={submitPassword}
                authenticationFailed={authenticationFailed} 
            />
            {
                editMode ?
                    <button onClick={() => setEditMode(false)} type="button" className="group hover:text-red-500 flex items-center gap-2">
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
                        copiedLink={copiedLink}
                        copiedContent={copiedContent}
                        refetch={retry}
                        setCopiedLink={setCopiedLink}
                        setCopiedContent={setCopiedContent}
                        setEditMode={setEditMode}
                    />
            }
        </div>
    )
};