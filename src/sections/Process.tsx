"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { id: "01", title: "Selection", desc: "We sample hundreds of lots, selecting only those grown in high-altitude volcanic soil. We accept less than 1% of what we taste." },
  { id: "02", title: "Relationship", desc: "Direct trade isn't a buzzword. We know the farmers, their families, and the exact slope where our beans are harvested." },
  { id: "03", title: "Roasting", desc: "Our cast-iron roasters apply aggressive heat curves to develop deep, complex sugars without turning to ash. It is a violent, beautiful process." },
  { id: "04", title: "Packaging", desc: "Flushed with nitrogen and sealed in absolute darkness. The coffee you open is as fresh as the moment it left the cooling tray." }
];

export default function Process() {
  const containerRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      stepsRef.current.forEach((step, i) => {
        gsap.fromTo(step, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: step, start: "top 80%" } });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 bg-carbon relative border-t border-white-5">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-24 text-center">
          <span className="text-gold-muted font-inter tracking-[0.3em] text-micro uppercase mb-4 block">The Process</span>
          <h2 className="font-playfair text-display font-bold text-cream uppercase leading-none">An Obsessive<br/>Pursuit</h2>
        </div>
        
        <div className="max-w-5xl mx-auto flex flex-col space-y-32">
          {steps.map((step, i) => (
            <div key={step.id} ref={el => { stepsRef.current[i] = el }} className={`relative flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24`}>
              {/* Giant Number */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] md:text-[25rem] font-playfair font-bold text-white-5 select-none pointer-events-none z-0">
                {step.id}
              </div>
              
              <div className="w-full md:w-1/2 z-10 flex justify-center">
                <div className="w-full max-w-sm aspect-square bg-obsidian-black border border-white-5 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
              
              <div className={`w-full md:w-1/2 z-10 ${i % 2 === 0 ? 'text-left' : 'md:text-right text-left'}`}>
                <span className="font-inter text-gold-bright tracking-widest uppercase text-micro block mb-4">Step {step.id}</span>
                <h3 className="font-playfair text-headline text-cream mb-6">{step.title}</h3>
                <p className="font-inter text-body text-parchment leading-relaxed max-w-md inline-block">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}