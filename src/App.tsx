
import { createContext, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";

import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from './pages/Register';
import NotFound from "./pages/NotFound";
import TextSpaces from './pages/TextSpaces';
import TextSpace from './pages/TextSpace';
import MyTextSpaces from './pages/MySpaces';
import LandingPage from './pages/LandingPage';

import { keyboardContext } from './components/Keyboard';
import { fetchOptions } from './assets/data';
import { io } from 'socket.io-client';

import './App.css';

export const socket = io(import.meta.env.VITE_SERVER_URL);

export const authContext = createContext<{
  user: { id: string; } | null;
  checkAuthentication: () => Promise<void | null>;
  clearAuthentication: () => Promise<void | null>;
}>({
  user: null,
  checkAuthentication: async () => null,
  clearAuthentication: async () => null
});

export default function App() {
  const [user, setUser] = useState<{ id: string; } | null>(null)
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [idOfInputInFocus, setIdOfInputInFocus] = useState<null | string>(null);

  const location = useLocation();

  const openKeyboard = (idOfInputToFocus: string) => {
    setShowKeyboard(true);
    setIdOfInputInFocus(idOfInputToFocus);
  };

  const closeKeyboard = () => {
    setShowKeyboard(false);
    setIdOfInputInFocus(null);
  }

  async function checkAuthentication() {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/check`, fetchOptions);
      if (response.status !== 200) return;

      const result = await response.json();
      setUser({ id: result.userId });
    } catch (error) {
      console.error(error);
    }
  };

  async function clearAuthentication() { 
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/logout`, { ...fetchOptions, method: "POST" });
      if(response.status !== 204) return;
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 0);
  }, [location])

  return (
    <authContext.Provider value={{ user, checkAuthentication, clearAuthentication }}>
      <keyboardContext.Provider value={{ showKeyboard, idOfInputInFocus, openKeyboard, closeKeyboard }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<Layout />}>
            <Route path="/*" element={<NotFound />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<Register />} />
            <Route path="/my-spaces" element={<MyTextSpaces />} />
            <Route path="/spaces" element={<TextSpaces />} />
            <Route path="/space/:id" element={<TextSpace />} />
          </Route>
        </Routes>
      </keyboardContext.Provider>
    </authContext.Provider>
  )
};
