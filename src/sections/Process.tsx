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
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollWidth = scrollWrapperRef.current?.scrollWidth || window.innerWidth * 4;
      const windowWidth = window.innerWidth;

      // Pin the section and scroll horizontally
      gsap.to(scrollWrapperRef.current, {
        x: -(scrollWidth - windowWidth),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1, // smooth scrubbing
          end: () => "+=" + (scrollWidth - windowWidth)
        }
      });
      
      // Image scale effect within the horizontal scroll
      gsap.utils.toArray(".process-image").forEach((img: any) => {
        gsap.to(img, {
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            scrub: true,
            start: "top top",
            end: () => "+=" + scrollWidth
          }
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-carbon overflow-hidden h-screen flex flex-col">
      <div className="absolute top-12 left-6 lg:left-12 z-20">
        <span className="text-gold-bright font-inter tracking-[0.4em] text-micro uppercase block">The Process</span>
        <h2 className="font-playfair text-[clamp(24px,3vw,48px)] font-bold text-cream uppercase leading-none drop-shadow-xl mt-4">An Obsessive Pursuit</h2>
      </div>

      <div ref={scrollWrapperRef} className="flex h-full w-[400vw] items-center">
        {steps.map((step) => (
          <div key={step.id} className="w-[100vw] h-full flex flex-col justify-center px-12 md:px-24 relative overflow-hidden group">
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-playfair font-bold text-white-5 select-none pointer-events-none z-0 tracking-tighter opacity-50">
              {step.id}
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-16 md:gap-32 w-full max-w-6xl mx-auto">
              <div className="w-full md:w-1/2 overflow-hidden shadow-2xl aspect-[4/5] border border-white-10 relative">
                <img 
                  src={step.image} 
                  alt={step.title} 
                  className="process-image absolute inset-0 w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-black/80 via-transparent to-transparent opacity-80" />
              </div>
              
              <div className="w-full md:w-1/2 backdrop-blur-md bg-carbon/50 p-10 border border-white-5 rounded-sm">
                <span className="font-inter text-gold-bright tracking-widest uppercase text-micro block mb-6">Phase {step.id}</span>
                <h3 className="font-playfair text-[clamp(32px,4vw,56px)] text-cream mb-8 drop-shadow-md">{step.title}</h3>
                <p className="font-inter text-[clamp(16px,1.5vw,20px)] text-parchment leading-relaxed font-light">
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