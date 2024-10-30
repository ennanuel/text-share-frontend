

export default function ColorBackground({ scrolled }: { scrolled: boolean }) {

    return (
        <>
            <div className={`transition-[opacity,transform] duration-500 flex items-center justify-center fixed top-0 left-[50%] h-[100px] w-[700px] ${scrolled ? 'translate-y-[-150%] opacity-0' : 'translate-y-[-60%]'} translate-x-[-50%]`}>
                <span className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] h-full w-full bg-[#5757c6] rounded-[50%] blur-[90px] block">
                </span>
                <span className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] h-[50%] w-[50%] bg-[#4040a7] rounded-[50%] blur-[50px] block">
                </span>
            </div>

            <div className={`transition-[opacity,transform] duration-500 flex items-center justify-center fixed top-[50%] left-0 translate-y-[-50%] h-[300px] w-[100px] ${scrolled ? 'translate-x-[-80%]' : 'translate-x-[-300%] opacity-0'}`}>
                <span className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-full bg-[#981e94] rounded-[50%] blur-[90px] block">
                </span>
                <span className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[50%] h-[50%] bg-[#64237d] rounded-[50%] blur-[50px] block">
                </span>
            </div>

            <div className={`transition-[opacity,transform] duration-500 flex items-center justify-center fixed bottom-0 right-0 translate-y-[50%] h-[300px] w-[100px] ${scrolled ? 'translate-x-[80%]' : 'translate-x-[300%] opacity-0'}`}>
                <span className="absolute top-[50%] right-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-full bg-[#c73232] rounded-[50%] blur-[90px] block">
                </span>
                <span className="absolute top-[50%] right-[50%] translate-x-[-50%] translate-y-[-50%] w-[50%] h-[50%] bg-[#ed6ae7] rounded-[50%] blur-[50px] block">
                </span>
            </div>
        </>
    )
}