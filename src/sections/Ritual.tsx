"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Ritual() {
  const containerRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const quoteText = "The world is chaos. The cup is control.";
  const words = quoteText.split(" ");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Zoom-in transition for the entire cream section
      gsap.fromTo(wrapperRef.current, 
        { scale: 0.3, borderRadius: "100vw", opacity: 0 },
        { 
          scale: 1, 
          borderRadius: "0px",
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: { 
            trigger: containerRef.current, 
            start: "top bottom", 
            end: "top top", 
            scrub: 1
          }
        }
      );

      // Scrubbed word-by-word reveal
      gsap.fromTo(".ritual-word", 
        { opacity: 0.1, y: 30, color: "var(--carbon)" },
        { 
          opacity: 1, 
          y: 0,
          color: "var(--obsidian-black)",
          stagger: 0.1, 
          scrollTrigger: { 
            trigger: containerRef.current, 
            start: "top 40%", 
            end: "center center", 
            scrub: true
          }
        }
      );

      // Reveal the subtitle
      gsap.fromTo(".ritual-sub", 
        { opacity: 0, tracking: "0.2em" }, 
        { 
          opacity: 0.8, 
          tracking: "0.4em", 
          duration: 1.5, 
          scrollTrigger: { 
            trigger: containerRef.current, 
            start: "center 70%",
            end: "center center",
            scrub: true
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-obsidian-black z-30">
      {/* The zooming wrapper */}
      <div ref={wrapperRef} className="relative w-full h-full flex items-center justify-center overflow-hidden origin-center will-change-transform bg-parchment">
        
        {/* Subtle background texture */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507133750072-c7674391b107?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 grayscale" />
        </div>
        
        {/* Text content */}
        <div ref={textRef} className="relative z-10 text-center px-6">
          <h2 className="font-playfair text-[clamp(32px,5vw,80px)] text-obsidian-black italic mb-8 max-w-4xl leading-tight drop-shadow-sm flex flex-wrap justify-center gap-x-4">
            <span className="ritual-word transition-colors duration-200">"</span>
            {words.map((word, i) => (
              <span key={i} className="ritual-word transition-colors duration-200">
                {word}
              </span>
            ))}
            <span className="ritual-word transition-colors duration-200">"</span>
          </h2>
          <span className="ritual-sub font-inter text-carbon uppercase text-micro block">The Obsidian Ritual</span>
        </div>

      </div>
    </section>
  );
}