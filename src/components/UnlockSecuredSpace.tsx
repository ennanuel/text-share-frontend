import { MdClose } from "react-icons/md";
import ToggleKeyboardButton from "./Keyboard/ToggleKeyboardBtn";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useContext, useState } from "react";
import { keyboardContext } from "./Keyboard";
import { useNavigate } from "react-router-dom";



export default function UnlockSecuredSpace({ setPassword, authenticationFailed, submitPassword }: { setPassword: React.Dispatch<React.SetStateAction<string>>; authenticationFailed: boolean; submitPassword: React.FormEventHandler<HTMLFormElement> }) {
    const { showKeyboard, closeKeyboard } = useContext(keyboardContext);
    const navigate = useNavigate();

    const goBackToExplore = () => {
        navigate("/spaces");
        closeKeyboard();
    };

    const [showPassword, setShowPassword] = useState(false);

    return (
        <dialog className={`w-screen h-screen p-4 fixed top-0 left-0 ${authenticationFailed ? 'flex opacity-100' : 'hidden opacity-0'} transition-opacity duration-300 items-center justify-center bg-black/20 backdrop-blur-md z-[999]`}>
            <form onSubmit={submitPassword} className={`${showKeyboard ? 'md:-translate-y-1/2' : ''} transition-[ease,_transform] ease-[cubic-bezier(.16,_1,_.3,_1)] duration-300 flex flex-col gap-4 w-full max-w-[420px] p-4 md:p-6 rounded-[32px] bg-white shadow-lg shadow-black/10`}>
                <div className="flex justify-between items-start gap-4">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-2xl font-bold">Tekst space locked</h2>
                        <p className="text-sm text-gray-400">Password required to unlock this Tekst Space.</p>
                    </div>
                    <button type="button" onClick={goBackToExplore} className="flex items-center justify-center w-10 aspect-square rounded-full hover:bg-red-100/50 hover:text-red-500">
                        <MdClose size={18} />
                    </button>
                </div>
                <div className="mt-6 flex flex-col gap-1 flex-1">
                    <div className="flex gap-2 border border-gray-300 items-center rounded-full has-[input:focus]:border-blue-300 overflow-hidden">
                        <input id="text_space_password" type={showPassword ? "text" : "password"} onChange={(event) => setPassword(event.target.value)} placeholder="Password" className="flex-1 h-10 md:h-12 px-2 pl-4 outline-none border-none focus:border-none focus:outline-none bg-transparent" />
                        <ToggleKeyboardButton inputId="text_space_password" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="w-8 aspect-square rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center mr-2">
                            {showPassword ? <VscEyeClosed size={16} /> : <VscEye size={16} />}
                        </button>
                    </div>
                </div>
                <button className="h-10 md:h-12 flex items-center justify-center bg-black text-white rounded-full">
                    <span className="font-semibold">Submit</span>
                </button>
            </form>
        </dialog>
    )
}