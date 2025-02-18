

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { GrGlobe, GrRun, GrSecure } from "react-icons/gr";
import { BiSolidMessage, BiUser } from "react-icons/bi";
import { FiCode, FiCopy, FiGithub, FiHeart } from "react-icons/fi";
import { MdAdd, MdDeleteOutline, MdDevices, MdMoreHoriz, MdMoreVert, MdOutlineMoreHoriz } from "react-icons/md";
import { IoClose, IoDocumentTextOutline, IoListOutline } from "react-icons/io5";
import { BsDot, BsFillHeartFill, BsPerson } from "react-icons/bs";
import { LiaRunningSolid, LiaTelegramPlane } from "react-icons/lia";
import { GoLock, GoThumbsup } from "react-icons/go";
import { PiPassword } from "react-icons/pi";
import { IconType } from "react-icons";
import { TbStack2 } from "react-icons/tb";

import { AnimatePresence, motion, MotionValue, useMotionValue, useScroll, useTransform } from "framer-motion";

import logo from "../assets/images/tekst_logo_dark.svg";
import logoLight from "../assets/images/tekst_logo.svg";

import laptopImage from "../assets/images/laptop-text-spaces.png";

import phoneImage from "../assets/images/phone-text-space.png";


const EASE = [0.16, 1, .3, 1];
const TRANSITION = { duration: 1, ease: EASE };

const opacityVariants = {
    initial: { opacity: 0 },
    final: { opacity: 1 },
};

const LINKS = [
    {
        title: "Intro",
        value: ""
    },
    {
        title: "Features",
        value: "features"
    },
    {
        title: "How it works",
        value: "how-it-works"
    },
    {
        title: "FAQs",
        value: "faq"
    },
];

const ABOUTS = [
    {
        title: "Create Your Space",
        description: "Need to quickly share a note, code snippet, or a block of text between your phone, laptop, or tablet?\n Create a Tekst Space.",
        media: ""
    },
    {
        title: "Easy Sharing",
        description: "Get a simple link to your space and share it however you like.",
        media: ""
    },
    {
        title: "Universal Access",
        description: "View your shared text on any device with a web browser – no more emailing yourself or copying and pasting",
        media: ""
    },
];

const DEMOS = [
    {
        Icon: TbStack2,
        iconClassName: "text-yellow-400",
        className: "bg-[#202020] text-white",
        title: "Tekst spaces",
        subTitle: "Streamlined Management",
        desc: "A simple and intuitive interface makes managing your Tekst Spaces a breeze."
    },
    {
        Icon: IoListOutline,
        iconClassName: "text-blue-400",
        className: "bg-gradient-to-b from-[#e5edf6] to-blue-200 text-gray-800",
        title: "Favorites",
        subTitle: "Personalized Space List",
        desc: "Mark your favorite Tekst Spaces for instant access and organization."
    },
    {
        Icon: GrSecure,
        iconClassName: "text-yellow-400",
        className: "bg-gradient-to-b from-blue-600 to-blue-700 text-white",
        title: "Advanced options",
        subTitle: "Control and Security",
        desc: "Protect your sensitive information with password-protected spaces and other security options."
    }
]

const FAQs = [
    {
      "question": "What is the price of Tekst?",
      "answer": "Tekst is completely free to use.  Share text instantly without any cost."
    },
    {
      "question": "Can I use Tekst on different devices?",
      "answer": "Yes! Tekst is designed to work seamlessly across all your devices. Simply access your Tekst Space link from any device with a web browser."
    },
    {
      "question": "Can I share a Tekst Space with others?",
      "answer": "Absolutely!  Sharing is easy.  Just copy the unique link for your Tekst Space and share it with anyone you want. They can instantly view the text in their browser."
    },
    {
      "question": "Is Tekst available everywhere?",
      "answer": "Yes, Tekst is accessible anywhere with an internet connection.  Because it's web-based, you can use it on any device with a browser, regardless of your location."
    },
    {
      "question": "How secure is my text?",
      "answer": "Tekst uses encryption to protect your shared text. You can also add a password to your Tekst Space for an extra layer of security.  Plus, all text is automatically deleted after 24 hours to ensure your privacy."
    },
    {
      "question": "Do I need to create an account to use Tekst?",
      "answer": "No, you don't need to create an account.  Just create a Tekst Space and start sharing immediately."
    },
    {
      "question": "How long is my text stored?",
      "answer": "All text within a Tekst Space is automatically deleted after 24 hours. This ensures your privacy and keeps things simple."
    },
    {
      "question": "What kind of text can I share?",
      "answer": "You can share any kind of text, from quick notes and reminders to code snippets, meeting minutes, and more.  Tekst is perfect for any text-sharing need."
    },
      {
      "question": "Is there a limit to how much text I can share?",
      "answer": "While there isn't a strict character limit, Tekst is designed for sharing reasonable amounts of text.  For very large documents, consider using a document sharing service."
    },
    {
      "question": "What if I need to keep the text longer than 24 hours?",
      "answer": "Tekst is designed for temporary text sharing. If you need to store text for longer periods, you need to be logged in."
    }
];


function TitleComponent({ title, desc, subTitle, Icon, iconClassName }: { title: string; desc: string; subTitle: string; Icon: IconType; iconClassName: string; }) {
    return (
        <div className="flex flex-col items-center justify-center gap-2 text-center">
            <motion.div variants={opacityVariants} initial="initial" whileInView="final" transition={{ duration: 1, delay: .3, ease: "easeInOut"  }} className="flex items-center justify-center gap-2">
                <Icon size={18} className={iconClassName} />
                <span className="text-sm font-semibold">{subTitle}</span>
            </motion.div>
            <motion.h3 variants={opacityVariants} initial="initial" whileInView="final" transition={{ duration: 1, delay: .4, ease: "easeInOut" }} className="font-bold text-[3rem] md:text-[5rem] leading-[3.5rem] md:leading-[5.5rem] tracking-tight">{title}</motion.h3>
            <motion.p variants={opacityVariants} initial="initial" whileInView="final" transition={{ duration: 1, delay: .5, ease: "easeInOut" }} className="text-base md:text-lg tracking-tight">{desc}</motion.p>
        </div>
    )
}

function AboutComponent({ title, description, limit, index, scrollProgress }: { title: string; description: string; scrollProgress: MotionValue<number>; limit: number; index: number; }) {
    const { start, firstInBetween, secondInBetween, end } = useMemo(() => {
        const start = Number(((limit - index) / limit).toFixed(4));
        const end = Number(((limit - (index + 1)) / limit).toFixed(4));
        const firstInBetween = Number((start - ((start - end) * 0.4)).toFixed(4));
        const secondInBetween = Number((start - ((start - end) * 0.6)).toFixed(4));

        return { start, firstInBetween, secondInBetween, end };
    }, []);

    const transform = useTransform(scrollProgress, [start, firstInBetween, secondInBetween, end], [80, 0, 0, 80]);
    const translateXLeft = useTransform(() => `-${transform.get()}%`);
    const translateXRight = useTransform(() => `${transform.get()}%`);

    return (
        <li className="min-h-screen overflow-clip max-h-[1240px] flex flex-col lg:flex-row items-center justify-center gap-10 md:gap-20 lg:gap-10 px-6 pt-[104px] pb-4">
            <motion.div style={{ x: translateXLeft }} className="lg:flex-1 w-full flex items-stretch justify-center">
                {
                    index === 0 ?
                        <div className="w-full md:w-4/5 max-w-[480px] aspect-[.7] max-h-[560px] relative rounded-[64px] bg-gradient-to-br from-blue-100 to-blue-300 p-10 lg:p-20">
                            <div className="w-full h-full relative rounded-[32px] border border-black/10 bg-white shadow-lg shadow-black/10 p-4 md:p-6 flex flex-col overflow-clip">
                                <span className="text-xl tracking-tight font-semibold text-gray-800">Create Text Space</span>
                                <div className="flex gap-4 mt-4">
                                    <span className="relative flex flex-col justify-between h-6 after:w-full after:h-1 after:bg-gray-800 after:rounded-t-full min-w-10">
                                        <span className="text-xs text-gray-800 font-semibold">Basic info</span>
                                    </span>
                                    <span className="relative flex flex-col justify-between h-6 after:w-full after:h-1 after:rounded-t-full min-w-10">
                                        <span className="text-xs text-gray-400 font-semibold">Advanced</span>
                                    </span>
                                </div>
                                <div className="flex-1 mt-6 flex flex-col gap-4">
                                    <span className="h-10 flex items-center justify-start border border-gray-200 text-gray-400 rounded-full px-3">
                                        <span className="text-xs">Text space title</span>
                                    </span>
                                    <span className="flex-1 flex items-start justify-start border border-gray-200 text-gray-400 rounded-[24px] p-3">
                                        <span className="text-xs">Text space content</span>
                                    </span>
                                </div>
                                <span className="mt-4 flex items-center text-gray-400 text-[.6rem]">
                                    <span className="font-semibold">10/100 words</span>
                                    <BsDot size={16} />
                                    <span className="font-semibold">50/1000 chars</span>
                                </span>
                                <span className="mt-6 flex items-center justify-center gap-2 h-10 rounded-full bg-gray-800 text-white font-semibold">
                                    <span className="font-semibold text-xs">Create space</span>
                                    <MdAdd size={16} />
                                </span>
                            </div>
                        </div> :
                        index === 1 ?
                            <div className="relative w-full md:w-4/5 max-w-[480px] aspect-[.7] max-h-[560px] rounded-[64px] bg-gradient-to-br from-blue-100 to-blue-300 p-4 sm:p-6 md:p-8 items-center justify-center overflow-clip">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-full flex flex-col items-center justify-center gap-10">
                                    <div className="w-full md:w-4/5 flex flex-col justify-between aspect-square rounded-[32px] bg-yellow-100 shadow-lg shadow-black/10 p-6">
                                        <div className="flex justify-between gap-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-semibold text-2xl text-black/80 tracking-tight">Space title</span>
                                                <span className="text-sm text-black/60">Space description</span>
                                            </div>
                                            <span className="flex items-center justify-center border border-black/10 w-10 max-h-10 aspect-square text-black/60 rounded-xl">
                                                <MdMoreVert size={20} />
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
                                    <div className="w-full md:w-4/5 flex flex-col justify-between aspect-square rounded-[32px] bg-white shadow-lg shadow-black/10 p-6">
                                        <div className="flex justify-between gap-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-semibold text-2xl text-black/80 tracking-tight">Space title</span>
                                                <span className="text-sm text-black/60">Space description</span>
                                            </div>
                                            <span className="flex items-center justify-center border border-black/10 w-10 max-h-10 aspect-square text-black/60 rounded-xl">
                                                <MdMoreVert size={20} />
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
                                    <div className="w-full md:w-4/5 flex flex-col justify-between aspect-square rounded-[32px] bg-purple-100 shadow-lg shadow-black/10 p-6">
                                        <div className="flex justify-between gap-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-semibold text-2xl text-black/80 tracking-tight">Space title</span>
                                                <span className="text-sm text-black/60">Space description</span>
                                            </div>
                                            <span className="flex items-center justify-center border border-black/10 w-10 max-h-10 aspect-square text-black/60 rounded-xl">
                                                <MdMoreVert size={20} />
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
                            </div> :
                            <div className="relative w-full aspect-[.7] max-w-[480px] max-h-[560px] rounded-[64px] bg-gradient-to-br from-blue-100 to-blue-300 p-4 sm:p-6 md:p-8 overflow-clip">
                                <div className="w-full h-full flex items-center justify-center gap-6">
                                    <div className="h-full rounded-[32px] max-w-[240px] min-w-[240px] bg-white flex flex-col p-4 pt-8">
                                        <span className="font-semibold tracking-tight">Space title</span>
                                        <div className="flex gap-2 mt-4 text-gray-600">
                                            <span className="flex items-center gap-1 border border-gray-200 bg-white rounded-full pr-2 p-[2px]">
                                                <span className="block w-4 aspect-square bg-gray-300 rounded-full"></span>
                                                <span className="text-[.5rem] font-semibold">User</span>
                                            </span>
                                            <span className="flex items-center gap-1 border border-gray-200 bg-white rounded-full pr-2 p-[2px]">
                                                <span className="block w-4 aspect-square bg-gray-300 rounded-full"></span>
                                                <span className="text-[.5rem] font-semibold">2 mins.</span>
                                            </span>
                                            <span className="flex items-center gap-1 border border-gray-200 bg-white rounded-full pr-2 p-[2px]">
                                                <span className="block w-4 aspect-square bg-gray-300 rounded-full"></span>
                                                <span className="text-[.5rem] font-semibold">10 views</span>
                                            </span>
                                        </div>
                                        <span className="mt-4 text-[.5rem] text-gray-400">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias quos, sequi neque.</span>
                                        <div className="mt-4 flex p-1 border border-gray-200 rounded-full">
                                            <span className="flex-1"></span>
                                            <span className="w-4 aspect-square rounded-full bg-gray-300"></span>
                                        </div>
                                        <span className="mt-6 rounded-xl border border-gray-200 flex-1 text-[.6rem] text-gray-800 p-2">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat quam reiciendis molestiae facere sit doloribus corrupti minima, esse tenetur omnis repudiandae ducimus praesentium, molestias enim soluta nam ab qui est.
                                        </span>
                                        <span className="mt-4 h-10 rounded-full bg-gray-800 text-white text-[.6rem] flex items-center justify-center">
                                            Copy content
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-start gap-3">
                                        <span className="px-3 h-6 flex items-center rounded-full bg-[#fff2f2] text-red-400 text-xs font-semibold tracking-tight">Secure</span>
                                        <span className="px-3 h-6 flex items-center rounded-full bg-[#f5fff2] text-green-400 text-xs font-semibold tracking-tight">Reliable</span>
                                        <span className="px-3 h-6 flex items-center rounded-full bg-[#fffdf2] text-yellow-400 text-xs font-semibold tracking-tight">Fast</span>
                                    </div>
                                </div>
                            </div>
                }
            </motion.div>
            <motion.div style={{ x: translateXRight }} className="lg:flex-1 flex flex-col items-start justify-center gap-6">
                <h3 className="text-4xl md:text-5xl font-semibold tracking-tight">{title}</h3>
                <div className="text-base md:text-lg font-normal text-gray-600 max-w-[40ch] lg:max-w-[50ch] tracking-tight">{description}</div>
            </motion.div>
        </li>
    )
};

function RotatingBlock({ index, title, desc, Icon }: { index: number; title: string; desc: string; Icon: IconType }) {
    const boxRef = useRef<HTMLDivElement>(null);
    const rotate = useMotionValue('translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0.0028deg) rotateY(0.004deg) rotateZ(0deg) skew(0deg, 0deg)');

    const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (event) => {
        if(!boxRef.current) return;
        const container = boxRef.current.getBoundingClientRect();
        const halfX = container.left + (container.width / 2);
        const halfY = container.top + (container.height / 2);

        const x = ((event.clientX - halfX) / (container.width / 2)) * 20;
        const y = ((halfY - event.clientY) / (container.height / 2)) * 20;

        rotate.set(`translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(${y}deg) rotateY(${x}deg) rotateZ(0deg) skew(0deg, 0deg)`);
    };

    const handleMouseOut = () => {
        rotate.set(`translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0.0028deg) rotateY(0.004deg) rotateZ(0deg) skew(0deg, 0deg)`);
    }
    return (
        <motion.div 
            onMouseMove={handleMouseMove} 
            onMouseOut={handleMouseOut} 
            ref={boxRef} 
            style={{ perspective: '1000px' }}
            variants={opacityVariants}
            initial="initial"
            whileInView="final"
            transition={{ duration: .6, delay: .2, ease: "easeInOut" }}
            className={`rotating-block-${index}`}
        >
            <motion.div style={{ transform: rotate, willChange: 'transform', transformStyle: 'preserve-3d' }} className="hover:transition-none transition-transform h-full w-full flex flex-col p-6 gap-4 items-start border border-gray-300 bg-white rounded-[32px]">
                <Icon size={40} className="text-[var(--blue)]" />
                <h4 className="font-semibold text-2xl">{title}</h4>
                <span className="text-gray-400 text-sm">{desc}</span>
            </motion.div>
        </motion.div>
    )
};

function DemoComponent({ iconClassName, Icon, className, subTitle, title, desc, index }: { className: string; Icon: IconType; iconClassName: string; subTitle: string; title: string; desc: string; index: number; }) {
    const offsetY = useMemo(() => `${160 + (32 * index)}px`, []);
    return (
        <motion.div 
            variants={opacityVariants}
            initial="initial"
            whileInView="final"
            transition={{ duration: .6, delay: .3, ease: "easeInOut" }}
            style={{ top: offsetY, minHeight: `calc(110vh - ${offsetY})` }} 
            className={`${className} p-6 sticky flex-1 flex flex-col lg:flex-row mx-auto mt-20 pb-20 w-full max-w-[1240px] col-span-1 row-span-2 rounded-[32px] after:absolute after:top-0 after:left-1/2 after:-translate-x-1/2 after:h-2 after:w-1/2 after:rounded-b-full after:bg-[var(--purple)] overflow-clip`}
        >
            <div className="flex-1 flex items-center justify-center">
                {
                    index === 0 ?
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
                        </div> :
                        index === 1 ? 
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
                            </div> :
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
                }
            </div>
            <div className="flex-1 flex flex-col justify-start lg:justify-center items-center lg:items-start gap-4">
                <div className="flex items-center gap-2">
                    <Icon size={20} className={iconClassName} />
                    <span className="text-sm text-center lg:text-left font-semibold text-inherit">{subTitle}</span>
                </div>
                <h3 className="text-[2.4rem] text-center lg:text-left leading-[2.6rem] font-semibold">{title}</h3>
                <p className="mt-2 text-lg max-w-[44ch] text-center lg:text-left">{desc}</p>
            </div>
        </motion.div>
    )
};

function FaqComponent({ question, answer, index }: { question: string; answer: string; index: number; }) {
    const [showAnswer, setShowAnswer] = useState(false);
    const answerContainerRef = useRef<HTMLDivElement>(null);

    const toggleShowAnswer = () => setShowAnswer(!showAnswer);

    return (
        <motion.li 
            variants={opacityVariants}
            initial="initial" 
            whileInView="final" 
            transition={{ duration: .6, delay: (3 + index) / 25, ease: "easeInOut" }}
            className="flex flex-col border-b border-gray-200"
        >
            <div className="py-4 flex items-center justify-between">
                <span className="font-semibold text-sm md:text-base tracking-tight">{question}</span>
                <button 
                    onClick={toggleShowAnswer} 
                    className={`transition-transform duration-300 ${showAnswer ? 'rotate-45' : ''} py-4 w-8 max-h-8 aspect-square rounded-full bg-blue-400/10 text-[var(--blue)] flex items-center justify-center`}
                >
                    <MdAdd size={20} />
                </button>
            </div>
            <AnimatePresence>
                {
                    showAnswer ?
                        <motion.div 
                            layout 
                            initial={{ height: '0' }} 
                            animate={{ height: 'auto' }} 
                            exit={{ height: '0' }} 
                            transition={{ ...TRANSITION, duration: .5 }} 
                            className="overflow-clip"
                        >
                            <p ref={answerContainerRef} className="text-sm md:text-base tracking-tight pb-4">
                                {
                                    answer.split('\n').map((text, index) => (
                                        text ? 
                                            <span key={index}>{text}</span> : 
                                            <>
                                            <br key={(Math.random() * index)} />
                                            <br key={(Math.random() * index)} />
                                            </>
                                    ))
                                }
                            </p>
                        </motion.div> :
                        null
                }
            </AnimatePresence>
        </motion.li>
    )
}

export default function LandingPage() {
    const prevSection = useRef({ index: 0, value: "", width: 0, translateX: 0 });
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [activeSection, setActiveSection] = useState({ index: 0, value: "", width: 0, translateX: 0 });

    const devicesRef = useRef<HTMLDivElement>(null);
    const aboutRef = useRef<HTMLUListElement>(null);

    const { scrollYProgress: devicesScrollYProgress } = useScroll({ 
        target: devicesRef, 
        offset: ["start start", "start 150vh"] 
    });
    const { scrollYProgress: aboutScrollYProgress } = useScroll({
        target: aboutRef,
        offset: ["end start", "start end"]
    });
    
    const devicesTranslateY = useTransform(devicesScrollYProgress, [1, 0], [0, 200]);
    const devicesScale = useTransform(devicesScrollYProgress, [1, 0], [1, 0.7]);

    const chooseSection = (index: number, firstTime?: boolean, setPrevActiveSection?: boolean) => {
        if(activeSection.index === index && !firstTime) return;

        const newActiveSection = { index: 0, value: "", width: 0, translateX: 0 };
        const sectionButtons = document.getElementsByClassName('section-btn');

        for(let i = 0; i < sectionButtons.length; i++) {
            const element = sectionButtons[i];
            if(i > index) break;
                        
            newActiveSection.index = i;
            newActiveSection.value = (element as HTMLButtonElement).value;
            newActiveSection.width = (element as HTMLButtonElement).offsetWidth;
            newActiveSection.translateX += i === 0 ? 0 : ((sectionButtons[i - 1] as HTMLButtonElement).offsetWidth);
        };

        setActiveSection(newActiveSection);
        if(setPrevActiveSection) prevSection.current = newActiveSection;
    };
    const chooseNewSection = () => {
        prevSection.current = activeSection;
        setShowMobileMenu(false);
    };
    const revertBackToOriginal = () => {
        chooseSection(prevSection.current.index);
    };
    
    useEffect(() => {
        chooseSection(0, true);
    }, []);
    

    return (
        <div style={{ '--blue': "#3b5fcd", '--purple': '#79aaff', '--light-blue': "#a7bce4" } as React.CSSProperties} className="bg-[] min-h-screen bg-gray-100 font-montserrat text-gray-800">
            <header className="bg-gray-100 sticky top-0 z-10">
                <div className="my-0 mx-auto max-w-[var(--big-max-width)] hidden lg:grid grid-cols-[200px_1fr_200px] items-center p-4 md:px-6">
                    <div className="flex items-center justify-start">
                        <a href={`${import.meta.env.BASE_URL}`} className="flex items-center justify-center">
                            <img src={logo} alt="Website logo" className="w-10 h-auto" />
                            <span className="font-bold text-4xl text-gray-800 -ml-1 tracking-tighter">ekst</span>
                        </a>
                    </div>
                    <div className="flex items-center justify-center">
                        <ul className="relative flex items-center justify-center border border-gray-300 rounded-full bg-gray-100 overflow-">
                            <span style={{ transform: `translateX(${activeSection.translateX}px)` }} className="transition-transform ease-expo duration-500 absolute top-0 left-0 flex items-center justify-center h-full"
                            >
                                <motion.span className="block rounded-full bg-[var(--blue)] max-w-[calc(100%_-_8px)] w-full h-[calc(100%_-_8px)]" layout style={{ width: activeSection.width }} />
                            </span>
                            {
                                LINKS.map(({ title, value }, index) => (
                                    <li key={index} className="relative" onMouseOver={() => chooseSection(index)}>
                                        <a
                                            onClick={chooseNewSection} 
                                            onMouseOut={revertBackToOriginal}
                                            href={`#${value}`}
                                            className={ `${prevSection.current.index === index && activeSection.index === index ? 'text-white' : 'text-gray-500 hover:text-white'} section-btn transition-colors duration-300 h-12 min-w-[120px] p-5 flex items-center justify-center`}
                                        >
                                            <span className="text-sm sm:text-base font-semibold tracking-tight pointer-events-none">{title}</span>
                                        </a>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                        <a href="https://github.com/ennanuel/text-share-frontend.git" className="h-12 w-12 rounded-full bg-gray-200 text-[var(--blue)] flex items-center justify-center">
                            <FiGithub size={20} />
                        </a>
                        <Link to="/spaces" className="h-12 rounded-full px-6 flex items-center justify-center bg-[var(--blue)] text-white">
                            <span className="text-sm sm:text-base font-semibold">Get started</span>
                        </Link>
                    </div>
                </div>
                <div className="relative flex justify-between items-center lg:hidden w-full">
                    <div className="w-full px-4 md:px-6 p-4 flex items-center justify-between">
                        <a href={`${import.meta.env.BASE_URL}`} className="flex items-center justify-center">
                            <img src={logo} alt="Website logo" className="w-10 h-auto" />
                            <span className="text-gray-800 font-bold text-4xl -ml-1 tracking-tighter">ekst</span>
                        </a>
                        <button onClick={() => setShowMobileMenu(true)} className="text-gray-800 border-gray-800 flex items-center justify-center w-10 aspect-square rounded-full border-4">
                            <MdOutlineMoreHoriz size={24} />
                        </button>
                    </div>
                    <div 
                        style={{ 
                            clipPath: showMobileMenu ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" : "polygon(0 0, 100% 0, 100% 0, 0 0)",
                            pointerEvents: showMobileMenu ? "all" : "none"
                        }} 
                        className={`transition-[clip-path] duration-500 ease-expo pt-4 pb-4 md:pb-6 md:pt-40 px-4 md:px-6 top-0 left-0 flex flex-col justify-between gap-6 fixed w-screen h-screen bg-[var(--blue)]`}
                    >
                        <div className="w-full flex items-center justify-between relative z-10">
                            <a href={`${import.meta.env.BASE_URL}`} className="flex items-center justify-center">
                                <img src={logoLight} alt="Website logo" className="w-10 h-auto" />
                                <span className="text-white font-bold text-4xl -ml-1 tracking-tighter">ekst</span>
                            </a>
                            <button onClick={() => setShowMobileMenu(false)} className="border-white text-white flex items-center justify-center w-10 aspect-square rounded-full border-4">
                                <IoClose size={24} />
                            </button>
                        </div>
                        <ul className="flex flex-col gap-4">
                            {
                                LINKS.map(({ title, value }, index) => (
                                    <li key={index} className="relative" onMouseOver={() => chooseSection(index)}>
                                        <a
                                            href={`#${value}`}
                                            onClick={chooseNewSection} 
                                            onMouseOut={revertBackToOriginal}
                                            className={ `${prevSection.current.index === index && activeSection.index === index ? 'text-yellow-300 font-inter font-bold' : 'text-white font-semibold'}`}
                                        >
                                            <span className="text-4xl md:text-5xl tracking-tight pointer-events-none">{title}</span>
                                        </a>
                                    </li>
                                ))
                            }
                        </ul> 
                        <div className="flex justify-between gap-4">
                            <Link to="/spaces" className="h-12 md:h-14 rounded-full border border-white bg-white text-[var(--blue)] flex items-center justify-center px-6">
                                <span className="text-lg md:text-2xl font-semibold tracking-tight">Get started</span>
                            </Link>
                            <Link to="/sign-up" className="h-12 md:h-14 rounded-full border border-white bg-[var(--blue)] text-white flex items-center justify-center px-6">
                                <span className="text-lg md:text-2xl font-semibold tracking-tight">Sign up</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
            <div className="my-0 mx-auto max-w-[var(--big-max-width)]">
                <div className="p-6 flex flex-col gap-20 md:gap-8 min-h-[80vh] items-center justify-center pt-[64px]">
                    <h1 className="text-center tracking-tighter font-bold text-[4rem] leading-[4.5rem] md:text-[7rem] md:leading-[7.5rem] max-w-[16ch]">
                        <motion.span variants={opacityVariants} initial="initial" whileInView="final" transition={{ duration: 1, delay: .2, ease: "easeInOut" }}> Text Sharing Shouldn't be a Chore</motion.span>
                    </h1>
                    <p className="mt-2 font-semibold tracking-tight text-2xl max-w-[60ch] text-center">
                        <motion.span variants={opacityVariants} initial="initial" whileInView="final" transition={{ duration: 1, delay: .4, ease: "easeInOut" }}>Whatever device you own, there's <span className="text-[var(--blue)]">Tekst</span>.<br/> Text sharing at your fingertips.</motion.span>
                    </p>
                </div>
                <motion.div 
                    ref={devicesRef} 
                    initial={{ y: 200, opacity: 0 }} 
                    animate={{ y: 0, opacity: 1 }} 
                    transition={{ ...TRANSITION, duration: 2, delay: .5 }} 
                    className="min-h-screen p-6"
                >
                    <div className="relative mt-[-120px] md:mt-[-200px] rounded-t-[32px]">
                        <motion.div style={{ y: devicesTranslateY, scale: devicesScale }} className="relative flex items-end justify-center h-full lg:px-20">
                            <img src={laptopImage} className="w-full h-auto hidden md:block" alt="" />
                            <img src={phoneImage} className="w-full h-auto md:hidden block" alt="" />
                        </motion.div>
                    </div>
                </motion.div>
                <div className="min-h-screen pt-[160px] pb-10 flex flex-col">
                    <TitleComponent 
                        subTitle="Create a Tekst space" 
                        title="Save time" 
                        desc="Simplify the sharing process." 
                        Icon={LiaTelegramPlane} 
                        iconClassName="text-blue-600"
                    />
                    <ul ref={aboutRef} className="flex flex-col">
                        {
                            ABOUTS.map(({ title, description }, index) => (
                                <AboutComponent 
                                    title={title} 
                                    description={description} 
                                    index={index} 
                                    limit={ABOUTS.length} 
                                    scrollProgress={aboutScrollYProgress} 
                                />
                            ))
                        }
                    </ul>
                </div>
                <div className="min-h-screen pt-[160px] pb-10 px-4 md:px-10 flex flex-col gap-20">
                    <TitleComponent 
                        subTitle="Easy and secure" 
                        title="Features for you" 
                        desc="Share text without any hassle." 
                        Icon={MdDevices} 
                        iconClassName="text-blue-600"
                    />
                    <div className="flex-1 rotating-blocks-container-sm md:rotating-blocks-container-md lg:rotating-blocks-container-lg grid gap-4 mx-auto max-w-[1032px]">
                        <div className="phone-image-container relative group min-h-[480px] md:min-h-[560px] flex items-stretch justify-center col-span-1 row-span-2 bg-[#202020] rounded-[40px] lg:rounded-[64px] after:absolute after:top-0 after:left-1/2 after:-translate-x-1/2 after:h-2 after:w-1/2 after:rounded-b-full after:bg-[var(--purple)] overflow-clip">
                            <div className="relative h-full flex w-full">
                                <img src={phoneImage} className="absolute top-10 left-1/2 -translate-x-1/2 translate-y-16 group-hover:translate-y-0 transition-transform ease-expo duration-1000 w-full max-w-[320px] md:max-w-[360px] lg:max-w-[280px]" alt="mobile phone image" />
                            </div>
                        </div>
                        <RotatingBlock title="Instant Access" index={0} desc=" Quickly share text between your devices." Icon={LiaRunningSolid} />
                        <RotatingBlock title="Effortless Sharing" index={1} desc="Simple and easy to use, no technical skills required." Icon={GoThumbsup} />
                        <RotatingBlock title="Your Data, Your Control" index={2} desc=" Protect your text with encryption and optional passwords." Icon={PiPassword} />
                        <RotatingBlock title="Private & Anonymous" index={3} desc="Anonymous sharing with automatic 24-hour deletion." Icon={GoLock} />
                    </div>
                </div>
                <div className="min-h-screen py-[160px] p-6 flex flex-col gap-10">
                    <TitleComponent 
                        subTitle="Easy management" 
                        title="Monitor shared spaces" 
                        desc="Organize and manage your spaces." 
                        Icon={IoDocumentTextOutline} 
                        iconClassName="text-blue-600"
                    />
                    {
                        DEMOS.map((demo, index) => <DemoComponent key={index} {...demo} index={index} />)
                    }
                </div>
                <div className="min-h-screen py-[160px] p-6 flex flex-col gap-10">
                    <TitleComponent 
                        Icon={BiUser} 
                        iconClassName="text-blue-600"
                        subTitle="Whatever the need" 
                        title="Designed for you" 
                        desc="Alongside amateurs, experts and professionals." 
                    />
                    <ul className="mt-20 mx-auto max-w-[960px] flex justify-center items-center gap-2 md:gap-6 flex-wrap">
                        {
                            ["Students", "Teachers", "Journalists", "Writers", "Developers", "Designers", "Gamers", "Remote Teams", "Anyone", "Office Workers"]
                                .map((title, index) => (
                                    <motion.li 
                                        key={index} 
                                        variants={opacityVariants} 
                                        initial="initial" 
                                        whileInView="final" 
                                        transition={{ delay: ((3 + index) / 25), duration: 1, ease: "easeInOut" }} 
                                        className="h-16 w-fit px-6 md:px-8 flex items-center justify-center bg-white border border-blue-600/20 text-[var(--blue)] hover:bg-[var(--blue)] hover:border-[var(--blue)] hover:text-white transition-[background-color] shadow-lg shadow-transparent hover:shadow-blue-600/20 rounded-full"
                                    >
                                        <span className="font-semibold text-xl md:text-3xl tracking-tight">{title}</span>
                                    </motion.li>
                                ))
                        }
                    </ul>
                </div>
                <div className="lg:min-h-screen py-[160px] mb-[200px] p-6 flex flex-col gap-10">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <motion.span 
                            variants={opacityVariants} 
                            initial="initial" 
                            whileInView="final" 
                            transition={{ duration: .6, delay: .3, ease: "easeInOut" }} 
                            className="text-sm font-semibold tracking-tight"
                        >FAQ</motion.span>
                        <motion.h3 
                            variants={opacityVariants} 
                            initial="initial" 
                            whileInView="final" 
                            transition={{ duration: .6, delay: .3, ease: "easeInOut" }} 
                            className="font-bold text-[5rem] leading-[5.5rem] mb-2"
                        >Answers</motion.h3>
                    </div>
                    <ul className="flex flex-col max-w-[600px] mt-10 w-full mx-auto gap-2">
                            {
                                FAQs.slice(0, 4).map((faq, index) => <FaqComponent key={index} index={index} {...faq} />)
                            }
                    </ul>
                </div>
                <motion.div
                    variants={opacityVariants} 
                    initial="initial" 
                    whileInView="final" 
                    transition={{ duration: .6, delay: .2, ease: "easeInOut" }} 
                    className="h-fit flex bg-gradient-to-b from-gray-900 to-gray-800 text-white rounded-[32px] m-4 md:m-6 py-10 px-8 md:p-10"
                >
                    <div className="w-full max-w-[960px] mx-auto flex flex-col gap-8">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <FiCode size={20} className="text-blue-400" />
                                <span className="font-semibold text-sm md:text-base">Meet the developer</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-semibold">Hi there, I'm <span className="font-bold text-blue-400">Emmanuel Ezema</span>!</h2>
                            <h3 className="mt-2 text-xl md:text-2xl max-w-[32ch] font-[500]">The sole creator of Tekst.</h3>
                        </div>
                        <p className="text-base md:text-lg max-w-[40ch]">
                            <span>As a full-stack developer with 3 years of experience, I was frustrated with the hassle of transferring text between my phone and computer. 
                            </span>
                            <br />
                            <span>That's what inspired me to build Tekst – a simple, secure, and instant way to share text across devices. I designed and developed the entire web app myself and I'm always open to collaborating on new projects. </span>
                            <br />
                            <br />
                            <span>If you find Tekst useful, please consider <span className="text-yellow-400">donating</span> to help me keep improving it!</span>
                        </p>
                        <div className="flex flex-wrap gap-10 mt-6">
                            <a href="https://ezem.netlify.app" className="h-12 rounded-full px-8 flex items-center justify-center bg-blue-600 text-white">
                                <span className="text-base md:text-lg font-semibold">Checkout my website</span>
                            </a>
                            <a target="_blank" href="emmanuelezema6@gmail.com" className="group flex flex-col md:flex-row md:items-center md:justify-center gap-3 text-sm md:text-base">
                                <span className="text-gray-400">Need something like this?</span>
                                <span className="flex items-center gap-1">
                                    <BiSolidMessage size={18} />
                                    <span className="text-white group-hover:underline font-semibold">Hit me up</span>
                                </span>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
            <footer className="lg:min-h-screen flex items-end justify-center pt-40 lg:pt-20 p-6 md:p-10 lg:p-20">
                <div className="my-0 mx-auto w-full max-w-[var(--max-width)] flex flex-col">
                    <div className="flex flex-col lg:flex-row gap-20 lg:gap-4 justify-between items-start mb-20">
                        <a href={import.meta.env.BASE_URL} className="flex items-center w-fit text-gray-800">
                            <img src={logo} className="w-10 h-auto" />
                            <span className="font-bold text-3xl -ml-1 tracking-tight">ekst</span>
                        </a>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 flex-1 w-full lg:max-w-[640px]">
                            <div className="flex flex-col gap-4">
                                <h4 className="text-gray-800 font-semibold tracking-tight text-lg md:text-xl">Link</h4>
                                <ul className="flex flex-col gap-4">
                                    {
                                        [
                                            {
                                                title: "Home",
                                                link: "/"
                                            }, 
                                            {
                                                title: "Explore Spaces",
                                                link: "/spaces",
                                            },
                                            {
                                                title: "Sign up",
                                                link: "/sign-up"
                                            }
                                        ].map(({ title, link }, index) => (
                                            <li key={index} className="">
                                                <Link to={link} className="text-lg md:text-xl font-semibold text-gray-500 tracking-tight">{title}</Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className="flex flex-col gap-4">
                                <h4 className="text-gray-800 font-semibold tracking-tight text-lg md:text-xl">Info</h4>
                                <ul className="flex flex-col gap-4">
                                    {
                                        [
                                            {
                                                title: "GitHub",
                                                link: "https://github.com/ennanuel/text-share-frontend.git",
                                            }, 
                                            {
                                                title: "About Developer",
                                                link: "https://ezem.netlify.app"
                                            }
                                        ].map(({ link, title }, index) => (
                                            <li key={index} className="">
                                                <a href={link} className="text-lg md:text-xl font-semibold text-gray-500 tracking-tight">{title}</a>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className="flex flex-col gap-4">
                                <h4 className="text-gray-800 font-semibold tracking-tight text-lg md:text-xl">Social</h4>
                                <ul className="flex flex-col gap-4">
                                    {
                                        [
                                            {
                                                title: "LinkedIn",
                                                link: "https://linkedin.com/in/ezema-emmanuel"
                                            }, 
                                            {
                                                title: "Instagram",
                                                link: "https://instagram.com/by.ezema"
                                            }, 
                                            {
                                                title: "Twitter",
                                                link: "https://x.com/nnanna-ezema"
                                            }
                                        ].map(({ title, link }, index) => (
                                            <li key={index} className="">
                                                <a target="_blank" href={link} className="text-lg md:text-xl font-semibold text-gray-500 tracking-tight">{title}</a>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 flex flex-col lg:flex-row gap-10 lg:gap-4 justify-between items-start pt-10">
                        <div className="flex flex-col">
                            <span className="text-lg font-normal tracking-tight text-gray-400">All rights reserved.</span>
                            <span className="text-lg font-semibold tracking-tight text-gray-800">©{(new Date()).getFullYear()} Tekst.</span>
                        </div>
                        <div className="flex flex-col md:flex-row gap-10 flex-1 max-w-[640px]">
                            <div className="w-full md:w-fit">
                                <p className="w-auto md:w-[44ch] text-lg text-gray-400 tracking-tight">
                                    <span>Lagos - Nigeria</span><br />
                                    <span className="">Yes, I'm a proud Nigerian. Leave if you want to.</span>
                                </p>
                                <p className="font-semibold text-lg tracking-tight text-[var(--blue)]">Terms and conditions -  Privacy policy</p>
                            </div>

                            <span className="flex flex-col gap-1">
                                <GrGlobe size={20} className="text-[var(--blue)]" />
                                <span className="font-semibold text-lg text-gray-800">English</span>
                            </span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}