import { AiFillAlert } from "react-icons/ai";
import { IoMdRefresh } from "react-icons/io";
import { MdClose } from "react-icons/md";


export default function Error() {
    return (
        <div className="flex flex-col gap-10 items-center justify-center">
            <div className="relative flex flex-col items-center justify-center rounded-2xl gap-6">
                <div className="relative before:absolute before:top-2 before:left-0 before:w-full before:h-full before:rounded-full before:bg-gradient-to-br before:from-red-300 before:to-red-400 before:blur-xl">
                    <span className="relative flex items-center justify-center w-20 aspect-square rounded-full shadow-sm shadow-red-600/20 bg-white text-black/80">
                        <AiFillAlert size={40} />
                    </span>
                </div>
                <h2 className="text-center text-[2rem] font-bold mt-4 text-black/80">Oops!</h2>
            </div>
            <p className="text-gray-600 text-center -mt-4">
                <span>Something went wrong, the resources could not be loaded.</span><br />
                <span>Click <span className="font-semibold">Retry</span> to try again.</span>
            </p>
            <button className="group relative text-white h-[50px] px-8 flex items-center justify-center gap-2 before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-black before:rounded-full before:transition-transform hover:before:scale-110">
                <span className="font-semibold relative text-sm">Retry</span>
                <IoMdRefresh size={20} className="relative group-hover:rotate-90 transition-transform" />
            </button>
            <div className="sticky hidden bottom-6 left-0 items-center justify-center">
                <span className="pl-10 pr-5 py-3 mx-auto bg-[#e42d2d] rounded-full text-white flex items-center justify-between gap-4">
                    <span className="font-semibold">Oops... seems like an occured</span>
                    <button className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-white/10">
                        <MdClose size={20} />
                    </button>
                </span>
            </div>
        </div>
    )
}