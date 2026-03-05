import { useEffect, useMemo, useState } from "react";
import { NavBar } from "./components/NavBar";
import { SiteFooter } from "./components/SiteFooter";
import { events } from "./data/events";
import { navItems } from "./data/site";
import { type SectionId } from "./types/content";
import { AboutSection } from "./sections/AboutSection";
import { AgendaSection } from "./sections/AgendaSection";
import { ContactSection } from "./sections/ContactSection";
import { FaqSection } from "./sections/FaqSection";
import { HeroSection } from "./sections/HeroSection";
import { PhotosSection } from "./sections/PhotosSection";

function App() {
  const [activeSection, setActiveSection] = useState<SectionId>("sobre");

  const sortedEvents = useMemo(
    () => [...events].sort((a, b) => a.dateISO.localeCompare(b.dateISO)),
    [],
  );

  useEffect(() => {
    const trackedSections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section !== null);

    if (trackedSections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const topEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (topEntry) {
          setActiveSection(topEntry.target.id as SectionId);
        }
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      },
    );

    trackedSections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="app" id="top">
      <NavBar items={navItems} activeSection={activeSection} />
      <main>
        <HeroSection />
        <AboutSection />
        <AgendaSection events={sortedEvents} />
        <PhotosSection />
        <FaqSection />
        <ContactSection />
      </main>
      <SiteFooter items={navItems} />
    </div>
  );
}

export default App;
