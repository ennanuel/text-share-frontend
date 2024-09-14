import { MdArrowUpward, MdKeyboardCapslock, MdOutlineKeyboardBackspace, MdOutlineKeyboardReturn, MdOutlineKeyboardTab, MdOutlineSpaceBar } from "react-icons/md";

export function getKeyLayout(value: string): string {
    switch(value) {
        case "`":
            return "col-span-4 min-w-auto";
        case "backspace":
            return "col-span-8";
        case "tab":
            return "col-span-6";
        case "enter":
            return "col-span-6 row-span-2";
        case "caps_lock":
            return "col-span-10";
        case "right_shift":
            return "col-span-12";
        case "space":
            return "col-span-full";
        default: 
            return "col-span-4"
    }
}

export const keys = [
    {
        value: "`",
        altValue: "~",
        isAlphabet: false,
        isActionButton: false
    },
    {
        value: "1",
        altValue: "!",
        isAlphabet: false,
        isActionButton: false
    },
    {
        value: "2",
        altValue: "@",
        isAlphabet: false,
        isActionButton: false
    },
    {
        value: "3",
        altValue: "#",
        isAlphabet: false,
        isActionButton: false
    },
    {
        value: "4",
        altValue: "$",
        isAlphabet: false,
        isActionButton: false
    },
    {
        value: "5",
        altValue: "%",
        isAlphabet: false,
        isActionButton: false
    },
    {
        value: "6",
        altValue: "^",
        isAlphabet: false,
        isActionButton: false
    },
    {
        value: "7",
        altValue: "&",
        isAlphabet: false,
        isActionButton: false
    },
    {
        value: "8",
        altValue: "*",
        isAlphabet: false,
        isActionButton: false
    },
    {
        value: "9",
        altValue: "(",
        isAlphabet: false,
        isActionButton: false
    },
    {
        value: "0",
        altValue: ")",
        isAlphabet: false,
        isActionButton: false
    },
    {
        value: "-",
        altValue: "_",
        isAlphabet: false,
        isActionButton: false
    },
    {
        value: "=",
        altValue: "+",
        isAlphabet: false,
        isActionButton: false
    },
    {
        value: "backspace",
        altValue: null,
        isAlphabet: false,
        isActionButton: true,
        Icon: MdOutlineKeyboardBackspace
    },
    {
        value: "tab",
        altValue: null,
        isAlphabet: false,
        isActionButton: true,
        Icon: MdOutlineKeyboardTab
    },
    {
        value: "q",
        altValue: "Q",
        isAlphabet: true,
        isActionButton: false
    },
    {
        value: "w",
        altValue: "W",
        isAlphabet: true,
        isActionButton: false
    },
    {
        value: "e",
        altValue: "E",
        isAlphabet: true,
        isActionButton: false
    },
    {
        value: "r",
        altValue: "R",
        isAlphabet: true,
        isActionButton: false
    },
    {
        value: "t",
        altValue: "T",
        isAlphabet: true,
        isActionButton: false
    },
    {
        value: "y",
        altValue: "Y",
        isAlphabet: true,
        isActionButton: false
    },
    {
        value: "u",
        altValue: "U",
        isAlphabet: true,
        isActionButton: false
    },
    {
        value: "i",
        altValue: "I",
        isAlphabet: true,
        isActionButton: false
    },
    {
        value: "o",
        altValue: "O",
        isAlphabet: true,
        isActionButton: false
    },
    {
        value: "p",
        altValue: "p",
        isAlphabet: true,
        isActionButton: false
    },
    {
        value: "[",
        altValue: "{",
        isAlphabet: false,
        isActionButton: false
    },
    {
        value: "]",
        altValue: "}",
        isAlphabet: false,
        isActionButton: false
    },
    {
        value: "enter",
        altValue: null,
        isAlphabet: false,
        isActionButton: true,
        Icon: MdOutlineKeyboardReturn
    },
    {
        value: "caps_lock",
        altValue: null,
        isAlphabet: false,
        isActionButton: true,
        Icon: MdKeyboardCapslock
    },
    {
        value: "a",
        altValue: "A",
        isAlphabet: true,
        isActionButton: false
    },
    {
        value: "s",
        altValue: "S",
        isAlphabet: true,
        isActionButton: false
    },
    {
        value: "d",
        altValue: "D",
        isAlphabet: true,
        isActionButton: false
    },
    {
        value: "f",
        altValue: "F",
        isAlphabet: true,
        isActionButton: false
    },
    {
        value: "g",
        altValue: "G",
        isAlphabet: true,
        isActionButton: false
    },
    {
        value: "h",
        altValue: "H",
        isAlphabet: true,
        isActionButton: false
    },
    {
        value: "j",
        altValue: "J",
        isAlphabet: true,
        isActionButton: false
    },
    {
        value: "k",
        altValue: "K",
        isAlphabet: true,
        isActionButton: false
    },
    {
        value: "l",
        altValue: "L",
        isAlphabet: true,
        isActionButton: false
    },
    {
        value: ";",
        altValue: ":",
        isAlphabet: false,
        isActionButton: false
    },
    {
        value: "'",
        altValue: "\"",
        isAlphabet: false,
        isActionButton: false
    },
    {
        value: "left_shift",
        altValue: null,
        isAlphabet: false,
        isActionButton: true,
        Icon: MdArrowUpward
    },
    {
        value: "\\",
        altValue: "|",
        isAlphabet: false,
        isActionButton: false
    },
    {
        value: "z",
        altValue: "Z",
        isAlphabet: true,
        isActionButton: false
    },
    {
        value: "x",
        altValue: "X",
        isAlphabet: true,
        isActionButton: false
    },
    {
        value: "c",
        altValue: "C",
        isAlphabet: true,
        isActionButton: false
    },
    {
        value: "v",
        altValue: "V",
        isAlphabet: true,
        isActionButton: false
    },
    {
        value: "b",
        altValue: "B",
        isAlphabet: true,
        isActionButton: false
    },
    {
        value: "n",
        altValue: "N",
        isAlphabet: true,
        isActionButton: false
    },
    {
        value: "m",
        altValue: "M",
        isAlphabet: true,
        isActionButton: false
    },
    {
        value: ",",
        altValue: "<",
        isAlphabet: false,
        isActionButton: false
    },
    {
        value: ".",
        altValue: ">",
        isAlphabet: false,
        isActionButton: false
    },
    {
        value: "/",
        altValue: "?",
        isAlphabet: false,
        isActionButton: false
    },
    {
        value: "right_shift",
        altValue: null,
        isAlphabet: false,
        isActionButton: true,
        Icon: MdArrowUpward
    },
    {
        value: "space",
        altValue: null,
        isAlphabet: false,
        isActionButton: true,
        Icon: MdOutlineSpaceBar
    }
]