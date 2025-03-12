import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { MdAdd } from 'react-icons/md';



type Props = {
    selectSectionWhileInView: (index: number) => void;
};

const QUESTIONS_AND_ANSWERS = [
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

const opacityVariants = {
    initial: { opacity: 0 },
    final: { opacity: 1 },
};

const EASE = [0.16, 1, .3, 1];
const TRANSITION = { duration: 1, ease: EASE };

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

export default function FAQs({ selectSectionWhileInView }: Props) {

    return (
        
        <motion.div id="faqs" onViewportEnter={() => selectSectionWhileInView(3)} className="lg:min-h-screen py-[160px] mb-[200px] p-6 flex flex-col gap-10">
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
                className="font-bold tracking-tight text-[3rem] md:text-[5rem] leading-[5.5rem] mb-2"
            >Answers</motion.h3>
        </div>
        <ul className="flex flex-col max-w-[600px] mt-10 w-full mx-auto gap-2">
                {
                    QUESTIONS_AND_ANSWERS.slice(0, 4).map((faq, index) => <FaqComponent key={index} index={index} {...faq} />)
                }
        </ul>
    </motion.div>
    )
}