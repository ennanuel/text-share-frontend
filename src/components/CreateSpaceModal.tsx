import { useContext, useRef, useState } from "react";

import { BsDot } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import { MdClose, MdCheck } from "react-icons/md";
import { VscEye } from "react-icons/vsc";
import { createModalContext } from "./Layout";

const COLOR_OPTIONS = [
    {
        background: "bg-red-400",
        value: "red"
    },
    {
        background: "bg-orange-400",
        value: "orange"
    },
    {
        background: "bg-yellow-400",
        value: "yellow"
    },
    {
        background: "bg-green-400",
        value: "green"
    },
    {
        background: "bg-blue-400",
        value: "blue"
    },
    {
        background: "bg-purple-400",
        value: "purple"
    }
]


export default function CreateSpaceModal() {
    const dialogRef = useRef<HTMLDivElement>(null);
    const { showCreateModal, closeCreateModal } = useContext(createModalContext);

    const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
    const [{ title, content, color, secure, password }, setValues] = useState({ title: "", content: "", color: "", secure: false, password: "" });

    const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
        if (!event?.target) return;
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    }

    const handleClick: React.MouseEventHandler<HTMLDialogElement> = (event) => {
        const rect = dialogRef.current?.getBoundingClientRect();
        if (!rect) return;

        const isWithinDialog = event.clientX >= rect.left && event.clientX <= (rect.left + rect.width) && event.clientY >= rect.top && event.clientY <= (rect.top + rect.height);
        if (!isWithinDialog) closeCreateModal();
    };


    return (
        <dialog onClick={handleClick} className={`${showCreateModal ? '' : 'pointer-events-none opacity-0'} transition-opacity duration-300 fixed flex z-[9999] items-center justify-center top-0 left-0 min-w-[100vw] min-h-[100vh] backdrop-blur p-0 m-0 bg-black/20`}>
            <div ref={dialogRef} className={`${showCreateModal ? 'delay-100 origin-top' : 'opacity-0 scale-y-50 scale-x-75 origin-bottom'} transition-[opacity,transform] duration-300 bg-white rounded-[30px] shadow-lg shadow-blaxk/20`}>
                <div className={`flex-1 transition-opacity ${showCreateModal ? 'delay-300 duration-300' : 'opacity-0'} relative flex flex-col gap-4 w-[500px] min-h-[500px]`}>
                    <div className="flex justify-between gap-4 mt-6 pl-8 pr-6">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-2xl font-bold">New space</h2>
                            <p className="text-sm text-gray-400">Create a new text space</p>
                        </div>
                        <button onClick={closeCreateModal} className="flex items-center justify-center w-[40px] h-[40px] rounded-[15px] hover:bg-red-200 hover:border-transparent hover:text-red-600 focus:outline-none transition-colors">
                            <MdClose size={20} />
                        </button>
                    </div>
                    <ul className="relative flex mx-8 border-b border-gray-300 gap-[10px]">
                        <span className={`absolute flex h-[4px] rounded-full bg-black px-2 left-0 bottom-[-2px] transition-transform duration-300 ${showAdvancedOptions ? 'translate-x-[calc(100%_+_10px)]' : ''}`}>
                            <span className="opacity-0 font-semibold text-sm">{showAdvancedOptions ? 'Advanced' : 'Basic Info'}</span>
                        </span>
                        <li>
                            <button onClick={() => setShowAdvancedOptions(false)} className={`${showAdvancedOptions ? 'text-gray-400 hover:text-black' : ''} relative flex p-2 items-center justify-center`}>
                                <span className="font-semibold text-sm">Basic Info</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setShowAdvancedOptions(true)} className={`${!showAdvancedOptions ? 'text-gray-400 hover:text-black' : ''} relative flex p-2 items-center justify-center`}>
                                <span className="font-semibold text-sm">Advanced</span>
                            </button>
                        </li>
                    </ul>
                    <form action="" className="relative flex-1 flex flex-col gap-6 mx-8 pb-6 pt-2 overflow-clip">
                        <div className={`absolute top-0 left-0 h-full w-full flex-1 flex flex-col gap-6 ${showAdvancedOptions ? '' : 'translate-x-[105%] opacity-0'} transition-[opacity,transform] duration-300`}>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold">Color</span>
                                <span className="text-xs text-gray-400">Select a color display when viewing space</span>
                                <ul className="flex flex-wrap gap-2 mt-4">
                                    {
                                        COLOR_OPTIONS.map(({ background, value }, index) => (
                                            <li key={index} className={`relative ${background} hover:scale-105 transition-transform rounded-full overflow-clip`}>
                                                <input type="radio" name="color" onChange={handleChange} value={value} className="peer absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" />
                                                <span className="peer-checked:opacity-100 opacity-0 transition-opacity pointer-events-none flex items-center justify-center w-[30px] aspect-square bg-black/50 text-white">
                                                    <MdCheck size={16} />
                                                </span>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className="relative flex flex-col gap-5">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold">Security</span>
                                        <span className="text-xs text-gray-400">Setup security for your space so it can't be easily accessed</span>
                                    </div>
                                    <button type="button" onClick={() => setValues(prev => ({ ...prev, secure: !secure }))} className={`${secure ? 'border-blue-300' : 'border-gray-300'} group block p-[3px] h-[30px] w-[50px] rounded-full border transition-[border-color]`}>
                                        <span className={`${secure ? 'bg-blue-400 translate-x-[20px]' : 'bg-gray-400'} block h-full aspect-square rounded-full transition-[transform,background-color]`}></span>
                                    </button>
                                </div>
                                <div className={`${secure ? '' : 'opacity-0 pointer-event-none'} transition-opacity flex items-center border border-gray-200 rounded-full pr-[5px] has-[input:focus]:border-black`}>
                                    <input type="password" value={password} onChange={handleChange} name="password" placeholder="Passcode" className="h-[40px] text-sm flex-1 px-4 rounded-l-full bg-transparent focus:outline-none" />
                                    <button className="flex items-center justify-center w-[30px] aspect-square rounded-full bg-gray-200 text-gray-400">
                                        <VscEye size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    
                        <div className={`flex-1 flex flex-col gap-4 transition-[opacity,transform] duration-300 ${showAdvancedOptions ? 'translate-x-[-105%] opacity-0' : ''}`}>
                            <div className="flex flex-col gap-2">
                                <input type="text" value={title} onChange={handleChange} name="title" placeholder="Space Title" className="text-sm h-[40px] rounded-full border border-gray-200 px-4 block w-full" />
                            </div>
                            <div className="flex flex-col gap-1 flex-1">
                                <textarea value={content} name="content" onChange={handleChange} placeholder="Input text you want to share here." className="text-sm flex-1 rounded-[20px] border border-gray-200 p-4 block w-full"></textarea>
                                <ul className="flex items-center text-gray-400">
                                    <li>
                                        <span className="text-xs font-semibold"><span className="text-gray-600">20</span> / 100 words</span>
                                    </li>
                                    <BsDot size={16} />
                                    <li>
                                        <span className="text-xs font-semibold"><span className="text-gray-600">150</span> / 2050 chars.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    
                        <button className="group btn relative flex items-center justify-center gap-2 w-[90%] m-auto">
                            <span className="font-semibold text-sm relative">Create space</span>
                            <FaArrowRight size={16} className="relative group-hover:translate-x-2 transition-transform" />
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}
