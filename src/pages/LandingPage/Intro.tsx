import { motion } from 'framer-motion';



type Props = {
    selectSectionWhileInView: (index: number) => void;
}

const opacityVariants = {
    initial: { opacity: 0 },
    final: { opacity: 1 },
};

export default function Intro({ selectSectionWhileInView }: Props) {

    return (
        <motion.div onViewportEnter={() => selectSectionWhileInView(0)} className="p-6 flex flex-col gap-20 md:gap-8 min-h-[80vh] items-center justify-center pt-[64px]">
            <h1 className="text-center tracking-tighter font-bold text-[2rem] leading-[2.5rem] sm:text-[3rem] sm:before:leading-[4rem] md:text-[5rem] md:leading-[5.5rem] max-w-[16ch]">
                <motion.span variants={opacityVariants} initial="initial" whileInView="final" transition={{ duration: 1, delay: .2, ease: "easeInOut" }}> Text Sharing Shouldn't be a Chore</motion.span>
            </h1>
            <p className="mt-2 font-semibold tracking-tight text-2xl max-w-[60ch] text-center">
                <motion.span variants={opacityVariants} initial="initial" whileInView="final" transition={{ duration: 1, delay: .4, ease: "easeInOut" }}>Whatever device you own, there's <span className="text-[var(--blue)]">Tekst</span>.<br/> Text sharing at your fingertips.</motion.span>
            </p>
        </motion.div>
    )
}