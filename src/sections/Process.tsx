"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { 
    id: "01", 
    title: "Selection", 
    desc: "We sample hundreds of lots, selecting only those grown in high-altitude volcanic soil. We accept less than 1% of what we taste.",
    image: "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?q=80&w=1000&auto=format&fit=crop"
  },
  { 
    id: "02", 
    title: "Relationship", 
    desc: "Direct trade isn't a buzzword. We know the farmers, their families, and the exact slope where our beans are harvested.",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop"
  },
  { 
    id: "03", 
    title: "Roasting", 
    desc: "Our cast-iron roasters apply aggressive heat curves to develop deep, complex sugars without turning to ash. It is a violent, beautiful process.",
    image: "https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?q=80&w=1000&auto=format&fit=crop"
  },
  { 
    id: "04", 
    title: "Packaging", 
    desc: "Flushed with nitrogen and sealed in absolute darkness. The coffee you open is as fresh as the moment it left the cooling tray.",
    image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=1000&auto=format&fit=crop"
  }
];

export default function Process() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!trackRef.current || !containerRef.current) return;

      const totalPanels = steps.length;
      const panelWidth = window.innerWidth;
      const totalScroll = panelWidth * (totalPanels - 1); // We only scroll (n-1) panels

      gsap.to(trackRef.current, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          pinType: "transform",
          scrub: 0.8,
          anticipatePin: 1,
          // The scroll distance matches exactly the panels we need to move
          end: () => "+=" + totalScroll,
          // Prevents the shake by disabling fast scrolling overcompensation
          fastScrollEnd: true,
          preventOverlaps: true,
        }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative bg-carbon overflow-hidden" style={{ height: '100vh' }}>
      {/* Section header — positioned absolute so it's always visible */}
      <div className="absolute top-8 left-8 lg:left-16 z-20 pointer-events-none">
        <span className="text-gold-bright font-inter tracking-[0.4em] text-micro uppercase block">The Process</span>
        <h2 className="font-playfair text-[clamp(20px,2.5vw,40px)] font-bold text-cream uppercase leading-none drop-shadow-xl mt-3">An Obsessive Pursuit</h2>
      </div>

      {/* Horizontal scrolling track */}
      <div 
        ref={trackRef} 
        className="flex h-full will-change-transform"
        style={{ width: `${steps.length * 100}vw` }}
      >
        {steps.map((step) => (
          <div 
            key={step.id} 
            className="flex items-center justify-center px-8 md:px-16 lg:px-24 relative group"
            style={{ width: '100vw', height: '100vh', flexShrink: 0 }}
          >
            {/* Giant background number */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-playfair font-bold text-white/[0.03] select-none pointer-events-none z-0 leading-none">
              {step.id}
            </div>

            {/* Content: image + text side by side, properly sized */}
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 md:gap-20 w-full max-w-5xl mx-auto">
              {/* Image */}
              <div className="w-full md:w-[45%] overflow-hidden shadow-2xl border border-white/10 relative flex-shrink-0" style={{ aspectRatio: '3/4', maxHeight: '65vh' }}>
                <img 
                  src={step.image} 
                  alt={step.title} 
                  className="absolute inset-0 w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-black/70 via-transparent to-transparent" />
              </div>
              
              {/* Text */}
              <div className="w-full md:w-[55%] p-6 md:p-10">
                <span className="font-inter text-gold-bright tracking-widest uppercase text-micro block mb-5">Phase {step.id}</span>
                <h3 className="font-playfair text-[clamp(28px,3.5vw,48px)] text-cream mb-6 drop-shadow-md leading-tight">{step.title}</h3>
                <p className="font-inter text-[clamp(14px,1.2vw,18px)] text-parchment leading-relaxed font-light max-w-md">
                  {step.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}