
import { motion, useMotionValue } from 'framer-motion';
import { useRef } from 'react';
import { MdDevices } from 'react-icons/md';
import { LiaRunningSolid } from 'react-icons/lia';
import { GoLock, GoThumbsup } from 'react-icons/go';
import { PiPassword } from 'react-icons/pi';
import { IconType } from 'react-icons';

import Title from "./Title";

import phoneImage from "../../assets/images/phone-text-space.png";


const VALUES = [
    {
        Icon: LiaRunningSolid,
        title: "Instant Access",
        desc: "Quickly share text between your devices.",
    },
    {
        Icon: GoThumbsup,
        title: "Effortless Sharing",
        desc: "Simple and easy to use, no technical skills required.",
    },
    {
        Icon: PiPassword,
        title: "Your Data, Your Control",
        desc: "Protect your text with encryption and optional passwords.",
    },
    {
        Icon: GoLock,
        title: "Private & Anonymous",
        desc: "Anonymous sharing with automatic 24-hour deletion.",
    },
]
const opacityVariants = {
    initial: { opacity: 0 },
    final: { opacity: 1 },
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
            style={{ perspective: '1000px', gridArea: `rotating-block-${index}` }}
            variants={opacityVariants}
            initial="initial"
            whileInView="final"
            transition={{ duration: .6, delay: .2, ease: "easeInOut" }}
        >
            <motion.div style={{ transform: rotate, willChange: 'transform', transformStyle: 'preserve-3d' }} className="hover:transition-none transition-transform h-full w-full flex flex-col p-6 gap-4 items-start border border-gray-300 bg-white rounded-[32px]">
                <Icon size={40} className="text-[var(--blue)]" />
                <h4 className="font-semibold text-2xl">{title}</h4>
                <span className="text-gray-400 text-sm">{desc}</span>
            </motion.div>
        </motion.div>
    )
};

export default function Features() {

    return (
        
        <div className="min-h-screen pt-[160px] pb-10 px-4 md:px-10 flex flex-col gap-20">
            <Title 
                subTitle="Easy and secure" 
                title="Features for you" 
                desc="Share text without any hassle." 
                Icon={MdDevices} 
                iconClassName="text-blue-600"
            />
            <div className="flex-1 rotating-blocks-container-sm md:rotating-blocks-container-md lg:rotating-blocks-container-lg grid gap-4 mx-auto max-w-[1032px]">
                <div className="phone-image-container relative group min-h-[480px] md:min-h-[560px] lg:min-h-[400px] flex items-stretch justify-center col-span-1 row-span-2 bg-[#202020] rounded-[40px] lg:rounded-[64px] after:absolute after:top-0 after:left-1/2 after:-translate-x-1/2 after:h-2 after:w-1/2 after:rounded-b-full after:bg-[var(--purple)] overflow-clip">
                    <div className="relative h-full flex w-full">
                        <img src={phoneImage} className="absolute top-10 left-1/2 -translate-x-1/2 translate-y-16 group-hover:translate-y-0 transition-transform ease-expo duration-1000 w-full max-w-[320px] md:max-w-[360px] lg:max-w-[280px]" alt="mobile phone image" />
                    </div>
                </div>
                {
                    VALUES.map((value, index) => (
                        <RotatingBlock key={index} index={index} {...value} />
                    ))
                }
            </div>
        </div>
    )
}