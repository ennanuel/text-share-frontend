
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import laptopImage from "../../assets/images/laptop-text-spaces.png";
import phoneImage from "../../assets/images/phone-text-space.png";


const EASE = [0.16, 1, .3, 1];
const TRANSITION = { duration: 1, ease: EASE };

export default function DeviceDemo() {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress: devicesScrollYProgress } = useScroll({ 
        target: ref, 
        offset: ["start start", "start 150vh"] 
    });

    const devicesTranslateY = useTransform(devicesScrollYProgress, [1, 0], [0, 200]);
    const devicesScale = useTransform(devicesScrollYProgress, [1, 0], [1, 0.7]);

    return (
        
        <motion.div 
            ref={ref} 
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
    )
}