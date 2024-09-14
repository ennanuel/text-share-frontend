import { AiOutlineArrowRight } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import { FaAngleRight } from "react-icons/fa6";
import { FiCopy, FiLink, FiLock } from "react-icons/fi";
import { HiOutlineDocument } from "react-icons/hi2";
import { MdAdd, MdClose, MdMoreHoriz, MdPerson } from "react-icons/md";


export default function LandingPage() {
    return (
        <div id="landing-page">
            <section className="relative min-h-[100vh] flex gap-20 items-center justify-center px-6 md:px-[10%] overflow-x-clip overflow-y-visible">
                <div className="relative z-[1] flex-1 flex flex-col gap-8">
                    <h1 className="text-[4rem] leading-[4.8rem] font-semibold">Share text.<br />Built for privacy</h1>
                    <p className="text-xl text-gray-600">Build, deploy, and scale your apps with unparalleled ease - from your first user to your billionth.</p>
                    <div className="flex items-center gap-6 mt-6">
                        <button className="group relative h-[60px] md:min-w-[200px] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-full before:bg-gradient-to-br before:from-blue-400 before:to-purple-800 before:blur-xl before:transition-transform before:scale-x-90 before:scale-y-75 before:duration-300 hover:before:scale-110">
                            <span className="relative h-full rounded-full bg-white px-8 flex gap-3 items-center justify-center font-semibold group-hover:text-blue-800 transition-colors">Get Started</span>
                        </button>
                        <button className="group relative h-[60px] md:min-w-[200px] text-white rounded-full flex items-center justify-center gap-3 px-8 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-full before:bg-black before:transition-transform hover:before:scale-110">
                            <span className="font-semibold relative">Sign up</span>
                            <AiOutlineArrowRight size={20} className="relative group-hover:translate-x-2 transition-transform" />
                        </button>
                    </div>
                </div>
                <div className="flex-1 absolute bottom-0 right-0 translate-y-[-100%] opacity-50 md:opacity-100 md:translate-y-0 md:relative flex items-end">
                    <div className="absolute top-[50%] left-[80%] translate-x-[-50%] translate-y-[-70%] before:absolute before:bottom-[-10%] before:left-[-5%] before:h-full before:aspect-square before:rounded-full before:bg-gradient-to-br before:from-pink-400 before:to-purple-600 before:blur-xl before:opacity-50">
                        <div className="relative flex flex-col border border-gray-300 rounded-[20px] overflow-hidden shadow-lg shadow-blue-600/20 ">
                            <div className="bg-gray-800 flex items-center gap-3 px-4 py-3 border-b border-gray-300">
                                <span className="block w-3 h-3 rounded-full bg-red-500"></span>
                                <span className="block w-3 h-3 rounded-full bg-yellow-400"></span>
                                <span className="block w-3 h-3 rounded-full bg-green-500"></span>
                                <span className="border-l border-gray-400 px-3 text-xs text-white flex items-center justify-center gap-3">
                                    <span>Shared text</span>
                                    <MdClose size={14} />
                                </span>
                                </div>
                            <div className="flex p-6 gap-10 bg-[#efefef]">
                                <div className="flex flex-col gap-4">
                                    <span className="text-xl font-bold">Space Title</span>
                                    <ul className="flex items-center gap-2">
                                        <li className="flex items-center gap-2 bg-white pl-1 pr-3 py-1 text-gray-600 rounded-full">
                                            <span className="flex items-center justify-center bg-gray-300 min-w-4 h-4 rounded-full"></span>
                                            <span className="text-xs whitespace-nowrap">User</span>
                                        </li>
                                        <li className="flex items-center gap-2 bg-white pl-1 pr-3 py-1 text-gray-600 rounded-full">
                                            <span className="flex items-center justify-center bg-gray-300 min-w-4 h-4 rounded-full"></span>
                                            <span className="text-xs whitespace-nowrap">1 min. ago</span>
                                        </li>
                                        <li className="flex items-center gap-2 bg-white pl-1 pr-3 py-1 text-gray-600 rounded-full">
                                            <span className="flex items-center justify-center bg-gray-300 min-w-4 h-4 rounded-full"></span>
                                            <span className="text-xs whitespace-nowrap">1 view</span>
                                        </li>
                                    </ul>
                                    <span className="text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam illum sit soluta, </span>
                                    <span className="pl-3 py-1 pr-1 rounded-full bg-white flex items-center gap-2 mt-4">
                                        <span className="text-xs text-gray-400 flex-1">https://www.link.com</span>
                                        <span className="px-3 py-2 flex gap-2 items-center rounded-full bg-black text-white">
                                            <span className="text-xs font-semibold">Copy Link</span>
                                            <FiLink size={12} />
                                        </span>
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="h-[200px] aspect-square block p-3 text-xs bg-white rounded-xl text-gray-600">Text area</span>
                                    <ul className="flex items-center gap-2">
                                        <li><span className="text-xs font-semibold text-gray-400"><span className="text-gray-600">10</span> / 100 words</span></li>
                                        <li><span className="text-xs font-semibold text-gray-400"><span className="text-gray-600">104</span> / 1200 chars.</span></li>
                                    </ul>
                                    <span className="bg-black text-white flex items-center justify-center gap-2 py-2 px-4 rounded-full mt-4">
                                        <span className="text-xs font-semibold">Copy</span>
                                        <FiCopy size={12} />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute top-0 left-0 w-[300px] h-[240px] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-[20px] before:bg-gradient-to-br before:from-pink-300 before:to-purple-400 before:blur-xl before:opacity-50">
                        <div className="relative w-full h-full rounded-[20px] bg-white flex flex-col justify-between gap-4 p-4">
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex flex-col">
                                    <span className="text-xl font-bold">Space Title</span>
                                    <div className="text-xs text-gray-400">Space description</div>
                                </div>
                                <span className="w-8 h-8 rounded-xl border border-gray-300 flex items-center justify-center">
                                    <MdMoreHoriz size={15} />
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="span flex items-center justify-center gap-2">
                                    <span className="w-4 h-4 rounded-full bg-black text-white flex items-center justify-center">
                                        <MdPerson size={12} />
                                    </span>
                                    <span className="text-xs">User</span>
                                </div>
                                <ul className="flex items-center">
                                    <li className="text-xs font-semibold text-gray-400">10 views</li>
                                    <BsDot size={15} className="text-gray-600" />
                                    <li className="text-xs font-semibold text-gray-400">10 mins.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="bg-black mt-[10%] pb-[10%] -mb-20 relative min-h-[100vh] overflow-x-clip overflow-y-visible">
                <section className="relative z-[1] translate-y-[-50%] flex items-center">
                    <span className="block w-[20%] h-[160px] bg-black rounded-full"></span>
                    <ul className=" flex-1 w-[60%] flex gap-6 justify-evenly p-[5%] bg-[#efefef] rounded-full">
                        <li className="hidden md:flex flex-1 flex-col text-center gap-4">
                            <h3 className="text-xl font-bold">49K+</h3>
                            <p className="text-sm text-gray-600">Customers</p>
                        </li>
                        <li className="hidden md:flex flex-1 flex-col text-center gap-4">
                            <h3 className="text-xl font-bold">115+</h3>
                            <p className="text-sm text-gray-600">Regions across AWS, Azure, and Google Cloud</p>
                        </li>
                        <li className="hidden md:flex flex-1 flex-col text-center gap-4">
                            <h3 className="text-xl font-bold">175K+</h3>
                            <p className="text-sm text-gray-600">Developers join every month</p>
                        </li>
                        <li className="hidden md:flex flex-1 flex-col text-center gap-4">
                            <h3 className="text-xl font-bold">#1</h3>
                            <p className="text-sm text-gray-600">Most used modern database</p>
                        </li>
                    </ul>
                    <span className="block w-[20%] h-[160px] bg-gradient-to-b from-[60%] from-black to-[60%] to-transparent rounded-l-[100px]"></span>
                </section>
                <section className="relative flex flex-col gap-20 items-center justify-center p-6 md:p-[10%] mb-[100px] md:mb-0 pt-0 text-white">
                    <div className="absolute bottom-0 right-0 translate-x-[35%] translate-y-[8%] h-[130vh] aspect-square flex-items-center justify-center rounded-full overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full rounded-full bg-gradient-to-br from-purple-600 to-blue-900"></div>
                        <div className="absolute top-[42%] left-[42%] w-[80%] aspect-square rotate-45 translate-x-[-50%] translate-y-[-50%] rounded-full border-l-[40px] border-yellow-400 blur-xl"></div>          
                        <div className="absolute top-[50%] left-[50%] w-[80%] translate-x-[-50%] translate-y-[-50%] aspect-square rounded-full bg-black"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 translate-x-[-50%] translate-y-[30%] h-[80vh] aspect-square flex-items-center justify-center rounded-full overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full rounded-full bg-gradient-to-br from-pink-600 to-blue-900"></div>
                        <div className="absolute top-[50%] left-[55%] w-[80%] aspect-square rotate-45 translate-x-[-50%] translate-y-[-50%] rounded-full border-r-[25px] border-yellow-400 blur-xl"></div>          
                        <div className="absolute top-[50%] left-[50%] w-[80%] translate-x-[-50%] translate-y-[-50%] aspect-square rounded-full bg-black"></div>
                    </div>
                    <div className="flex flex-col md:flex-row w-full justify-center md:justify-between items-center gap-10 md:gap-4 relative">
                        <h2 className="text-4xl font-semibold text-center md:text-start">Unlock the power of AI with MongoDB</h2>
                        <a href="#" className="relative before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-full before:bg-gradient-to-br before:from-blue-600 before:to-purple-800 before:blur-xl before:scale-y-75 before:scale-x-90">
                            <span className="flex relative items-center justify-center px-6 gap-3 h-[50px] rounded-full bg-black">
                                <span className="text-sm font-semibold">Try now</span>
                                <AiOutlineArrowRight size={18} />
                            </span>
                        </a>
                    </div>
                    <ul className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
                        <li className="flex-1 backdrop-blur-xl flex flex-col justify-center items-center text-center gap-10 p-6 aspect-square rounded-[30px] bg-gradient-to-br from-white/5 to-white/10">
                            <span className="bg-black flex items-center justify-center w-[60px] h-[60px] rounded-[16px]">
                                <HiOutlineDocument size={30} />
                            </span>
                            <div className="flex flex-col gap-4">
                                <h3 className="text-sm font-semibold uppercase">Partner Program</h3>
                                <p className="text-gray-400 text-sm">Learn about the MongoDB AI Applications Program and how to get involved.</p>
                            </div>
                        </li>
                        <li className="flex-1 backdrop-blur-xl flex flex-col justify-center items-center text-center gap-10 p-6 aspect-square rounded-[30px] bg-gradient-to-br from-white/5 to-white/10">
                            <span className="bg-black flex items-center justify-center min-w-[60px] h-[60px] rounded-[20px]">
                                <HiOutlineDocument size={30} />
                            </span>
                            <div className="flex flex-col gap-3">
                                <h3 className="text-sm uppercase font-semibold">Case Study</h3>
                                <p className="text-gray-400 text-sm">Discover how Cisco powers secure, responsible artificial intelligence innovation at scale with MongoDB.</p>
                            </div>
                        </li>
                        <li className="flex-1 backdrop-blur-xl flex flex-col justify-center items-center text-center gap-10 p-6 aspect-square rounded-[30px] bg-gradient-to-br from-white/5 to-white/10">
                            <span className="bg-black flex items-center justify-center min-w-[60px] h-[60px] rounded-[20px]">
                                <HiOutlineDocument size={30} />
                            </span>
                            <div className="flex flex-col gap-3">
                                <h3 className="text-sm uppercase font-semibold">Course</h3>
                                <p className="text-gray-400 text-sm">Learn vector search for RAG applications with the new MongoDB and DeepLearning.AI course.</p>
                            </div>
                        </li>
                    </ul>
                </section>
            <section className="bg-black text-white flex flex-col items-center justify-center gap-20 p-6 md:p-[10%]">
                <div className="flex flex-col gap-3 relative">
                    <h2 className="text-[3rem] font-semibold text-center">Built by developers, for developers</h2>
                    <h3 className="text-2xl font-semibold text-gray-400 text-center">The document data model maps to how you think and code.</h3>
                </div>
                <div className="flex flex-col gap-20 md:gap-4 md:flex-row relative">
                    <ul className="flex-1 flex flex-col gap-6">
                        <li className="relative flex flex-col gap-6 py-2 px-8 before:absolute before:top-0 before:left-0 before:w-[3px] before:h-full before:bg-gray-400">
                            <h3 className="text-3xl font-semibold">Model</h3>
                        </li>
                        <li className="relative flex flex-col gap-6 py-2 px-8 before:absolute before:top-0 before:left-0 before:w-[3px] before:h-full before:bg-blue-600">
                            <h3 className="text-3xl font-semibold">Query</h3>
                            <p className="text-gray-400">Use an expressive, developer-native query API to work with data anyway your application needs. Retrieve and modify documents. Prompt LLMs with semantic search across vectors. Aggregate, transform and analyze your data in place, without having to ETL it to another system</p>
                        </li>
                        <li className="relative flex flex-col gap-6 py-2 px-8 before:absolute before:top-0 before:left-0 before:w-[3px] before:h-full before:bg-gray-400">
                            <h3 className="text-3xl font-semibold">Optimize</h3>
                        </li>
                    </ul>
                    <div className="flex-1 flex items-center justify-center">
                            <span className="flex-1 flex flex-col max-w-[400px] aspect-square border border-white/20 bg-white/5 backdrop-blur-xl rounded-[20px] overflow-hidden before:absolute before:bottom-0 before:left-0 before:translate-x-[-50%] before:translate-y-[50%] before:w-[50%] before:aspect-square before:rounded-full before:bg-gradient-to-br before:from-pink-800 before:to-blue-900 before:blur-xl">
                                <div className="relative py-3 px-4 flex items-center gap-3 bg-black border-b border-white/20">
                                    <div className="span block w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="span block w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="span block w-3 h-3 rounded-full bg-green-500"></div>
                                    <span className="flex items-center gap-3 px-3 border-l border-gray-400 text-gray-300">
                                        <span className="text-xs">Create new space</span>
                                        <MdClose size={12} />
                                    </span>
                                </div>
                                <div className="relative flex flex-col gap-4 flex-1 p-6">
                                    <div className="flex flex-col">
                                        <span className="font-semibold">Title</span>
                                        <span className="text-xs text-gray-400">description</span>
                                    </div>
                                    <ul className="flex items-center gap-2 border-b border-white/20">
                                        <li className="relative flex px-3 pb-2 text-xs before:absolute before:bottom-[-1px] before:left-0 before:w-full before:h-[3px] before:bg-white">Basic</li>
                                        <li className="relative flex px-3 pb-2 text-xs text-gray-400">Advanced</li>
                                    </ul>
                                    <div className="flex-1 flex flex-col gap-2">
                                        <input type="text" value="Space title" className="text-xs text-gray-400 bg-transparent px-3 py-2 rounded-full border border-white/20" />
                                        <textarea name="" id="" value="Space content..." className="text-xs text-gray-400 flex-1 p-3 rounded-[20px] border border-white/20 bg-transparent"></textarea>
                                    </div>
                                    <button className="p-[1px] bg-gradient-to-br rounded-full">
                                        <span className="flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-black">
                                            <span className="text-xs font-semibold">Create new</span>
                                            <MdAdd size={12} />
                                        </span>
                                    </button>
                                </div>
                            </span>
                    </div>
                </div>
                </section>
                <section className="p-6 py-[100px] md:py-[5%] md:p-[5%] relative rounded-[100px] rounded-tl-none bg-[#efefef] flex flex-col gap-20 overflow-clip">
                    <div className="absolute top-0 right-0 translate-x-[20%] translate-y-[20%] h-[130vh] aspect-square flex-items-center justify-center rounded-full overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full rounded-full bg-gradient-to-br from-purple-400 to-blue-600"></div>
                        <div className="absolute top-[42%] left-[42%] w-[80%] aspect-square rotate-45 translate-x-[-50%] translate-y-[-50%] rounded-full border-l-[30px] border-yellow-300 blur-xl"></div>          
                        <div className="absolute top-[50%] left-[50%] w-[80%] translate-x-[-50%] translate-y-[-50%] aspect-square rounded-full bg-[#efefef]"></div>
                    </div>
                    <div className="relative flex justify-between gap-10">
                        <div className="flex flex-col">
                            <h2 className="text-[3rem] font-semibold">Still not sold?</h2>
                            <h3 className="text-2xl md:text-3xl font-semibold text-gray-400">Check out what you'll be getting in on.</h3>
                        </div>
                        <button className="group relative hidden md:flex items-center justify-center gap-4 px-8 hover:text-blue-600">
                            <text className="relative text-lg font-semibold">Try out now</text>
                            <FaAngleRight size={20} className="relative transition-transform group-hover:translate-x-2" />
                        </button>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <li className="flex-1 flex flex-col justify-between gap-4 p-8 aspect-square rounded-[30px] border border-gray-400 backdrop-blur-xl">
                            <span className="w-[60px] h-[60px] rounded-[20px] bg-white flex items-center justify-center">
                                <FiLock size={20} />
                            </span>
                            <h3 className="text-2xl font-semibold">Docs</h3>
                            <p className="text-sm text-gray-600 flex-1">Reference manuals, articles, and code samples — all the technical documentation you need to deploy, configure, and run MongoDB.</p>
                            <a href="#" className="group flex items-center gap-3 hover:text-blue-600">
                                <span className="font-semibold">Check out</span>
                                <AiOutlineArrowRight size={20} className="transition-transform group-hover:translate-x-2" />
                            </a>
                        </li>
                        <li className="flex-1 flex flex-col justify-between gap-4 p-8 aspect-square rounded-[30px] border border-gray-400 backdrop-blur-xl">
                            <span className="w-[60px] h-[60px] rounded-[20px] bg-white flex items-center justify-center">
                                <FiLock size={20} />
                            </span>
                            <h3 className="text-2xl font-semibold">Developer Center</h3>
                            <p className="text-sm text-gray-600 flex-1">The latest MongoDB tutorials, videos, and code examples shown in the language of your choice.</p>
                            <a href="#" className="group flex items-center gap-3 hover:text-blue-600">
                                <span className="font-semibold">Check out</span>
                                <AiOutlineArrowRight size={20} className="transition-transform group-hover:translate-x-2" />
                            </a>
                        </li>
                        <li className="flex-1 flex flex-col justify-between gap-4 p-8 aspect-square rounded-[30px] border border-gray-400 backdrop-blur-xl">
                            <span className="w-[60px] h-[60px] rounded-[20px] bg-white flex items-center justify-center">
                                <FiLock size={20} />
                            </span>
                            <h3 className="text-2xl font-semibold">Community Forum</h3>
                            <p className="text-sm text-gray-600 flex-1">Join 175K+ developers on our Community Forums to get advice, learn tips and tricks, and share your projects and experience.</p>
                            <a href="#" className="group flex items-center gap-3 hover:text-blue-600">
                                <span className="font-semibold">Check out</span>
                                <AiOutlineArrowRight size={20} className="transition-transform group-hover:translate-x-2" />
                            </a>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    )
}