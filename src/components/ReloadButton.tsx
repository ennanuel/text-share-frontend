
import { IoMdRefresh } from "react-icons/io";



export default function ReloadButton({ text, reload }: { text: string; reload: () => void }) {
    if(!text) return;

    return (
        <div className="w-fit m-auto my-0 sticky top-6 md:top-20 z-10 flex items-center justify-center p-2">
            <button onClick={reload} className="relative group w-fit flex items-center justify-center gap-2 rounded-full pl-2 pr-4 h-10 bg-gradient-to-br bg-blue-400 text-white transition-transform duration-500 ease-expo hover:scale-110 shadow-lg shadow-blue-600/20 hover:text-white hover:bg-gray-800 hover:shadow-gray-800/20">
                <span className="flex items-center justify-center bg-white group-hover:text-gray-700 text-blue-500 w-6 aspect-square rounded-full">
                    <IoMdRefresh size={16} className="relative icon" />
                </span>
                <span className="relative font-semibold text-sm">{text}</span>
            </button>
        </div>
    )
}