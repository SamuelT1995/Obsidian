"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const methods = [
  { id: "espresso", name: "Espresso", ratio: "1:2", grind: "Fine", time: "25-30s", desc: "For those who want to taste the soul of the bean compressed into liquid velvet." },
  { id: "pourover", name: "Pour Over", ratio: "1:15", grind: "Medium", time: "3:00m", desc: "A meditation in water and gravity. Crisp, clean, unapologetic." },
  { id: "french", name: "French Press", ratio: "1:12", grind: "Coarse", time: "4:00m", desc: "Heavy body. Thick texture. The most brutal and satisfying extraction." }
];

export default function Brew() {
  const [active, setActive] = useState(methods[0]);

  return (
    <section className="py-32 bg-carbon">
      <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row gap-16">
        <div className="w-full md:w-1/3">
          <span className="text-gold-muted font-inter tracking-[0.3em] text-micro uppercase mb-4 block">Preparation</span>
          <h2 className="font-playfair text-title text-cream uppercase mb-12">Brew Specs</h2>
          <div className="flex flex-col space-y-4">
            {methods.map(m => (
              <button 
                key={m.id}
                onClick={() => setActive(m)}
                className={`text-left font-inter tracking-widest uppercase text-caption transition-colors duration-300 ${active.id === m.id ? 'text-gold-bright' : 'text-white-20 hover:text-parchment'}`}
              >
                {m.name}
              </button>
            ))}
          </div>
        </div>
        <div className="w-full md:w-2/3 min-h-[300px] border border-white-5 p-8 md:p-16 relative">
          <AnimatePresence mode="wait">
            <motion.div 
              key={active.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-playfair text-headline text-cream mb-6">{active.name}</h3>
              <p className="font-inter text-body text-parchment mb-12 max-w-lg">{active.desc}</p>
              
              <div className="grid grid-cols-3 gap-6 border-t border-white-10 pt-8">
                <div>
                  <span className="block font-inter text-micro text-white-20 uppercase tracking-widest mb-2">Ratio</span>
                  <span className="font-cormorant text-2xl text-gold-muted">{active.ratio}</span>
                </div>
                <div>
                  <span className="block font-inter text-micro text-white-20 uppercase tracking-widest mb-2">Grind</span>
                  <span className="font-cormorant text-2xl text-gold-muted">{active.grind}</span>
                </div>
                <div>
                  <span className="block font-inter text-micro text-white-20 uppercase tracking-widest mb-2">Time</span>
                  <span className="font-cormorant text-2xl text-gold-muted">{active.time}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}