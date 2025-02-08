import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import CreateSpaceModal from "./CreateSpaceModal";
import Keyboard from "./Keyboard";
import CreateButtons from "./CreateButtons";
import { ToastContainer } from "react-toastify";

export const themeContext = createContext<{
    theme: "light" | "dark";
    changeTheme: () => void;
}>({
    theme: "light",
    changeTheme: () => null
});

export const createTextSpaceModalContext = createContext<{
    showCreateTextSpaceModal: boolean;
    openCreateTextSpaceModal: () => void;
    closeCreateTextSpaceModal: () => void;
}>({
    showCreateTextSpaceModal: false,
    openCreateTextSpaceModal: () => null,
    closeCreateTextSpaceModal: () => null
});


export default function Layout () {
    const [showCreateTextSpaceModal, setShowCreateTextSpaceModal] = useState(false);

    const openCreateTextSpaceModal = () => setShowCreateTextSpaceModal(true);
    const closeCreateTextSpaceModal = () => setShowCreateTextSpaceModal(false);

    const [theme, setTheme] = useState<"light" | "dark">("light");
    const changeTheme = () => setTheme(theme === "light" ? "dark" : "light");

    return (
        <createTextSpaceModalContext.Provider value={{ showCreateTextSpaceModal, openCreateTextSpaceModal, closeCreateTextSpaceModal }}>
            <themeContext.Provider value={{ theme, changeTheme }} >
                <Header />
                <div className="max-w-[var(--max-width)] mb-20 m-auto">
                    <Outlet />
                </div>
                <CreateButtons />
                <Keyboard />
                <Footer />
                <CreateSpaceModal />
                <ToastContainer />
            </themeContext.Provider>
        </createTextSpaceModalContext.Provider>
    );
}