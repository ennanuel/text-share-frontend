
import { useMemo } from "react";

import Login from "../components/Login";
import Register from "../components/Register";
import { useParams } from "react-router-dom";

export default function LoginAndRegister() {
    const { pathname } = useParams();
    const isRegistering = useMemo(() => pathname?.toLowerCase() === 'register', [pathname]);

    return (
        <div id="login-signup" className="relative w-full min-h-[100vh] flex flex-col items-center justify-center p-10 overflow-clip">
            <div className="fixed top-0 left-0 w-[100vw] h-[100vh]">
                <span className="absolute block w-[600px] h-[50px] top-0 left-0 translate-x-[-50%] translate-y-[-50%] bg-[#5757c6] rounded-[50%] blur-[60px]"></span>
                <span className="absolute block w-[100px] h-[100px] top-0 left-0 translate-x-[-50%] translate-y-[-50%] bg-[#4040a7] rounded-full blur-[60px]"></span>
                <span className="absolute block w-[600px] h-[50px] bottom-0 right-0 translate-x-[50%] translate-y-[50%] bg-pink-400 rounded-[50%] blur-[60px]"></span>
                <span className="absolute block w-[500px] aspect-square bottom-0 right-0 translate-x-[50%] translate-y-[50%] bg-pink-300 rounded-full blur-[60px]"></span>
                <span className="absolute block w-[50px] h-[400px] top-[50%] right-0 translate-x-[50%] translate-y-[-50%] bg-purple-400 rounded-[50%] blur-[60px]"></span>
                <span className="absolute block w-[100px] aspect-square top-[50%] right-0 translate-x-[50%] translate-y-[-50%] bg-purple-200 rounded-full blur-[60px]"></span>
            </div>
            <Login show={!isRegistering} />
            <Register show={isRegistering} />
        </div>
    )
};