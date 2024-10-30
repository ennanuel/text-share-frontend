import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import ColorBackground from "./ColorBackground";
import CreateSpaceModal from "./CreateSpaceModal";
import Keyboard from "./Keyboard";
import CreateButtons from "./CreateButtons";

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


export default function ({ scrolled }: { scrolled: boolean; }) {
    const [showCreateTextSpaceModal, setShowCreateTextSpaceModal] = useState(false);

    const openCreateTextSpaceModal = () => setShowCreateTextSpaceModal(true);
    const closeCreateTextSpaceModal = () => setShowCreateTextSpaceModal(false);

    const [theme, setTheme] = useState<"light" | "dark">("light");
    const changeTheme = () => setTheme(theme === "light" ? "dark" : "light");

    return (
        <createTextSpaceModalContext.Provider value={{ showCreateTextSpaceModal, openCreateTextSpaceModal, closeCreateTextSpaceModal }}>
            <themeContext.Provider value={{ theme, changeTheme }} >
                <ColorBackground scrolled={scrolled} />
                <Header scrolled={scrolled} />
                <Outlet />
                <CreateButtons />
                <Keyboard />
                <Footer />
                <CreateSpaceModal />
            </themeContext.Provider>
        </createTextSpaceModalContext.Provider>
    );
}