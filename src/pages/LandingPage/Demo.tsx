
import { motion } from 'framer-motion';
import { LiaTelegramPlane } from 'react-icons/lia';

import Title from './Title';
import { useEffect, useState } from 'react';

type Props = {
    selectSectionWhileInView: (index: number) => void;
}


const DEMOS = [
    {
        title: "Create Your Space",
        description: "Need to quickly share a note, code snippet, or a block of text between your phone, laptop, or tablet?\n Create a Tekst Space.",
        media: "",
        background:  "bg-blue-200",
        text: "text-blue-900"
    },
    {
        title: "Easy Sharing",
        description: "Get a simple link to your space and share it however you like.",
        media: "",
        background: "bg-yellow-200",
        text: "text-yellow-900"
    },
    {
        title: "Universal Access",
        description: "View your shared text on any device with a web browser – no more emailing yourself or copying and pasting",
        media: "",
        background: "bg-purple-200",
        text: "text-purple-900"
    },
];

export default function Demo({ selectSectionWhileInView }: Props) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => { setIsMobile(window.innerWidth <= 768)}, []);;

    return (
        <motion.div id="features" onViewportEnter={() => selectSectionWhileInView(1)} className="min-h-screen pt-[160px] overflow-hidden pb-40 flex flex-col">
            <Title 
                subTitle="Create a Tekst space" 
                title="Save time" 
                desc="Simplify the sharing process." 
                Icon={LiaTelegramPlane} 
                iconClassName="text-blue-600"
            />
            <div>
                <ul className="px-4 sm:px-6 md:px-10 lg:px-20 mt-40 flex flex-col md:flex-row flex-wrap justify-center w-full gap-4">
                    {
                        DEMOS.map(({ title, description, background, text }, index) => (
                            <motion.li 
                                drag={!isMobile}
                                dragConstraints={{ left: -80, top: -200, right: 200, bottom: 80 }}
                                initial={{ opacity: 0, y: '20%', rotate: '0deg' }} 
                                whileInView={{ opacity: 1, y: '0%', rotate: index % 2 === 0 ? '-6deg' : '6deg'}}
                                transition={{ duration: 2, ease: [.16, 1, .3, 1], delay: (index / 10) }}
                                key={index} 
                                className={`${background} ${text} ${index % 2 === 0 ? 'md:-rotate-6' : 'md:rotate-6'} w-full md:max-w-[320px] md:min-w-[280px] flex-1 rounded-[40px] overflow-hidden shadow-md shadow-black/10`}
                            >
                                <div className="relative w-full min-h-[320px] flex flex-col gap-6 p-6">
                                    <span className='font-bold text-[8rem] sm:text-[10rem] md:text-[12rem] leading-[8rem] sm:leading-[10rem] md:leading-[12rem] block absolute -bottom-4 -right-6 opacity-20'>{`${index < 10 ? `0${index+1}` : index + 1}`}</span>
                                    <h4 className='relative font-semibold text-3xl'>{title}</h4>
                                    <p className='relative text-sm opacity-50 max-w-[30ch]'>{description}</p>
                                </div>
                            </motion.li>
                        ))
                    }
                </ul>
            </div>
        </motion.div>
    )
}