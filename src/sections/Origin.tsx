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
    bgImage: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1000&auto=format&fit=crop"
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
        if (!card) return;
        
        // Staggered Deep Mask Reveal
        gsap.fromTo(
          card,
          { clipPath: "inset(100% 0% 0% 0%)", y: 100 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            duration: 1.5,
            delay: i * 0.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
            }
          }
        );

        // Deep Parallax for the internal text overlay
        const content = card.querySelector('.origin-content');
        if (content) {
          gsap.fromTo(content, 
            { y: 80 }, 
            { 
              y: -30, 
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: true
              }
            }
          );
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="origin" ref={containerRef} className="py-32 bg-obsidian-black relative overflow-hidden z-20">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
        <svg className="w-[150%] h-[150%]" viewBox="0 0 100 100" preserveAspectRatio="none">
           <path d="M0,50 Q25,25 50,50 T100,50" stroke="var(--gold-muted)" strokeWidth="0.2" fill="none" />
           <path d="M0,70 Q25,45 50,70 T100,70" stroke="var(--gold-muted)" strokeWidth="0.2" fill="none" />
        </svg>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <span className="text-gold-muted font-inter tracking-[0.3em] text-micro uppercase mb-4 block">The Source</span>
            <h2 className="font-playfair text-display font-bold text-cream uppercase leading-none drop-shadow-lg">
              Born from<br />Volcanic Ash
            </h2>
          </div>
          <button className="group flex items-center space-x-4 text-parchment hover:text-gold-bright transition-colors mt-8 md:mt-0 pb-2 border-b border-white-10 hover:border-gold-bright">
            <span className="font-inter text-caption tracking-widest uppercase">Explore All Origins</span>
            <ArrowRight size={18} className="transform group-hover:translate-x-2 transition-transform duration-300" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {origins.map((origin, i) => (
            <div 
              key={origin.id}
              ref={el => { cardsRef.current[i] = el }}
              className="group relative h-[600px] w-full overflow-hidden shadow-2xl bg-carbon"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] ease-out group-hover:scale-110"
                style={{ backgroundImage: `url('${origin.bgImage}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-black via-obsidian-black/50 to-transparent opacity-90 transition-opacity duration-[2s]" />
              
              <div className="origin-content absolute inset-0 p-10 flex flex-col justify-end text-center z-10 pointer-events-none">
                <span className="text-gold-bright font-inter text-micro tracking-[0.3em] uppercase block mb-4 origin-bottom transform transition-transform duration-700 group-hover:-translate-y-2">{origin.elevation}</span>
                <h3 className="font-playfair text-[clamp(24px,3vw,36px)] text-cream mb-6 drop-shadow-xl transform transition-transform duration-700 delay-75 group-hover:-translate-y-2">{origin.name}</h3>
                
                <div className="overflow-hidden">
                  <div className="h-px w-16 mx-auto bg-gold-muted/50 mb-6 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
                  <p className="font-inter text-caption text-parchment tracking-widest uppercase opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-150">
                    {origin.notes.join(" • ")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}