"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Ritual() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "bottom top", scrub: true }
      });
      gsap.fromTo(textRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.5, scrollTrigger: { trigger: containerRef.current, start: "top 60%" }});
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div ref={bgRef} className="absolute inset-0 -top-[20%] h-[140%] w-full">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507133750072-c7674391b107?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 grayscale" />
        <div className="absolute inset-0 bg-parchment/95" />
      </div>
      <div ref={textRef} className="relative z-10 text-center px-6">
        <h2 className="font-playfair text-display text-obsidian-black italic mb-8 max-w-4xl leading-tight drop-shadow-sm">
          "The world is chaos.<br/>The cup is control."
        </h2>
        <span className="font-inter text-carbon uppercase tracking-[0.4em] text-micro opacity-80">The Obsidian Ritual</span>
      </div>
    </section>
  );
}