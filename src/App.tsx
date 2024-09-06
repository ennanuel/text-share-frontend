
import { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import LoginAndRegister from "./pages/LoginAndRegister";
import NotFound from "./pages/NotFound";
import TextSpaces from './pages/TextSpaces';
import TextSpace from './pages/TextSpace';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';

import './App.css';

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => { 
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    }

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
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
  )
}

export default App
