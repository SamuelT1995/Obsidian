"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const products = [
  { id: 1, name: "The Void", price: "$32", notes: "Dark Chocolate, Black Cherry, Smoke", image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=800&auto=format&fit=crop" },
  { id: 2, name: "Ember", price: "$28", notes: "Caramel, Toasted Almond, Vanilla", image: "https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?q=80&w=800&auto=format&fit=crop" },
  { id: 3, name: "First Light", price: "$26", notes: "Jasmine, Peach, Honey", image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?q=80&w=800&auto=format&fit=crop" },
  { id: 4, name: "The Ritual", price: "$40", notes: "Blueberry, Cacao Nibs, Wine", image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop" }
];

export default function Products() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: titleRef.current, start: "top 80%" } });
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(card, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: card, start: "top 85%" } });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="products" ref={containerRef} className="py-32 bg-obsidian-black relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div ref={titleRef} className="mb-20 text-center">
          <span className="text-gold-muted font-inter tracking-[0.3em] text-micro uppercase mb-4 block">The Collection</span>
          <h2 className="font-playfair text-display font-bold text-cream uppercase leading-none">Unforgivingly Dark</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, i) => (
            <div key={product.id} ref={el => { cardsRef.current[i] = el }} className="group cursor-pointer">
              <div className="relative aspect-[3/4] bg-carbon mb-6 overflow-hidden flex items-center justify-center group-hover:-translate-y-2 transition-transform duration-500 border border-transparent group-hover:border-white-5">
                <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500 bg-cover bg-center" style={{ backgroundImage: `url('${product.image}')` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-black via-transparent to-transparent opacity-80" />
                <div className="relative z-10 w-32 h-48 bg-obsidian-black border border-white-10 shadow-2xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-700">
                  <span className="font-cormorant italic text-gold-muted text-xl">{product.name.split(' ')[0]}</span>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-obsidian-black/90 backdrop-blur-sm border-t border-white-10 flex items-center justify-between">
                  <span className="font-inter text-micro tracking-widest text-parchment uppercase">{product.notes}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-playfair text-title text-cream">{product.name}</h3>
                  <p className="font-inter text-caption text-gold-muted mt-1">{product.price}</p>
                </div>
                <button className="w-10 h-10 rounded-full border border-white-10 flex items-center justify-center text-cream hover:bg-gold-bright hover:text-obsidian-black hover:border-gold-bright transition-colors">
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