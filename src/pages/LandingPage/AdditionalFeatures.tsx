import { motion } from 'framer-motion';
import Title from './Title';
import { IoDocumentTextOutline, IoListOutline } from 'react-icons/io5';
import { TbStack2 } from 'react-icons/tb';
import { GrSecure } from 'react-icons/gr';
import { useMemo } from 'react';
import FirstAdditionalFeature from './FirstAdditionFeature';
import SecondAdditionFeature from './SecondAdditionFeature';
import ThirdAdditionFeature from './ThirdAdditionalFeature';
import { IconType } from 'react-icons';


type Props = {
    selectSectionWhileInView: (index: number) => void;
}

const ADDITIONAL_FEATURES = [
    {
        Component: FirstAdditionalFeature,
        Icon: TbStack2,
        iconClassName: "text-yellow-400",
        className: "bg-[#202020] text-white",
        title: "Tekst spaces",
        subTitle: "Streamlined Management",
        desc: "A simple and intuitive interface makes managing your Tekst Spaces a breeze."
    },
    {
        Component: SecondAdditionFeature,
        Icon: IoListOutline,
        iconClassName: "text-blue-400",
        className: "bg-gradient-to-b from-[#e5edf6] to-blue-200 text-gray-800",
        title: "Favorites",
        subTitle: "Personalized Space List",
        desc: "Mark your favorite Tekst Spaces for instant access and organization."
    },
    {
        Component: ThirdAdditionFeature,
        Icon: GrSecure,
        iconClassName: "text-yellow-400",
        className: "bg-gradient-to-b from-blue-600 to-blue-700 text-white",
        title: "Advanced options",
        subTitle: "Control and Security",
        desc: "Protect your sensitive information with password-protected spaces and other security options."
    }
];

const opacityVariants = {
    initial: { opacity: 0 },
    final: { opacity: 1 },
};

function DemoComponent({ iconClassName, Icon, Component, className, subTitle, title, desc, index }: { className: string; Icon: IconType; Component: () => JSX.Element; iconClassName: string; subTitle: string; title: string; desc: string; index: number; }) {
    const offsetY = useMemo(() => `${160 + (32 * index)}px`, []);

    return (
        <motion.div 
            variants={opacityVariants}
            initial="initial"
            whileInView="final"
            transition={{ duration: .6, delay: .3, ease: "easeInOut" }}
            style={{ top: offsetY, minHeight: `calc(110vh - ${offsetY})` }} 
            className={`${className} p-6 sm:sticky flex-1 flex flex-col gap-10 sm:gap-0 lg:flex-row mx-auto mt-20 pb-20 w-full max-w-[1240px] col-span-1 row-span-2 rounded-[32px] after:absolute after:top-0 after:left-1/2 after:-translate-x-1/2 after:h-2 after:w-1/2 after:rounded-b-full after:bg-[var(--purple)] overflow-clip`}
        >
            <div className="flex-1 flex items-center justify-center">
                <Component />
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

export default function AdditionalFeatures({ selectSectionWhileInView }: Props) {
    return (
        <motion.div id="how-it-works" onViewportEnter={() => selectSectionWhileInView(2)} className="min-h-screen py-[160px] p-6 flex flex-col gap-10">
            <Title 
                subTitle="Easy management" 
                title="Monitor shared spaces" 
                desc="Organize and manage your spaces." 
                Icon={IoDocumentTextOutline} 
                iconClassName="text-blue-600"
            />
            {
                ADDITIONAL_FEATURES.map((demo, index) => <DemoComponent key={index} {...demo} index={index} />)
            }
        </motion.div>
    )
}