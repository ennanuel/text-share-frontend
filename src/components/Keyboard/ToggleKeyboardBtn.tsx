import { useContext } from "react";
import { FaKeyboard } from "react-icons/fa";
import { keyboardContext } from ".";

export default function ToggleKeyboardButton({ inputId }: { inputId: string; }) {
    const { showKeyboard, idOfInputInFocus, openKeyboard, closeKeyboard } = useContext(keyboardContext);

    return (
        <label
            title="Toggle virtual keyboard"
            htmlFor={inputId}
            onClick={() => showKeyboard && inputId === idOfInputInFocus ? closeKeyboard() : openKeyboard(inputId)}
            className={`flex cursor-pointer items-center justify-center aspect-square rounded-full ${showKeyboard && idOfInputInFocus === inputId ? 'bg-blue-100 text-blue-600 hover:bg-gray-100 hover:text-gray-600 showing-keyboard' : 'text-gray-600 hover:bg-blue-100 hover:text-blue-600'} min-w-[30px]`}
        >
            <FaKeyboard size={16} />
        </label>
    )
}