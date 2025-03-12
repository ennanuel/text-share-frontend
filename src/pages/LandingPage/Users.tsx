import { BiUser } from "react-icons/bi";
import Title from "./Title";
import { motion } from 'framer-motion';


const opacityVariants = {
    initial: { opacity: 0 },
    final: { opacity: 1 },
};

export default function Users() {

    return (
        
        <div className="min-h-screen py-[160px] p-6 flex flex-col gap-10">
            <Title 
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
    )
}