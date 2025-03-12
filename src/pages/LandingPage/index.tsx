

import React, { useRef, useState } from "react";


import Header from "./Header";
import Intro from "./Intro";
import DeviceDemo from "./DeviceDemo";
import Demo from "./Demo";
import Users from "./Users";
import FAQs from "./Faqs";
import Footer from "./Footer";
import Features from "./Features";
import AdditionalFeatures from "./AdditionalFeatures";
import AboutDeveloper from "./AboutDeveloper";

export default function LandingPage() {
    const prevSection = useRef({ index: 0, value: "", width: 0, translateX: 0 });
    const [activeSection, setActiveSection] = useState({ index: -1, value: "", width: 0, translateX: 0 });

    const chooseSection = (index: number, changePrevSectionToo?: boolean) => {
        if(activeSection.index === index) return;

        const newActiveSection = { index: 0, value: "", width: 0, translateX: 0 };
        const sectionButtons = document.getElementsByClassName('section-btn');

        for(let i = 0; i < sectionButtons.length; i++) {
            const element = sectionButtons[i];
            if(i > index) break;
                        
            newActiveSection.index = i;
            newActiveSection.value = (element as HTMLButtonElement).value;
            newActiveSection.width = (element as HTMLButtonElement).offsetWidth;
            newActiveSection.translateX += i === 0 ? 0 : ((sectionButtons[i - 1] as HTMLButtonElement).offsetWidth);
        };

        setActiveSection(newActiveSection);
        if(changePrevSectionToo) prevSection.current = newActiveSection;
    };
    
    const selectSectionWhileInView = (index: number) => {
        chooseSection(index, true);
    };
    

    return (
        <div style={{ '--blue': "#3b5fcd", '--purple': '#79aaff', '--light-blue': "#a7bce4" } as React.CSSProperties} className="bg-[] min-h-screen bg-gray-100 font-montserrat text-gray-800">
           <Header prevSection={prevSection} activeSection={activeSection} chooseSection={chooseSection} />
            <div className="my-0 mx-auto max-w-[var(--big-max-width)]">
                <Intro selectSectionWhileInView={selectSectionWhileInView} />
                <DeviceDemo />
                <Demo selectSectionWhileInView={selectSectionWhileInView} />
                <Features />
                <AdditionalFeatures selectSectionWhileInView={selectSectionWhileInView} />
                <Users />
                <FAQs selectSectionWhileInView={selectSectionWhileInView} />
                <AboutDeveloper />
            </div>
            <Footer />
        </div>
    )
}