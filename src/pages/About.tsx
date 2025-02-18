import { useEffect } from "react";
import { BiMessage } from "react-icons/bi";
import { FiFacebook, FiGithub, FiInstagram } from "react-icons/fi";


export default function About() {

    useEffect(() => {
        const pageTitleElement = document.getElementById("page-title");

        if(pageTitleElement) pageTitleElement.innerText = "Tekst | About the developer";
    }, []);
    
    return (
        <div className="min-h-screen flex flex-col gap-6 max-w-[var(--max-width)] my-auto p-4 pt-20 md:pt-[80px] pb-20">
             <div className="w-full flex items-end justify-between p-4 pt-6 sm:pt-12 sm:p-8 rounded-[32px] bg-[#303030] tracking-tight">
                <div className="flex flex-1 flex-col gap-12">
                    <h2 className="text-white text-4xl md:text-[3rem] lg:text-[4rem] font-bold animate-[fade-in_1s_ease]">About</h2>
                    <div className="flex gap-6">
                        <p className="flex-1 max-w-[80ch] text-white/60 text-base md:text-lg">
                            <span className="animate-[fade-in_1s_ease] delay-100">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi impedit consectetur provident ad dolore blanditiis cupiditate sint fugiat fuga, assumenda ipsum ducimus odit? Minus delectus soluta dicta facilis, quas earum.</span>
                            <br />
                            <br />
                            <span className="animate-[fade-in_1s_ease] delay-200">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi impedit consectetur provident ad dolore blanditiis cupiditate sint fugiat fuga, assumenda ipsum ducimus odit? Minus delectus soluta dicta facilis, quas earum.</span>
                        </p>
                    </div>
                    <div className="flex gap-2 mt-8">
                        <button className="rounded-full relative flex items-center justify-center gap-2 min-w-40 px-6 h-12 border border-white/20 text-white/80 hover:bg-white/10 hover:border-transparent">
                            <BiMessage size={18} />
                            <span className="relative font-semibold text-sm md:text-base">Let's chat</span>
                        </button>
                        <button className="bg-white text-black rounded-full relative flex items-center justify-center gap-2 min-w-40 px-6 h-12 border border-white">
                            <FiGithub size={18} className="relative" />
                            <span className="relative font-semibold text-sm md:text-base">View code</span>
                        </button>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="peer flex gap-2">
                        <span className="flex items-center justify-center w-12 aspect-square rounded-full border border-white/10 hover:border-transparent hover:bg-white/10 text-white/80 hover:text-white">
                            <FiFacebook size={20} />
                        </span>
                        <span className="flex items-center justify-center w-12 aspect-square rounded-full border border-white/10 hover:border-transparent hover:bg-white/10 text-white/80 hover:text-white">
                            <FiInstagram size={20} />
                        </span>
                    </div>
                </div>
             </div>
        </div>
    )
};