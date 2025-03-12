

import { BsFillHeartFill, BsPerson } from 'react-icons/bs';

export default function SecondAdditionFeature() {

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="relative w-full max-w-[360px]">
                <div className="rotate-6 absolute top-0 left-0 w-full flex flex-col justify-between aspect-square rounded-[32px] bg-purple-100 shadow-lg shadow-black/10 p-6"></div>
                <div className="rotate-0 absolute top-0 left-0 w-full flex flex-col justify-between aspect-square rounded-[32px] bg-white shadow-lg shadow-black/10 p-6"></div>
                <div className="-rotate-6 relative w-full flex flex-col justify-between aspect-square rounded-[32px] bg-yellow-100 shadow-lg shadow-black/10 p-6">
                    <div className="flex justify-between gap-4">
                        <div className="flex flex-col gap-1">
                            <span className="font-semibold text-2xl text-black/80 tracking-tight">Space title</span>
                            <span className="text-sm text-black/60">Space description</span>
                        </div>
                        <span className="flex items-center justify-center bg-gradient-to-b from-red-400 to-red-500 w-10 max-h-10 aspect-square text-white rounded-full">
                            <BsFillHeartFill size={18} />
                        </span>
                    </div>
                    <div className="flex items-center">
                        <span className="flex flex-1 items-center gap-2">
                            <span className="flex items-center justify-center rounded-full bg-black/50 text-white w-6 aspect-square">
                                <BsPerson size={16} />
                            </span>
                            <span className="font-semibold text-xs text-black/60">Annonymous</span>
                        </span>
                        <div className="flex items-center gap-2"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}