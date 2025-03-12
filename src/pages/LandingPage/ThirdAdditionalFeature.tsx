
import { FiCopy, FiHeart } from 'react-icons/fi';
import { MdDeleteOutline, MdMoreHoriz } from 'react-icons/md';

export default function ThirdAdditionFeature() {


    return (
        <div className="w-full h-full flex flex-col gap-4 items-center justify-center tracking-tight">
            <div className="w-full flex justify-center gap-4">
                <div className="relative pt-4 pr-4">
                    <div className="absolute top-0 right-0 w-[360px] aspect-square rounded-3xl bg-white"></div>
                    <span className="relative w-12 max-h-12 aspect-square rounded-2xl bg-white border border-gray-200 text-gray-800 flex items-center justify-center">
                        <MdMoreHoriz size={20} />
                    </span>
                </div>
                <ul className="relative flex flex-col rounded-3xl bg-white shadow-lg shadow-black/10 px-4 py-2 w-full max-w-[320px]">
                    <li className="flex items-center py-2 gap-3 border-b border-gray-100">
                        <span className="w-10 aspect-square flex items-center justify-center rounded-full bg-yellow-100 text-yellow-400">
                            <FiCopy size={16} />
                        </span>
                        <span className="font-semibold text-gray-800">Copy link</span>
                    </li>
                    <li className="flex items-center py-2 gap-3 border-b border-gray-100">
                        <span className="w-10 aspect-square flex items-center justify-center rounded-full bg-purple-100 text-purple-400">
                            <FiHeart size={16} />
                        </span>
                        <span className="font-semibold text-gray-800">Add to favorites</span>
                    </li>
                    <li className="flex items-center py-2 gap-3">
                        <span className="w-10 aspect-square flex items-center justify-center rounded-full bg-red-100 text-red-400">
                            <MdDeleteOutline size={16} />
                        </span>
                        <span className="font-semibold text-gray-800">Delete text space</span>
                    </li>
                </ul>
            </div>
            <div className="ml-20 flex flex-col p-4 w-full max-w-[320px] rounded-3xl shadow-lg shadow-black/10 bg-gradient-to-br from-white/80 to-white gap-4 backdrop-blur-sm">
                <span className="text-lg font-semibold text-black/60">Input password</span>
                <span className="mt-2 flex items-center px-4 h-12 border border-black/10 rounded-full text-sm text-black/50">
                    password
                </span>
                <span className="flex items-center justify-center h-12 rounded-full bg-black text-white font-semibold text-sm">
                    Submit
                </span>
            </div>
        </div>
    )
}