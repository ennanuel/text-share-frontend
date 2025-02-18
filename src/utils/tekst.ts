
import { Slide, toast } from "react-toastify";
import { 
    ONE_MINUTE_IN_MILLISECONDS, 
    ONE_HOUR_IN_MILLISECONDS, 
    ONE_DAY_IN_MILLISECONDS, 
    ONE_WEEK_IN_MILLISECONDS, 
    ONE_MONTH_IN_MILLISECONDS, 
    ONE_YEAR_IN_MILLISECONDS, 
    TEXT_SPACE_COLOR_OPTIONS, 
    DEFAULT_COLOR_OPTION, 
    TEXT_SPACE_OPTIONS 
} from '../assets/constants';
import { TextSpace } from "../types/textSpace.type";
import { fetchOptions } from "../assets/data";

export function getTextSpaceTime (timestamp: string) {
    const timePassedInMilliseconds = Date.now() - (new Date(timestamp)).getTime();
    
    if (timePassedInMilliseconds < ONE_MINUTE_IN_MILLISECONDS) return "now";
    else if (timePassedInMilliseconds >= ONE_MINUTE_IN_MILLISECONDS && timePassedInMilliseconds < ONE_HOUR_IN_MILLISECONDS) return `${Math.floor(timePassedInMilliseconds/ONE_MINUTE_IN_MILLISECONDS)} min.`;
    else if (timePassedInMilliseconds >= ONE_HOUR_IN_MILLISECONDS && timePassedInMilliseconds < ONE_DAY_IN_MILLISECONDS) return `${Math.floor(timePassedInMilliseconds / ONE_HOUR_IN_MILLISECONDS)} hr.`;
    else if (timePassedInMilliseconds >= ONE_DAY_IN_MILLISECONDS && timePassedInMilliseconds < ONE_WEEK_IN_MILLISECONDS) return `${Math.floor(timePassedInMilliseconds / ONE_DAY_IN_MILLISECONDS)} d.`;
    else if (timePassedInMilliseconds >= ONE_WEEK_IN_MILLISECONDS && timePassedInMilliseconds < ONE_MONTH_IN_MILLISECONDS) return `${Math.floor(timePassedInMilliseconds / ONE_WEEK_IN_MILLISECONDS)} wk.`;
    else if (timePassedInMilliseconds >= ONE_MONTH_IN_MILLISECONDS && timePassedInMilliseconds < ONE_YEAR_IN_MILLISECONDS) return `${Math.floor(timePassedInMilliseconds / ONE_MONTH_IN_MILLISECONDS)} wks.`;
    else return `${Math.floor(timePassedInMilliseconds / ONE_YEAR_IN_MILLISECONDS)} yr.`;
};

export function getTextSpaceCardBackground(color: string | undefined) {
    const colorOption = TEXT_SPACE_COLOR_OPTIONS.find((colorOption) => colorOption.value === color);
    const background = colorOption?.cardBackground || 'bg-white';
    const border = colorOption?.borderColor || 'border-gray-200';
    return {
        background,
        border
    }
};

export function getTextSpaceColors(color: string | undefined) {
    const colorOption = TEXT_SPACE_COLOR_OPTIONS.find((colorOption) => colorOption.value === color) || DEFAULT_COLOR_OPTION;
    return colorOption;
}

type ActionParams = { 
    textSpaceId?: string; 
    content?: string; 
    refetch?: () => void; 
    dispatch: React.Dispatch<React.SetStateAction<boolean>>; 
};

export const enterEdit = ({ dispatch }: ActionParams) => {
    dispatch(true);
};

export const copy = ({ dispatch, content }: ActionParams) => {
    if(!content) return;

    navigator.clipboard.writeText(content);
    dispatch(true);

    setTimeout(() => dispatch(false), 1000);
};

export const addToFavorites = async ({ textSpaceId, refetch }: ActionParams) => {
    try {
        if(!textSpaceId) return;
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/spaces/add/favorite/${textSpaceId}`, { ...fetchOptions, method: "PUT" });
        const result = await response.json();

        if(response.status !== 200) throw result;
        if(refetch) refetch();

        toast.success('Added to favorites', {
            position: "bottom-left",
            autoClose: 5000,
            pauseOnHover: false,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "colored",
            transition: Slide,
        });
    } catch (error) {
        toast.error('Could not add to favorites', {
            position: "bottom-left",
            autoClose: 5000,
            pauseOnHover: false,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "colored",
            transition: Slide,
        });
    }
};

export const removeFromFavorites = async ({ textSpaceId, refetch }: ActionParams) => {
    try {
        if(!textSpaceId) return;
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/spaces/remove/favorite/${textSpaceId}`, { ...fetchOptions, method: "PUT" });
        const result = await response.json();

        if(response.status !== 200) throw result;
        if(refetch) refetch();

        toast.success('Removed from favorites', {
            position: "bottom-left",
            autoClose: 5000,
            pauseOnHover: false,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
        });
        
    } catch (error) {
        toast.error('Could not remove from favorites', {
            position: "bottom-left",
            autoClose: 5000,
            pauseOnHover: false,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "colored",
            transition: Slide,
        });
    }
};

export const deleteTextSpace = async ({ textSpaceId, refetch }: ActionParams) => {
    try {
        if(!textSpaceId) return;
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/spaces/delete/${textSpaceId}`, { ...fetchOptions, method: "DELETE" });
        const result = await response.json();

        if(response.status !== 200) throw result;
        if(refetch) refetch();

        toast.warning('Text space deleted!', {
            position: "bottom-left",
            autoClose: 5000,
            pauseOnHover: false,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
        });
    } catch (error) {
        
        toast.error('Could not delete text space', {
            position: "bottom-left",
            autoClose: 5000,
            pauseOnHover: false,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "colored",
            transition: Slide,
        });
    }
}

export function filterOption (option: typeof TEXT_SPACE_OPTIONS[0], data?: TextSpace, userId?: string): boolean {
    const verdict = (option.type === "delete") || (option.type === "edit") ?
        Boolean(data?.isYours) :
            (option.type === "favorite") ?
                Boolean(!data?.isInYourFavorites && userId) :
                (option.type === "unfavorite") ?
                    Boolean(data?.isInYourFavorites && userId) : 
        Boolean(option.type === "navigate" || option.type === "copy");

    return verdict;
};
type OptionWithAction = typeof TEXT_SPACE_OPTIONS[0] & {
    action?: (options: ActionParams) => void
}

export function assignActionToOption (option: typeof TEXT_SPACE_OPTIONS[0]): OptionWithAction {
    switch(option.type) {
        case "edit": return { ...option, action: enterEdit };
        case "copy": return { ...option, action: copy };
        case "favorite": return { ...option, action: addToFavorites };
        case "unfavorite": return { ...option, action: removeFromFavorites };
        case "delete": return { ...option, action: deleteTextSpace };
        default: return { ...option, action: undefined };
    }
};