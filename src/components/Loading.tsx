import { FaVimeoV } from "react-icons/fa";


export default function Loading({ text }: { text?: string; }) { 
    return (
        <div className="flex flex-col gap-6 md:gap-10 items-center justify-center relative min-h-[30vh] rounded-3xl w-max m-auto">
            <span className="relative">
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400 to-pink-400 rounded-full blur-xl"></span>
                <span className="relative h-[60px] bg-white aspect-square rounded-full flex items-center justify-center"> 
                    <FaVimeoV size={30} />
                </span>
            </span>
            <div className="flex flex-col gap-4">
                <div className="text-center font-semibold">{text ? text : "Loading spaces..."}</div>
                <div className="relative loading-bar">
                    <div className="relative block w-[240px] md:w-[300px] h-2 rounded-full bg-white p-[2px] overflow-hidden">
                        <div className="block w-full h-full overflow-hidden rounded-full">
                            <span className="block h-full w-[50%] rounded-full bg-gradient-to-r from-blue-400/60 via-purple-300 to-pink-400/60 origin-left animate-[move-around_.5s_ease_infinite_alternate]"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};