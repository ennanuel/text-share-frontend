
import { FiCopy, FiEdit } from "react-icons/fi";
import { MdArrowForward, MdOutlineDelete, MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";

export const ENDPOINT_URL = import.meta.env.VITE_ENDPOINT_URL;
export const IP_URL = import.meta.env.VITE_IP_URL;
export const COLLECTION_ID = import.meta.env.VITE_COLLECTION_ID2;
export const DB_ID = import.meta.env.VITE_DB_ID;
export const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;

export const TEXT_SPACE_COLOR_OPTIONS = [
    {
        background: "bg-red-400",
        cardBackground: "bg-gradient-to-b from-red-200 to-red-300",
        borderColor: "border-red-200",
        displayColor: "bg-red-100",
        iconColor: "bg-red-200",
        value: "red"
    },
    {
        background: "bg-orange-400",
        cardBackground: "bg-orange-200",
        borderColor: "border-orange-200",
        displayColor: "bg-orange-100",
        iconColor: "bg-orange-200",
        value: "orange"
    },
    {
        background: "bg-yellow-400",
        cardBackground: "bg-yellow-100",
        borderColor: "border-yellow-200",
        displayColor: "bg-yellow-100",
        iconColor: "bg-yellow-200",
        value: "yellow"
    },
    {
        background: "bg-green-400",
        cardBackground: "bg-gradient-to-b from-green-100 to-green-200",
        borderColor: "border-green-200",
        displayColor: "bg-green-100",
        iconColor: "bg-green-200",
        value: "green"
    },
    {
        background: "bg-blue-400",
        cardBackground: "bg-gradient-to-b from-blue-100 to-blue-200",
        borderColor: "border-blue-200",
        displayColor: "bg-blue-100",
        iconColor: "bg-blue-200",
        value: "blue"
    },
    {
        background: "bg-purple-400",
        cardBackground: "bg-purple-200",
        borderColor: "border-purple-200",
        displayColor: "bg-purple-100",
        iconColor: "bg-purple-200",
        value: "purple"
    }
];


export const TEXT_SPACE_OPTIONS = [
    {
        title: "Go to space",
        type: "navigate",
        hoverBackground: "hover:bg-blue-100",
        hoverColor: "hover:text-blue-600",
        iconBackground: "bg-blue-200/20",
        iconColor: "text-blue-500",
        Icon: MdArrowForward
    },
    { 
        title: "Edit text space",
        type: "edit",
        hoverBackground: "hover:bg-blue-100",
        hoverColor: "hover:text-blue-600",
        iconBackground: "bg-blue-200/20",
        iconColor: "text-blue-500",
        Icon: FiEdit
    },
    {
        title: "Copy link",
        type: "copy",
        hoverBackground: "hover:bg-yellow-100",
        hoverColor: "hover:text-yellow-600",
        iconBackground: "bg-yellow-200/20",
        iconColor: "text-yellow-500",
        Icon: FiCopy
    },
    {
        title: "Add to favorite",
        type: "favorite",
        hoverBackground: "hover:bg-purple-100",
        hoverColor: "hover:text-purple-600",
        iconBackground: "bg-purple-200/20",
        iconColor: "text-purple-500",
        Icon: MdFavorite
    },
    {
        title: "Remove from favorite",
        type: "unfavorite",
        hoverBackground: "hover:bg-purple-100",
        hoverColor: "hover:text-purple-600",
        iconBackground: "bg-purple-200/20",
        iconColor: "text-purple-500",
        Icon: MdOutlineFavoriteBorder
    },
    {
        title: "Delete space",
        type: "delete",
        hoverBackground: "hover:bg-red-100",
        hoverColor: "hover:text-red-600",
        iconBackground: "bg-red-200/20",
        iconColor: "text-red-500",
        Icon: MdOutlineDelete
    }
];

export const DEFAULT_COLOR_OPTION = {
    background: "bg-white",
    cardBackground: "bg-white",
    borderColor: "border-gray-200",
    displayColor: "bg-white",
    iconColor: "bg-gray-100",
    value: "white"
};

export const FETCH_FILTERS = [
    {
        title: "All",
        value: ""
    },
    {
        title: "Owned",
        value: "OWNED"
    },
    {
        title: "Secured",
        value: "SECURED"
    },
    {
        title: "Unsecured",
        value: "UNSECURED"
    },
];

export const CREATED_NEW_TEXT_SPACE_TOAST_ID = "created-new-space";
export const EDITED_NEW_TEXT_SPACE_TOAST_ID = "edited-new-space";

export const ONE_YEAR_IN_MILLISECONDS = 31536000000;
export const ONE_MONTH_IN_MILLISECONDS = 2592000000;
export const ONE_WEEK_IN_MILLISECONDS = 604800000;
export const ONE_DAY_IN_MILLISECONDS = 86400000;
export const ONE_HOUR_IN_MILLISECONDS = 3600000;
export const ONE_MINUTE_IN_MILLISECONDS = 60000;