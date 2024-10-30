
import { createContext, useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import LoginAndRegister from "./pages/LoginAndRegister";
import NotFound from "./pages/NotFound";
import TextSpaces from './pages/TextSpaces';
import TextSpace from './pages/TextSpace';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';

import { keyboardContext } from './components/Keyboard';

import './App.css';
import { fetchOptions } from './assets/data';

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
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<{ id: string; } | null>(null)
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [idOfInputInFocus, setIdOfInputInFocus] = useState<null | string>(null);

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
      const result = await response.json();
      if (response.status !== 200) throw result;
      setUser({ id: result.userId });
    } catch (error) {
      console.error(error);
    }
  };

  async function clearAuthentication() { 
    try {
      setUser(null);
    } catch (error) {
      console.error(false);
    }
  };

  useEffect(() => { 
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    }

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <authContext.Provider value={{ user, checkAuthentication, clearAuthentication }}>
      <keyboardContext.Provider value={{ showKeyboard, idOfInputInFocus, openKeyboard, closeKeyboard }}>
        <Routes>
          <Route path="/signup/:pathname?" element={<LoginAndRegister />} />
          <Route path="/*" element={<NotFound />} />
          <Route element={<Layout scrolled={scrolled} />}>
            <Route path="/" element={<Home />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/spaces" element={<TextSpaces />} />
            <Route path="/spaces/space/:id" element={<TextSpace />} />
          </Route>
        </Routes>
      </keyboardContext.Provider>
    </authContext.Provider>
  )
};
