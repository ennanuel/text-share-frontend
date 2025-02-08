
import { ONE_MINUTE_IN_MILLISECONDS, ONE_HOUR_IN_MILLISECONDS, ONE_DAY_IN_MILLISECONDS, ONE_WEEK_IN_MILLISECONDS, ONE_MONTH_IN_MILLISECONDS, ONE_YEAR_IN_MILLISECONDS, TEXT_SPACE_COLOR_OPTIONS, DEFAULT_COLOR_OPTION } from "../assets/constants";

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