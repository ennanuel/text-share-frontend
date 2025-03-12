import { Link } from "react-router-dom";

import logo from "../../assets/images/tekst_logo_dark.svg";
import { GrGlobe } from "react-icons/gr";

const NAV_LINKS = [
    {
        title: "Home",
        link: "/"
    }, 
    {
        title: "Explore Spaces",
        link: "/spaces",
    },
    {
        title: "Sign up",
        link: "/sign-up"
    }
];

const DEV_LINKS = [
    {
        title: "GitHub",
        link: "https://github.com/ennanuel/text-share-frontend.git",
    }, 
    {
        title: "About Developer",
        link: "https://ezem.netlify.app"
    }
];

const SOCIAL_LINKS = [
    {
        title: "LinkedIn",
        link: "https://linkedin.com/in/ezema-emmanuel"
    }, 
    {
        title: "Instagram",
        link: "https://instagram.com/by.ezema"
    }, 
    {
        title: "Twitter",
        link: "https://x.com/nnanna-ezema"
    }
]

export default function Footer() {

    return (
        <footer className="lg:min-h-screen flex items-end justify-center pt-40 lg:pt-20 p-6 md:p-10 lg:p-20">
            <div className="my-0 mx-auto w-full max-w-[var(--max-width)] flex flex-col">
                <div className="flex flex-col lg:flex-row gap-20 lg:gap-4 justify-between items-start mb-20">
                    <a href={import.meta.env.BASE_URL} className="flex items-center w-fit text-gray-800">
                        <img src={logo} className="w-10 h-auto" />
                        <span className="font-bold text-3xl -ml-1 tracking-tight">ekst</span>
                    </a>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 flex-1 w-full lg:max-w-[640px]">
                        <div className="flex flex-col gap-4">
                            <h4 className="text-gray-800 font-semibold tracking-tight text-lg md:text-xl">Link</h4>
                            <ul className="flex flex-col gap-4">
                                {
                                    NAV_LINKS.map(({ title, link }, index) => (
                                        <li key={index} className="">
                                            <Link to={link} className="text-lg md:text-xl font-semibold text-gray-500 tracking-tight">{title}</Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h4 className="text-gray-800 font-semibold tracking-tight text-lg md:text-xl">Info</h4>
                            <ul className="flex flex-col gap-4">
                                {
                                    DEV_LINKS.map(({ link, title }, index) => (
                                        <li key={index} className="">
                                            <a href={link} className="text-lg md:text-xl font-semibold text-gray-500 tracking-tight">{title}</a>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h4 className="text-gray-800 font-semibold tracking-tight text-lg md:text-xl">Social</h4>
                            <ul className="flex flex-col gap-4">
                                {
                                    SOCIAL_LINKS.map(({ title, link }, index) => (
                                        <li key={index} className="">
                                            <a target="_blank" href={link} className="text-lg md:text-xl font-semibold text-gray-500 tracking-tight">{title}</a>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-200 flex flex-col lg:flex-row gap-10 lg:gap-4 justify-between items-start pt-10">
                    <div className="flex flex-col">
                        <span className="text-lg font-normal tracking-tight text-gray-400">All rights reserved.</span>
                        <span className="text-lg font-semibold tracking-tight text-gray-800">©{(new Date()).getFullYear()} Tekst.</span>
                    </div>
                    <div className="flex flex-col md:flex-row gap-10 flex-1 max-w-[640px]">
                        <div className="w-full md:w-fit">
                            <p className="w-auto md:w-[44ch] text-lg text-gray-400 tracking-tight">
                                <span>Lagos - Nigeria</span><br />
                                <span className="">Yes, I'm a proud Nigerian. Leave if you want to.</span>
                            </p>
                            <p className="font-semibold text-lg tracking-tight text-[var(--blue)]">Terms and conditions -  Privacy policy</p>
                        </div>

                        <span className="flex flex-col gap-1">
                            <GrGlobe size={20} className="text-[var(--blue)]" />
                            <span className="font-semibold text-lg text-gray-800">English</span>
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    )
}