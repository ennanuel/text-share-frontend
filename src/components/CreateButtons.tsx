
import { useLocation } from "react-router-dom";

import { FiInfo } from "react-icons/fi";
import { MdAdd } from "react-icons/md";
import { useContext } from "react";
import { createTextSpaceModalContext } from "./Layout";
import { keyboardContext } from "./Keyboard";

export default function CreateButtons() {
    const { pathname } = useLocation();

    const { closeKeyboard } = useContext(keyboardContext);
    const { openCreateTextSpaceModal } = useContext(createTextSpaceModalContext);

    const open = () => {
        openCreateTextSpaceModal();
        closeKeyboard();
    }

    if (pathname.includes('landing')) return;

    return (
        <div className="flex sticky bottom-8 justify-between px-6 mb-20">
            <button className="flex items-center justify-center h-[50px] w-[50px] rounded-[25px] bg-white shadow-md shadow-black/20">
                <FiInfo size={18} />
            </button>
            <button onClick={open} className='group text-white relative flex items-center justify-center h-[50px] pl-6 pr-4 before:absolute before:w-full before:h-full before:rounded-full before:bg-black hover:before:scale-110 before:transition-transform before:border before:border-white/10'>
                <span className="relative inline-flex items-center justify-center gap-2">
                    <span className='text-sm font-semibold'>New space</span>
                    <MdAdd size={20} />
                </span>
            </button>
        </div>
    )
};