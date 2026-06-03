"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const origins = [
  {
    id: 1,
    name: "Yirgacheffe, Ethiopia",
    elevation: "2,000m",
    notes: ["Jasmine", "Bergamot", "Black Tea"],
    bgImage: "https://images.unsplash.com/photo-1518057111178-44a106bad636?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Huila, Colombia",
    elevation: "1,750m",
    notes: ["Dark Chocolate", "Plum", "Brown Sugar"],
    bgImage: "https://images.unsplash.com/photo-1524350876685-274059332607?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Kona, Hawaii",
    elevation: "1,200m",
    notes: ["Macadamia", "Caramel", "Volcanic Earth"],
    bgImage: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=1000&auto=format&fit=crop"
  }
];

export default function Origin() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 bg-carbon relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
        <svg className="w-[150%] h-[150%]" viewBox="0 0 100 100" preserveAspectRatio="none">
           <path d="M0,50 Q25,25 50,50 T100,50" stroke="var(--gold-muted)" strokeWidth="0.2" fill="none" />
           <path d="M0,70 Q25,45 50,70 T100,70" stroke="var(--gold-muted)" strokeWidth="0.2" fill="none" />
        </svg>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <span className="text-gold-muted font-inter tracking-[0.3em] text-micro uppercase mb-4 block">The Source</span>
            <h2 className="font-playfair text-display font-bold text-cream uppercase leading-none">
              Born from<br />Volcanic Ash
            </h2>
          </div>
          <button className="group flex items-center space-x-2 text-parchment hover:text-gold-bright transition-colors mt-8 md:mt-0 pb-2 border-b border-white-10 hover:border-gold-bright">
            <span className="font-inter text-caption tracking-widest uppercase">Explore All Origins</span>
            <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          {origins.map((origin, i) => (
            <div 
              key={origin.id}
              ref={el => { cardsRef.current[i] = el }}
              className="group relative h-[500px] w-full overflow-hidden border border-white-5 hover:border-gold-muted transition-colors duration-500 cursor-pointer"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                style={{ backgroundImage: `url('${origin.bgImage}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-black via-obsidian-black/60 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-gold-bright font-inter text-micro tracking-[0.2em] uppercase block mb-2">{origin.elevation}</span>
                  <h3 className="font-playfair text-title text-cream mb-4">{origin.name}</h3>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <div className="h-px w-full bg-white-10 mb-4" />
                    <p className="font-inter text-caption text-parchment tracking-widest uppercase">
                      {origin.notes.join(" • ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}