import { useContext, useMemo, useRef, useState } from "react";

import { BsDot } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import { MdClose, MdCheck } from "react-icons/md";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

import Loading from "./Loading";
import ToggleKeyboardButton from "./Keyboard/ToggleKeyboardBtn";

import { fetchOptions } from "../assets/data";

import { createTextSpaceModalContext } from "./Layout";
import { keyboardContext } from "./Keyboard";
import { ModifiedError } from "../types/error.type";
import { CREATED_NEW_TEXT_SPACE_TOAST_ID, TEXT_SPACE_COLOR_OPTIONS } from "../assets/constants";
import { Slide, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { TbAlertCircleFilled } from "react-icons/tb";


export default function CreateSpaceModal() {
    const navigate = useNavigate();
    const dialogRef = useRef<HTMLDivElement>(null);
    
    const { showKeyboard, idOfInputInFocus, closeKeyboard } = useContext(keyboardContext)
    const moveModal = useMemo(() => showKeyboard && (idOfInputInFocus == 'space_content' || idOfInputInFocus == 'space_password'), [idOfInputInFocus]);

    const { showCreateTextSpaceModal, closeCreateTextSpaceModal } = useContext(createTextSpaceModalContext);

    const [isSecured, setIsSecured] = useState(false);
    const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string; } | null>(null);


    const close = () => {
        closeCreateTextSpaceModal();
        closeKeyboard();
    };

    const removeError = (key: string) => setErrors(prev => {
        if (!prev) return null;
        const newValues = { ...prev };
        delete newValues[key];
        return newValues;
    });

    const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
        if (!event?.target) return;
        removeError(event.target.name);
    };

    const toggleSecured: React.MouseEventHandler<HTMLButtonElement> = () => {
        setIsSecured(!isSecured);
        removeError('password');
    };

    const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
        const rect = dialogRef.current?.getBoundingClientRect();
        if (!rect) return;

        const isWithinDialog = event.clientX >= rect.left && event.clientX <= (rect.left + rect.width) && event.clientY >= rect.top && event.clientY <= (rect.top + rect.height);
        if (!isWithinDialog) close();
    };

    async function handleSubmit (event: React.FormEvent<HTMLFormElement>){
        try {
            event.preventDefault();
            setErrors(null);
            setLoading(true);
            closeKeyboard();

            if (!event.target) return;

            const form = event.target as HTMLFormElement;
            const formData = new FormData(form);

            const data = Object.fromEntries(formData);
            const body = JSON.stringify({ ...data, secured: data?.secured === 'true' });

            const url = `${import.meta.env.VITE_SERVER_URL}/spaces/create`;
            const options = {
                ...fetchOptions,
                method: "POST",
                body
            };

            const response = await fetch(url, options);
            const result = await response.json();
            if (response.status !== 200) throw result;
            
            closeCreateTextSpaceModal();
            closeKeyboard();
            setShowAdvancedOptions(false);
            form.reset();
            toast.success('New text space created!', {
                toastId: CREATED_NEW_TEXT_SPACE_TOAST_ID,
                position: "bottom-left",
                autoClose: 5000,
                pauseOnHover: false,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });

            navigate(`/space/${result.textSpaceId}`);
        } catch (error) {
            console.error((error as ModifiedError).message);
            setErrors((error as ModifiedError).errors);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div
            onClick={handleClick}
            className={`${showCreateTextSpaceModal ? '' : 'pointer-events-none opacity-0'} transition-opacity duration-300 fixed flex z-[9999] items-center justify-center top-0 left-0 min-w-[100vw] h-[100vh] backdrop-blur p-4 m-0 bg-black/20`}
        >
            <div
                ref={dialogRef}
                className={`${showCreateTextSpaceModal ? 'delay-100 origin-top' : 'opacity-0 scale-y-50 scale-x-75 origin-bottom'} ${moveModal && 'translate-y-[-50%]'} transition-[opacity,transform] duration-300 bg-white rounded-[30px] shadow-lg w-full max-w-[500px] overflow-clip`}
            >
                <div className={`flex-1 transition-opacity ${showCreateTextSpaceModal ? 'delay-300 duration-300' : 'opacity-0'} relative flex flex-col w-full min-h-[500px]`}>
                    <div className={`${loading ? '' : 'opacity-0 pointer-events-none'} transition-opacity absolute z-10 top-0 left-0 w-full h-full bg-white/80 backdrop-blur flex items-center justify-center`}>
                        <Loading text="Creating new space..." />
                    </div>
                    <div className="flex justify-between gap-4 mt-6 pl-8 pr-6">
                        <h2 className="text-2xl font-bold">Create text space</h2>
                        <button onClick={close} className="relative z-10 flex items-center justify-center w-[40px] h-[40px] rounded-full hover:bg-red-100/50 hover:border-transparent hover:text-red-400 focus:outline-none transition-colors">
                            <MdClose size={20} />
                        </button>
                    </div>
                    {
                        errors ? 
                            <div className="relative overflow-clip flex items-center gap-4 p-3 px-4 mx-8 mt-4 bg-red-100/50 rounded-xl text-red-500 before:absolute before:top-0 before:left-0 before:h-full before:w-[6px] before:bg-red-500 border border-red-200/50">
                                <TbAlertCircleFilled size={14} />
                                <span className="text-xs">Could not create new text space!</span>
                            </div> :
                            null
                    }
                    <ul className="relative flex mx-8 border-b border-gray-300 gap-[10px] mt-4">
                        <span className={`absolute flex h-[4px] rounded-t-full bg-gray-800 px-2 left-0 bottom-[-2px] transition-transform duration-300 ${showAdvancedOptions ? 'translate-x-[calc(100%_+_10px)]' : ''}`}>
                            <span className="opacity-0 font-semibold text-sm">{showAdvancedOptions ? 'Advanced' : 'Basic Info'}</span>
                        </span>
                        <li>
                            <button onClick={() => setShowAdvancedOptions(false)} className={`${showAdvancedOptions ? 'text-gray-400 hover:text-gray-600' : 'text-gray-800'} relative flex p-2 items-center justify-center`}>
                                <span className="font-semibold text-sm">Basic Info</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setShowAdvancedOptions(true)} className={`${!showAdvancedOptions ? 'text-gray-400 hover:text-gray-600' : 'text-gray-800'} relative flex p-2 items-center justify-center`}>
                                <span className="font-semibold text-sm">Advanced</span>
                            </button>
                        </li>
                    </ul>
                    <form action="" onSubmit={handleSubmit} className="relative flex-1 flex flex-col mx-8 mb-6 overflow-clip">
                        <div className={`absolute top-0 left-0 h-[calc(100%_-_60px)] overflow-y-auto w-full flex-1 flex flex-col gap-6 ${showAdvancedOptions ? '' : 'translate-x-[105%] opacity-0'} transition-[opacity,transform] duration-300 py-6`}>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-gray-800">Color</span>
                                <span className="text-xs text-gray-400">Select a color display when viewing space</span>
                                <ul className="flex flex-wrap gap-2 mt-4">
                                    {
                                        TEXT_SPACE_COLOR_OPTIONS.map(({ background, value }, index) => (
                                            <li key={index} className={`relative ${background} hover:scale-105 transition-transform rounded-full overflow-clip`}>
                                                <input
                                                    type="radio"
                                                    name="color"
                                                    onChange={handleChange}
                                                    value={value}
                                                    className="peer absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                                />
                                                <span className="peer-checked:opacity-100 opacity-0 transition-opacity pointer-events-none flex items-center justify-center w-[30px] aspect-square bg-black/50 text-white">
                                                    <MdCheck size={16} />
                                                </span>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="space_desc" className="text-sm font-semibold text-gray-800">Description</label>
                                <span className="text-xs text-gray-400">Add additional description for Text space</span>
                                <div className="relative mt-4">
                                    <textarea
                                        name="desc"
                                        id="space_desc"
                                        onChange={handleChange}
                                        className={`flex-1 rounded-[20px] border p-4 text-sm h-[140px] w-full ${errors?.desc ? 'border-red-400 text-red-500 placeholder:text-red-400' : 'border-gray-200 focus:border-gray-600'} focus:outline-none`}
                                    ></textarea>
                                    <span className="absolute right-4 bottom-4 block">
                                        <ToggleKeyboardButton inputId="space_desc" />
                                    </span>
                                </div>
                                {
                                    errors?.desc ?
                                        <span className="text-xs text-red-500 px-4">{errors?.desc}</span> :
                                        null
                                }
                            </div>
                            <div className="relative flex flex-col gap-5">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold">Security</span>
                                        <span className="text-xs text-gray-400">Setup security for your space so it can't be easily accessed</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={toggleSecured}
                                        className={`${isSecured ? 'border-blue-300' : 'border-gray-300'} group block p-[3px] w-full h-[30px] max-w-[50px] rounded-full border transition-[border-color]`}
                                    >
                                        <span className={`${isSecured ? 'bg-blue-400 translate-x-[20px]' : 'bg-gray-400'} block h-full aspect-square rounded-full transition-[transform,background-color]`}></span>
                                    </button>
                                </div>
                                <div className={`flex flex-col gap-1 transition-opacity ${isSecured ? '' : 'opacity-0 pointer-events-none'}`}>
                                    <div className={`flex items-center border ${errors?.password ? 'border-red-200 has-[input:focus]:border-red-400' : 'border-gray-200'} rounded-full pr-[5px] has-[input:focus]:border-black`}>
                                        <input name="secured" id="is_secured" type="hidden" value={isSecured ? 'true' : 'false'} />
                                        <input
                                            id="space_password"
                                            type={showPassword ? "text" : "password"}
                                            onChange={handleChange}
                                            name="password"
                                            placeholder="Passcode"
                                            className={`${errors?.password ? 'text-red-500 placeholder:text-red-400' : ''} h-[40px] text-sm flex-1 px-4 rounded-l-full bg-transparent focus:outline-none`}
                                        />
                                        <ToggleKeyboardButton inputId="space_password" />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="flex ml-2 items-center justify-center w-[30px] aspect-square rounded-full bg-gray-200 text-gray-400"
                                        >
                                            {showPassword ? <VscEyeClosed size={16} /> : <VscEye size={16} />}
                                        </button>
                                    </div>
                                    {
                                        errors?.password ?
                                            <span className="text-xs text-red-500 px-4">{errors?.password}</span> :
                                            null
                                    }
                                </div>
                            </div>
                        </div>
                    
                        <div className={`flex-1 flex flex-col gap-4 py-6 transition-[opacity,transform] duration-300 ${showAdvancedOptions ? 'translate-x-[-105%] opacity-0' : ''}`}>
                            <div className="flex flex-col gap-2">
                                <div className={`flex items-center border rounded-full ${errors?.title ? 'border-red-300 has-[input:focus]:border-red-400' : 'border-gray-200'} pr-[5px] has-[input:focus]:border-gray-600`}>
                                    <input 
                                        type="text"
                                        onChange={handleChange} 
                                        id="space_title"
                                        name="title" 
                                        placeholder="Space Title" 
                                        className={`${errors?.title ? 'text-red-500 placeholder:text-red-400' : ''} text-sm h-[40px] flex-1 bg-transparent pl-4 pr-2 focus:outline-none`} 
                                    />
                                    <ToggleKeyboardButton inputId="space_title" />
                                </div>
                                {
                                    errors?.title ? 
                                        <span className="text-xs text-red-500 px-4">{errors.title}</span> :
                                        null
                                }
                            </div>
                            <div className="flex flex-col gap-1 flex-1">
                                <div className="flex flex-1 flex-col gap-1">
                                    <div className="relative flex-1">
                                        <textarea 
                                            id="space_content"
                                            name="content" 
                                            onChange={handleChange}
                                            placeholder="Input your content here."
                                            className={`text-sm h-full w-full rounded-[20px] border focus:outline-none ${errors?.content || errors?.links ? 'border-red-300 focus:border-red-400 text-red-500 placeholder:text-red-400 focus:outline-none focus:boder-black' : 'border-gray-200'} border-gray-200 focus:border-gray-600 p-4 block w-full min-h-[200px] bg-transparent`}
                                        ></textarea>
                                        <span className="flex items-center justify-center absolute bottom-2 right-2">
                                            <ToggleKeyboardButton inputId="space_content" />
                                        </span>
                                    </div>
                                    {
                                        errors?.content || errors?.links ? 
                                            <span className="text-xs text-red-500 px-4">{errors?.content || errors?.links}</span> :
                                            null
                                    }
                                </div>
                                <ul className="flex items-center text-gray-400 px-4">
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
        </div>
    )
}
