import { FaKeyboard } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

interface ModedURLSearchParams extends URLSearchParams {
    show_keyboard?: boolean;
    id_of_input_in_focus?: string;
}

export default function ToggleKeyboardButton({ inputId }: { inputId: string; }) {
    const [searchParams, setSearchParams] = useSearchParams();

    const openKeyboard = () => setSearchParams(prev => ({ ...prev, show_keyboard: true, id_of_input_in_focus: inputId }));
    const closeKeyboard = () => setSearchParams(({ show_keyboard, id_of_input_in_focus, ...prev }: ModedURLSearchParams) => prev);

    return (
        <label
            title="Toggle virtual keyboard"
            htmlFor={inputId}
            onClick={searchParams.get('show_keyboard') === 'true' && inputId === searchParams.get("id_of_input_in_focus") ? closeKeyboard : openKeyboard}
            className={`flex cursor-pointer items-center justify-center aspect-square rounded-full ${searchParams.get("show_keyboard") === "true" && searchParams.get("id_of_input_in_focus") === inputId ? 'bg-blue-100 text-blue-600 hover:bg-gray-100 hover:text-gray-600 showing-keyboard' : 'text-gray-600 hover:bg-blue-100 hover:text-blue-600'} min-w-[30px]`}
        >
            <FaKeyboard size={16} />
        </label>
    )
}