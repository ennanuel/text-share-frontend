import { useContext } from "react"
import { authContext } from "../App"
import { Link } from "react-router-dom";


const LINKS = [
    {
        title: "Home",
        link: "/"
    },
    {
        title: "My spaces",
        link: "/my-spaces"
    },
    {
        title: "Explore spaces",
        link: "/spaces"
    },
    {
        title: "Sign in",
        link: "/sign-in"
    },
    {
        title: "Sign up",
        link: "/sign-up"
    },
    {
        title: "About",
        link: "/about"
    }
]

export default function NotFound() {
    const { user } = useContext(authContext);

    return (
        <div className="flex flex-col md:flex-row items-end justify-between min-h-[calc(100vh_-_160px)] p-4 gap-4">
            <div className="flex flex-col gap-4">
                <h1 className="text-gray-800 font-bold text-5xl sm:text-[4rem] md:text-[5rem] lg:text-[6rem] tracking-tight">Not Found.</h1>
                <p className="font-semibold text-gray-600 text-base sm:text-lg">Sorry, this page does not exist.</p>
            </div>
            <ul className="flex flex-col gap-2">
                {
                    LINKS.map(({ title, link }, index) => (
                        (user?.id && title !== "Sign in" && title !== "Sign up") || (!user?.id && title !== "My spaces") ?
                            <li key={index}>
                                <Link to={link} className="text-sm md:text-base text-gray-800 hover:underline">
                                    <span>{title}</span>
                                </Link>
                            </li> :
                        null
                    ))
                }
            </ul>
        </div>
    )
 };