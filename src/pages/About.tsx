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
             <div className="w-full flex flex-col md:flex-row gap-6 md:items-end md:justify-between p-4 pt-6 sm:pt-12 sm:p-8 rounded-[32px] bg-[#303030] tracking-tight">
                <div className="flex flex-1 flex-col gap-12">
                    <h2 className="text-white text-2xl md:text-4xl md:text-[3rem] lg:text-[4rem] font-bold animate-[fade-in_1s_ease]">About</h2>
                    <div className="flex gap-6">
                        <p className="text-white/60 text-base md:text-lg max-w-[80ch]">
                            <span>As a full-stack developer with 3 years of experience, I was frustrated with the hassle of transferring text between my phone and computer. 
                            </span>
                            <br />
                            <span>That's what inspired me to build Tekst – a simple, secure, and instant way to share text across devices. I designed and developed the entire web app myself and I'm always open to collaborating on new projects. </span>
                            <br />
                            <br />
                            <span>If you find Tekst useful, please consider <span className="text-blue-400">donating</span> to help me keep improving it!</span>
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-8">
                        <button className="rounded-full relative flex items-center justify-center gap-2 flex-1 md:flex-auto max-w-fit sm:min-w-40 px-4 md:px-6 h-12 border border-white/20 text-white/80 hover:bg-white/10 hover:border-transparent">
                            <BiMessage size={18} />
                            <span className="relative font-semibold text-sm md:text-base">Let's chat</span>
                        </button>
                        <button className="bg-white text-black rounded-full relative flex items-center flex-1 md:flex-auto max-w-fit justify-center gap-2 sm:min-w-40 px-4 md:px-6 h-12 border border-white">
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