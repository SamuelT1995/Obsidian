"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const products = [
  { id: 1, name: "The Void", price: "$32", notes: "Dark Chocolate, Black Cherry, Smoke", image: "/products/the-void.png" },
  { id: 2, name: "Ember", price: "$28", notes: "Caramel, Toasted Almond, Vanilla", image: "/products/ember.png" },
  { id: 3, name: "First Light", price: "$26", notes: "Jasmine, Peach, Honey", image: "/products/first-light.png" },
  { id: 4, name: "The Ritual", price: "$40", notes: "Blueberry, Cacao Nibs, Wine", image: "/products/the-ritual.png" }
];

export default function Products() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: titleRef.current, start: "top 80%" } });
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(card, 
          { opacity: 0, y: 80, scale: 0.95 }, 
          { 
            opacity: 1, y: 0, scale: 1, duration: 1, 
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 90%" } 
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="products" ref={containerRef} className="py-32 bg-obsidian-black relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div ref={titleRef} className="mb-20 text-center">
          <span className="text-gold-muted font-inter tracking-[0.3em] text-micro uppercase mb-4 block">The Collection</span>
          <h2 className="font-playfair text-display font-bold text-cream uppercase leading-none">Curated Offerings</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, i) => (
            <div key={product.id} ref={el => { cardsRef.current[i] = el }} className="group cursor-pointer">
              {/* Product Image Card */}
              <div className="relative aspect-[3/4] bg-carbon mb-6 overflow-hidden flex items-center justify-center group-hover:-translate-y-3 transition-all duration-700 border border-white-5 group-hover:border-gold-muted/30 group-hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">
                {/* The actual coffee bag image */}
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="relative z-10 w-[85%] h-[85%] object-contain transform group-hover:scale-110 transition-transform duration-1000 ease-out drop-shadow-2xl" 
                />
                
                {/* Subtle radial glow behind the bag */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,169,110,0.06)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Tasting notes reveal on hover */}
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out bg-obsidian-black/90 backdrop-blur-sm border-t border-white-10">
                  <span className="font-inter text-micro tracking-widest text-parchment uppercase">{product.notes}</span>
                </div>
              </div>
              
              {/* Product Info */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-playfair text-title text-cream group-hover:text-gold-bright transition-colors duration-500">{product.name}</h3>
                  <p className="font-inter text-caption text-gold-muted mt-1">{product.price}</p>
                </div>
                <button className="w-10 h-10 rounded-full border border-white-10 flex items-center justify-center text-cream hover:bg-gold-bright hover:text-obsidian-black hover:border-gold-bright transition-all duration-300 hover:scale-110">
                  <Plus size={16} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}