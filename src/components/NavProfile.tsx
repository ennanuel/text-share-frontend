import { useContext, useState } from "react"
import { BiLogOut, BiUser } from "react-icons/bi";
import { FaAngleDown } from "react-icons/fa6";

import { authContext } from "../App";


export default function NavProfile({ showMobileMenu, closeMenu }: { showMobileMenu: boolean; closeMenu: () => void; }) {
    const { user, clearAuthentication } = useContext(authContext);

    const [showProfileDetails, setShowProfileDetails] = useState(false);

    const logUserOut = () => {
        clearAuthentication();
        closeMenu();
    }

    if(!user?.id) return;

    return (
        <div className="relative">
           {
                <div className={`${showMobileMenu && showProfileDetails ? '' : 'opacity-0'} transition-opacity duration-300 ease-expo absolute right-0 top-[calc(100%_+_8px)]`}>
                    <ul className="flex flex-col gap-2">
                        <li>
                            <button onClick={logUserOut} className="flex items-center justify-start min-w-[120px] px-4 gap-2 h-12 rounded-full bg-white text-red-500">
                                <BiLogOut size={18} />
                                <span>Log out</span>
                            </button>
                        </li>
                    </ul>
                </div>
           } 
            <button 
                onClick={() => setShowProfileDetails(!showProfileDetails)} 
                className={`${showMobileMenu ? 'delay-[.18s]' : '-translate-y-1/2 scale-50 opacity-0'} duration-500 transition-[opacity,_transform] ease-expo origin-top-right w-fit flex items-center justify-end gap-3 h-12 bg-white rounded-full border border-gray-200 px-3`}
            >
                <span className={`${showProfileDetails ? 'rotate-180' : ''} flex items-center justify-center`}>
                    <FaAngleDown size={12} className="mr-1" />
                </span>
                <span className="text-sm whitespace-nowrap">My profile</span>
                <BiUser size={18} />
            </button>
        </div>
    )
}