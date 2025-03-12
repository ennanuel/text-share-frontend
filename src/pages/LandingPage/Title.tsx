import { motion } from 'framer-motion';
import { IconType } from 'react-icons';

const opacityVariants = {
    initial: { opacity: 0 },
    final: { opacity: 1 },
};

type Props = { 
    title: string; 
    desc: string; 
    subTitle: string; 
    Icon: IconType; 
    iconClassName: string; 
}

export default function Title({ title, desc, subTitle, Icon, iconClassName }: Props) {
    return (
        <div className="flex flex-col items-center justify-center gap-2 text-center">
            <motion.div 
                variants={opacityVariants} 
                initial="initial" 
                whileInView="final" 
                transition={{ 
                    duration: 1, 
                    delay: .3, 
                    ease: "easeInOut"  
                }} 
                className="flex items-center justify-center gap-2"
            >
                <Icon size={18} className={iconClassName} />
                <span className="text-sm font-semibold">{subTitle}</span>
            </motion.div>
            <motion.h3 
                variants={opacityVariants} 
                initial="initial" 
                whileInView="final" 
                transition={{ 
                    duration: 1, 
                    delay: .4, 
                    ease: "easeInOut" 
                }} 
                className="font-bold text-[3rem] md:text-[5rem] leading-[3.5rem] md:leading-[5.5rem] tracking-tight"
            >{title}</motion.h3>
            <motion.p 
                variants={opacityVariants} 
                initial="initial" 
                whileInView="final" 
                transition={{ 
                    duration: 1, 
                    delay: .5, 
                    ease: "easeInOut" 
                }} 
                className="text-base md:text-lg tracking-tight"
            >{desc}</motion.p>
        </div>
    )
}