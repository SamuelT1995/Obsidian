"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const containerRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLHeadingElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const quoteText = "For those who refuse to dilute their ambition with mediocrity.";
  const words = quoteText.split(" ");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background Parallax
      gsap.to(bgRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // Scrubbed word-by-word reveal
      gsap.fromTo(".quote-word", 
        { opacity: 0.1, color: "var(--carbon)" },
        { 
          opacity: 1, 
          color: "var(--obsidian-black)",
          stagger: 0.1, 
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "center center",
            scrub: 1 // smooth scrubbing
          }
        }
      );
      
      // Reveal the body text after the quote
      gsap.fromTo(".body-text",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "center 55%",
            end: "bottom 80%",
            scrub: 1
          }
        }
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="manifesto" ref={containerRef} className="relative py-48 overflow-hidden z-20 flex flex-col items-center justify-center px-6 min-h-[120vh]">
      {/* Immersive Light Background */}
      <div ref={bgRef} className="absolute inset-0 -top-[20%] w-full h-[140%] z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-10" />
      </div>
      
      <div className="absolute inset-0 bg-parchment/95 backdrop-blur-sm z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-parchment via-transparent to-parchment z-10" />

      <div className="relative max-w-4xl mx-auto flex flex-col items-center text-center z-20">
        <span className="text-gold-muted font-inter tracking-[0.4em] text-micro uppercase mb-16 opacity-80">The Manifesto</span>
        
        <h2 ref={quoteRef} className="font-cormorant italic text-[clamp(32px,5vw,72px)] leading-tight mb-16 drop-shadow-sm flex flex-wrap justify-center gap-x-4">
          {words.map((word, i) => (
            <span key={i} className="quote-word transition-colors duration-200">
              {word}
            </span>
          ))}
        </h2>
        
        <p className="body-text font-inter text-body-lg text-carbon max-w-2xl leading-relaxed font-light">
          We don't roast for the masses. We roast for the obsessive. The ones who measure their water temperature to the degree, who weigh their beans to the tenth of a gram. Obsidian is sourced from the rarest volcanic soils on earth, bringing you a cup that is dark, unforgiving, and absolutely perfect.
        </p>
      </div>
    </section>
  );
}