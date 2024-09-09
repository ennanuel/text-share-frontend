import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import ColorBackground from "./ColorBackground";
import CreateSpaceModal from "./CreateSpaceModal";
import Keyboard from "./Keyboard";

export const createModalContext = createContext<{
    showCreateModal: boolean;
    openCreateModal: () => void;
    closeCreateModal: () => void;
}>({
    showCreateModal: false,
    openCreateModal: () => null,
    closeCreateModal: () => null,
});

export const themeContext = createContext<{
    theme: "light" | "dark";
    changeTheme: () => void;
}>({
    theme: "light",
    changeTheme: () => null
})



export default function ({ scrolled }: { scrolled: boolean; }) {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [theme, setTheme] = useState<"light" | "dark">("light");

    const openCreateModal = () => setShowCreateModal(true);
    const closeCreateModal = () => setShowCreateModal(false);

    return (
        <createModalContext.Provider value={{ showCreateModal, openCreateModal, closeCreateModal }}>
            <ColorBackground scrolled={scrolled} />
            <Header scrolled={scrolled} />
            <Outlet />
            <Keyboard />
            <Footer />
            <CreateSpaceModal />
        </createModalContext.Provider>
    )
}