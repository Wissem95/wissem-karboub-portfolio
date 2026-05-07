"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import PageLoader from "@/components/PageLoader";
import SmoothScroll from "@/components/SmoothScroll";
import GrainOverlay from "@/components/GrainOverlay";
import Marquee from "@/components/Marquee";
import SectionDivider from "@/components/SectionDivider";
import ScrollProgress from "@/components/ScrollProgress";
import CursorTrail from "@/components/CursorTrail";
import SectionReveal from "@/components/SectionReveal";
import { marqueeItems } from "@/lib/data";

const MeshGradient = dynamic(() => import("@/components/MeshGradient"), {
  ssr: false,
});

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }

    document.documentElement.style.overflow = "hidden";
    const t = setTimeout(() => {
      setLoaded(true);
      document.documentElement.style.overflow = "";
      window.scrollTo(0, 0);
    }, 2200);
    return () => {
      clearTimeout(t);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <>
      <AnimatePresence>{!loaded && <PageLoader />}</AnimatePresence>
      <MeshGradient />
      <CursorTrail />
      <CustomCursor />
      <GrainOverlay />
      <ScrollProgress />
      <SmoothScroll>
        <Navbar />
        <main>
          <Hero />
          <Marquee items={marqueeItems} speed={45} />
          <SectionReveal>
            <About />
          </SectionReveal>
          <SectionDivider />
          <SectionReveal>
            <Experience />
          </SectionReveal>
          <Marquee items={marqueeItems} speed={50} reverse />
          <Projects />
          <SectionDivider />
          <SectionReveal>
            <Skills />
          </SectionReveal>
          <SectionReveal>
            <Contact />
          </SectionReveal>
          <FAQ />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
