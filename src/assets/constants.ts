
import { FiCopy, FiEdit, FiShare } from "react-icons/fi";
import { MdArrowForward, MdOutlineFavorite, MdOutlineDelete } from "react-icons/md";

export const TEXT_SPACE_PAGE_OPTIONS = [
    {
        type: "edit",
        title: "Edit space",
        color: "text-blue-600",
        background: "bg-blue-400/20",
        hoverBackground: "hover:bg-blue-100",
        Icon: FiEdit
    },
    {
        type: "copy",
        title: "Copy space link",
        color: "text-yellow-500",
        background: "bg-yellow-500/20",
        hoverBackground: "hover:bg-yellow-100",
        Icon: FiCopy
    },
    {
        type: "share",
        title: "Share",
        color: "text-purple-600",
        background: "bg-purple-600/20",
        hoverBackground: "hover:bg-purple-100",
        Icon: FiShare
    },
    {
        type: "remove",
        title: "Remove space",
        color: "text-red-600",
        background: "bg-red-600/20",
        hoverBackground: "hover:bg-red-100",
        Icon: MdOutlineDelete
    }
]

export const TEXT_SPACE_COLOR_OPTIONS = [
    {
        background: "bg-red-400",
        cardBackground: "bg-gradient-to-b from-red-200 to-red-300",
        borderColor: "border-red-300",
        value: "red"
    },
    {
        background: "bg-orange-400",
        cardBackground: "bg-orange-200",
        borderColor: "border-orange-200",
        value: "orange"
    },
    {
        background: "bg-yellow-400",
        cardBackground: "bg-yellow-100",
        borderColor: "border-yellow-200",
        value: "yellow"
    },
    {
        background: "bg-green-400",
        cardBackground: "bg-gradient-to-b from-green-100 to-green-200",
        borderColor: "border-green-200",
        value: "green"
    },
    {
        background: "bg-blue-400",
        cardBackground: "bg-gradient-to-b from-blue-100 to-blue-200",
        borderColor: "border-blue-300",
        value: "blue"
    },
    {
        background: "bg-purple-400",
        cardBackground: "bg-purple-200",
        borderColor: "border-purple-300",
        value: "purple"
    }
];


export const TEXT_SPACE_OPTIONS = [
    {
        title: "Go to space",
        action: "navigate",
        hoverBackground: "hover:bg-blue-100",
        hoverColor: "hover:text-blue-600",
        Icon: MdArrowForward
    },
    {
        title: "Copy link",
        action: "copy",
        hoverBackground: "hover:bg-blue-100",
        hoverColor: "hover:text-blue-600",
        Icon: FiCopy
    },
    {
        title: "Add to favorite",
        action: "favorite",
        hoverBackground: "hover:bg-purple-100",
        hoverColor: "hover:text-purple-600",
        Icon: MdOutlineFavorite
    },
    {
        title: "Delete space",
        action: "delete",
        hoverBackground: "hover:bg-red-100",
        hoverColor: "hover:text-red-600",
        Icon: MdOutlineDelete
    }
];

export const ONE_YEAR_IN_MILLISECONDS = 31536000000;
export const ONE_MONTH_IN_MILLISECONDS = 2592000000;
export const ONE_WEEK_IN_MILLISECONDS = 604800000;
export const ONE_DAY_IN_MILLISECONDS = 86400000;
export const ONE_HOUR_IN_MILLISECONDS = 3600000;
export const ONE_MINUTE_IN_MILLISECONDS = 60000;