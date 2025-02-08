import { AiOutlineLoading } from "react-icons/ai";
import { BiLoaderAlt } from "react-icons/bi";
import { HiViewGrid } from "react-icons/hi";
import { RiLoader3Fill, RiLoader3Line } from "react-icons/ri";



type Props = { 
    data: any;
    limit: number;
    setLimit: React.Dispatch<React.SetStateAction<number>>; 
    totalPages: number | undefined; 
    loading: boolean; 
}

export default function MoreButton({ data, limit, setLimit, totalPages, loading }: Props) {

    if(!(Number(totalPages) > 1)) return;

    return (
        <button
            onClick={() => (!loading && Number(totalPages) > 1) && setLimit(prev => prev + limit)} 
            className="mt-10 group relative flex m-auto w-fit rounded-full text-white"
        >
            <span className={`transition-transform block w-20 h-12 overflow-hidden relative before:absolute before:top-0 before:left-[1px] before:w-full before:h-full before:rounded-l-full before:transition-transform before:ease-expo before:bg-[#303030] ${loading ? 'before:duration-300 before:translate-x-[56px]' : 'group-hover:scale-125 group-hover:translate-x-[1px]'}`} />
            <span className={`transition-transform block w-20 h-12 overflow-hidden relative before:absolute before:top-0 before:right-[1px] before:w-full before:h-full before:rounded-r-full before:bg-[#303030] before:transition-transform before:ease-expo ${loading ? 'before:duration-300 before:translate-x-[-56px]' : 'group-hover:scale-125 group-hover:translate-x-[-1px]'}`} />
            <span className={`absolute w-full h-full top-0 left-0 flex items-center justify-center transition-[opacity,_transform] ${loading ? 'opacity-0 scale-50 delay-0' : 'delay-100'}`}>More spaces</span>
            <span className={`w-6 h-6 origin-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-[opacity,_transform] ease-expo ${loading ? 'opacity-100 scale-100 duration-300 delay-200' : 'scale-50 opacity-0'}`}>
                <span className="w-full h-full block animate-[rotate-normal_.5s_linear_infinite] rounded-full border-[3px] border-white border-l-transparent "></span>
            </span>
        </button>
    )
}