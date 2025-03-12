import { GrRun } from "react-icons/gr";


export default function FirstAdditionalFeature() {

    return (
        <div className="w-full h-full flex flex-col justify-between gap-20 lg:gap-6 p-10">
            <div className="relative flex-1 w-full h-full flex items-end md:items-center justify-center gap-4">
                <div className="relative flex flex-1 max-w-[360px] h-fit rounded-2xl border-2 border-white/50 before:absolute before:top-2 before:left-1/2 before:-translate-x-1/2 before:w-6 before:h-2 before:border before:border-white/50 before:rounded-full p-1">
                    <span className="flex-1 flex items-center justify-center w-full min-h-[240px] max-h-[240px] rounded-xl border border-white/50"></span>
                </div>
                <div className="bg-[#202020] absolute -bottom-2 -right-4 md:bottom-0 md:right-0 md:relative flex-1 w-full md:w-auto max-w-[80px] md:max-w-[100px] h-fit rounded-2xl border-2 border-white/50 before:absolute before:top-2 before:left-1/2 before:-translate-x-1/2 before:w-6 before:h-2 before:border before:border-white/50 before:rounded-full p-1">
                    <span className="flex items-center justify-center w-full max-h-[120px] min-h-[120px] md:min-h-[200px] md:max-h-[200px]  rounded-xl border border-white/50"></span>
                </div>
            </div>
            <div className="flex justify-center">
                <span className="block w-fit h-fit rounded-full border-2 border-dashed border-white/50">
                    <span className="relative left-3 bottom-3 bg-white rounded-full h-16 flex items-center justify-start pr-8 pl-2 gap-2 w-fit">
                        <span className="flex items-center justify-center w-12 aspect-square rounded-full bg-purple-100 text-purple-600">
                            <GrRun size={24} />
                        </span>
                        <span className="font-semibold text-base md:text-lg text-gray-800 whitespace-nowrap">Fast & reliable</span>
                    </span>
                </span>
            </div>
        </div>
    )
};