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
    title: "Processing", 
    desc: "The cherries are meticulously washed, fermented, and sun-dried on raised beds to ensure an immaculate, clean profile before shipping.",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop"
  },
  { 
    id: "03", 
    title: "Roasting", 
    desc: "Our cast-iron roasters apply aggressive heat curves to develop deep, complex sugars without turning to ash.",
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

      const panels = gsap.utils.toArray<HTMLElement>(".process-panel");
      const totalDistance = (panels.length - 1) * window.innerWidth;

      gsap.to(trackRef.current, {
        x: () => -totalDistance,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 0.5,
          end: () => "+=" + totalDistance,
          invalidateOnRefresh: true,
        }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-carbon h-screen overflow-hidden relative">
      {/* Section header */}
      <div className="absolute top-8 left-8 lg:left-16 z-20 pointer-events-none">
        <span className="text-gold-bright font-inter tracking-[0.4em] text-micro uppercase block">The Process</span>
        <h2 className="font-playfair text-[clamp(20px,2.5vw,40px)] font-bold text-cream uppercase leading-none drop-shadow-xl mt-3">An Obsessive Pursuit</h2>
      </div>

      {/* Horizontal track */}
      <div ref={trackRef} className="flex items-center h-full will-change-transform">
        {steps.map((step) => (
          <div 
            key={step.id} 
            className="process-panel flex-none w-screen h-screen flex items-center justify-center px-8 md:px-20 relative group"
          >
            {/* Giant background number */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <span className="text-[25vw] font-playfair font-bold text-white/[0.03] leading-none">
                {step.id}
              </span>
            </div>

            {/* Card content — image left, text right, everything constrained to 50vh max */}
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-16 w-full max-w-5xl mx-auto">
              {/* Image — constrained height so it never overflows */}
              <div className="w-full md:w-[40%] flex-shrink-0 h-[45vh] overflow-hidden shadow-2xl border border-white/10 relative">
                <img 
                  src={step.image} 
                  alt={step.title} 
                  className="absolute inset-0 w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-black/60 via-transparent to-transparent" />
              </div>
              
              {/* Text */}
              <div className="w-full md:w-[60%]">
                <span className="font-inter text-gold-bright tracking-widest uppercase text-micro block mb-4">Phase {step.id}</span>
                <h3 className="font-playfair text-[clamp(28px,3.5vw,48px)] text-cream mb-5 drop-shadow-md leading-tight">{step.title}</h3>
                <p className="font-inter text-[clamp(14px,1.1vw,17px)] text-parchment leading-relaxed font-light max-w-md">
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