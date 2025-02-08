
import { useLocation } from "react-router-dom";

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
        <div className="flex justify-end sticky bottom-6 h-0 px-4 mt-10 mb-6 w-full max-w-[var(--big-max-width)]">
            <button onClick={open} className={`group relative -top-14 text-white flex items-center justify-center h-12 md:h-14 pl-6 pr-4 before:absolute before:w-full before:h-full before:rounded-full before:bg-black/80 before:backdrop-blur hover:before:scale-110 before:transition-transform before:border before:border-white/10`}>
                <span className="relative inline-flex items-center justify-center gap-2">
                    <span className='text-sm font-semibold'>New space</span>
                    <MdAdd size={20} />
                </span>
            </button>
        </div>
    )
};