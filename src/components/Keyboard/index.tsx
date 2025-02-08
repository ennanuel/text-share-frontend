
import { useMemo, useState, useEffect, createContext, useContext } from "react";
import { getKeyLayout, keys } from "./keys";
import { MdClose } from "react-icons/md";

export const keyboardContext = createContext<{
    showKeyboard: boolean;
    idOfInputInFocus: string | null;
    openKeyboard: (idOfInputToFocus: string) => void;
    closeKeyboard: () => void;
}>({
    showKeyboard: false,
    idOfInputInFocus: null,
    openKeyboard: () => null,
    closeKeyboard: () => null,
});

export default function Keyboard() {
    const { showKeyboard, idOfInputInFocus, closeKeyboard } = useContext(keyboardContext);

    const inputElement = useMemo<HTMLInputElement | HTMLTextAreaElement>(() => (document.getElementById(String(idOfInputInFocus)) as HTMLInputElement), [showKeyboard, idOfInputInFocus]);

    const [value, setValue] = useState("");
    const [shift, setShift] = useState(false);
    const [capsLock, setCapsLock] = useState(false);

    const [caretPosition, setCaretPosition] = useState({ start: 0, end: 0 });
    const [inputWasClicked, setInputWasClicked] = useState(false);

    const [currentCharacter, setCurrentCharacter] = useState("");

    const toggleShift = () => setShift(prev => !prev);
    const toggleCapsLock = () => setCapsLock(prev => !prev);
    const enterPress = () => setCurrentCharacter('\n');
    const tabPress = () => setCurrentCharacter('\t');
    const spacePress = () => setCurrentCharacter(' ');
    const backspace = () => setCurrentCharacter('backspace');
    const normalKeyPress = ({ value, altValue, isAlphabet }: { value: string; altValue: string | null; isAlphabet: boolean; }) => {
        setCurrentCharacter(String((!shift && !isAlphabet) || (isAlphabet && shift && capsLock) || (isAlphabet && !capsLock && !shift) ? value : altValue));
        setShift(false);
    };

    const actions = useMemo(() => ({
        backspace,
        left_shift: toggleShift,
        right_shift: toggleShift,
        caps_lock: toggleCapsLock,
        enter: enterPress,
        tab: tabPress,
        space: spacePress
    }), []);

    const keyboardKeys = useMemo(() => keys.map(key => ({ ...key, value: key.value.replace(/right_/ig, '').replace('_', ' '), spanSize: getKeyLayout(key.value), action: getKeyAction(key) })), [capsLock, shift]);

    function getKeyAction(key: { value: string; altValue: string | null; isAlphabet: boolean; isActionButton: boolean; }): () => void {
        if (key.isActionButton) return actions[(key.value as keyof typeof actions)];
        return () => normalKeyPress(key);
    };

    const handleClick = (action: () => void) => {
        if (!inputElement) return;
        action();
        inputElement.focus();
    };

    useEffect(() => {
        if (!currentCharacter) {
            if (!inputElement) return;
            setTimeout(() => {
                inputElement.selectionStart = caretPosition.start;
                inputElement.selectionEnd = caretPosition.end;
            })
        } else {
            const newValue = currentCharacter === "backspace" ?
                (
                    Boolean(caretPosition) ?
                        caretPosition.start !== caretPosition.end ?
                            value.substring(0, caretPosition.start) + value.substring(caretPosition.end,) :
                            value.substring(0, caretPosition.start - 1) + value.substring(caretPosition.start,) :
                        value
                ) :
                value.substring(0, caretPosition.start) + currentCharacter + value.substring(caretPosition.end,);
            
            const newCaretPosition = caretPosition.start + (currentCharacter === "backspace" && caretPosition.start === caretPosition.end && caretPosition.start >= 1 ? -1 : currentCharacter !== "backspace" ? 1 : 0)

            setValue(newValue);
            setCaretPosition({ start: newCaretPosition, end: newCaretPosition });
            setCurrentCharacter("");
        }
    }, [currentCharacter, caretPosition]);

    useEffect(() => {
        if (!showKeyboard || !inputElement) return;

        setValue(inputElement.value);
        setCaretPosition({ start: Number(inputElement.selectionStart), end: Number(inputElement.selectionEnd) });

        const handleInputClick = () => setInputWasClicked(true);
        const handleInputChange = (event: Event) => {
            if (!event.target) return;
            const element = (event.target as HTMLInputElement | HTMLTextAreaElement);
            const newValue = element.value;

            const newCaretPosition = Number(element.selectionStart);
            setValue(newValue);
            setCaretPosition({ start: newCaretPosition, end: newCaretPosition });
        };
        const handleInputMouseUp = (event: Event) => {
            if (!inputWasClicked || !event.target) return;
            const element = (event.target as HTMLInputElement | HTMLTextAreaElement);
            setCaretPosition({ start: element.selectionStart || 0, end: element.selectionEnd || 0 });
            setInputWasClicked(false);
        };

        inputElement.addEventListener('click', handleInputClick);
        inputElement.addEventListener('change', handleInputChange);
        inputElement.addEventListener('mouseup', handleInputMouseUp);

        return () => {
            inputElement.removeEventListener('click', handleInputClick);
            inputElement.removeEventListener('change', handleInputChange);
            inputElement.removeEventListener('mouseup', handleInputMouseUp);
        }
    }, [showKeyboard, idOfInputInFocus, inputWasClicked]);

    useEffect(() => {
        if (!inputElement) return;
        inputElement.value = value;
    }, [value]);

    return (
        <div className={`${showKeyboard ? '' : 'opacity-0 scale-y-75 scale-x-50 pointer-events-none md:max-h-0'} duration-300 origin-bottom transition-[opacity,_transform] fixed z-[999999999999] md:sticky bottom-0 md:bottom-2 flex justify-center w-full md:w-max m-auto bg-white/50 border border-gray-300 rounded-t-3xl md:rounded-3xl backdrop-blur-lg md:shadow-lg md:shadow-black/20`}>
            <ul className={`${showKeyboard ? 'delay-200 duration-300' : 'opacity-0'} w-full md:w-auto transition-opacity grid relative grid-cols-[repeat(60,_1fr)] gap-1 md:gap-3 p-3 select-none`}>
                {
                    keyboardKeys.map(({ value, altValue, isAlphabet, Icon, spanSize, action }, index) => (
                        <li key={index} className={`${spanSize} relative`}>
                            <button
                                onClick={() => handleClick(action)}
                                className={`${(value.includes('shift') && shift) || (value === 'caps lock' && capsLock) ? 'bg-black text-white border-black' : 'bg-white/80 border-gray-300 hover:bg-gray-100'} relative w-full h-full min-h-[40px] md:min-h-[50px] lg:min-h-[50px] lg:min-w-[50px] max-w-[250px] md:max-w-[500px] m-auto rounded-md md:rounded-2xl border flex items-center justify-center active:bg-black active:text-white active:border-black`}
                            >
                                {
                                    !isAlphabet && altValue ?
                                        <span className="absolute top-1 left-1 text-sm text-gray-600 hidden md:flex">{shift ? value : altValue}</span> :
                                        null
                                }
                                {
                                    value === 'caps lock' ?
                                        <span className={`block absolute top-2 right-2 w-2 aspect-square rounded-full ${capsLock ? 'bg-green-400' : 'bg-gray-400'} shadow-md`}></span> :
                                        null
                                }
                                {
                                    Icon ?
                                        <span className={`flex items-center justify-center gap-2 ${value.includes('enter') ? 'flex-col' : ''}`}>
                                            {value !== 'left shift' ? <span className="text-xs font-semibold hidden md:block">{value}</span> : null}
                                            <Icon size={18} />
                                        </span> :
                                        <span className="font-semibold">{(!shift && !isAlphabet) || (isAlphabet && shift && capsLock) || (isAlphabet && !capsLock && !shift) ? value : altValue}</span>
                                }
                            </button>
                        </li>
                    ))
                }
                <button onClick={closeKeyboard} className="absolute bottom-3 right-3 bg-gray-100 hover:bg-red-100 hover:border-red-300 hover:text-red-600 border border-gray-300 rounded-md md:rounded-2xl px-3 flex items-center justify-center gap-2 h-[40px] md:h-[50px] w-[40px] md:min-w-[50px]">
                    <MdClose size={18} />
                </button>
            </ul>
        </div>
    );
}