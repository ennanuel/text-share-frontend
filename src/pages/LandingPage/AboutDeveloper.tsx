import { motion } from 'framer-motion';
import { BiSolidMessage } from 'react-icons/bi';
import { FiCode } from 'react-icons/fi';



const opacityVariants = {
    initial: { opacity: 0 },
    final: { opacity: 1 },
};

export default function () {
    return (
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
                    <a href="https://ezema.netlify.app" className="h-12 rounded-full px-8 flex items-center justify-center bg-blue-600 text-white">
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
    )
}