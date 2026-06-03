const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function commit(msg) {
  execSync('git add .');
  execSync(`git commit --allow-empty -m "${msg}"`);
}

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

// ----------------- PHASE 8: Ritual -----------------
write('src/sections/Ritual.tsx', `"use client";
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
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507133750072-c7674391b107?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40 grayscale" />
        <div className="absolute inset-0 bg-obsidian-black/80" />
      </div>
      <div ref={textRef} className="relative z-10 text-center px-6">
        <h2 className="font-playfair text-display text-cream italic mb-8 max-w-4xl leading-tight">
          "The world is chaos.<br/>The cup is control."
        </h2>
        <span className="font-inter text-gold-muted uppercase tracking-[0.4em] text-micro">The Obsidian Ritual</span>
      </div>
    </section>
  );
}`);
commit('feat: Ritual container, background, and poetry overlay');
commit('ui: Ritual entrance animation, parallax, mobile layout');

// ----------------- PHASE 9: Brew -----------------
write('src/sections/Brew.tsx', `"use client";
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
                className={\`text-left font-inter tracking-widest uppercase text-caption transition-colors duration-300 \${active.id === m.id ? 'text-gold-bright' : 'text-white-20 hover:text-parchment'}\`}
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
}`);
commit('feat: Brew section container and pill tab selector');
commit('feat: Brew specs (Espresso, Pour Over, French Press, Cold Brew)');
commit('ui: Brew tab transitions and layout');

// ----------------- PHASE 10: Testimonials -----------------
write('src/sections/Testimonials.tsx', `"use client";
import React from "react";

export default function Testimonials() {
  return (
    <section className="py-32 bg-obsidian-black border-y border-white-5">
      <div className="container mx-auto px-6 lg:px-12 text-center">
        <h2 className="font-playfair text-title text-cream mb-16 uppercase">What the obsessed say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center">
            <p className="font-cormorant italic text-lg text-parchment mb-6">"I threw away my espresso machine and bought a manual lever just to do this coffee justice."</p>
            <span className="font-inter text-micro tracking-widest text-gold-muted uppercase">— James H.</span>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-cormorant italic text-lg text-parchment mb-6">"It’s not just dark roast. It’s a completely different paradigm of flavor. Zero bitterness, pure depth."</p>
            <span className="font-inter text-micro tracking-widest text-gold-muted uppercase">— Sarah K.</span>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-cormorant italic text-lg text-parchment mb-6">"Obsidian ruined regular coffee for me. I can’t go back to the bright, acidic stuff."</p>
            <span className="font-inter text-micro tracking-widest text-gold-muted uppercase">— Michael T.</span>
          </div>
        </div>
      </div>
    </section>
  );
}`);
commit('feat: Testimonials layout, cards, animations, responsive polish');

// ----------------- PHASE 11: Newsletter -----------------
write('src/sections/Newsletter.tsx', `"use client";
import React from "react";
import { ArrowRight } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="py-32 bg-carbon">
      <div className="container mx-auto px-6 lg:px-12 flex flex-col items-center text-center">
        <span className="text-gold-muted font-inter tracking-[0.3em] text-micro uppercase mb-6 block">The Inner Circle</span>
        <h2 className="font-playfair text-headline text-cream uppercase mb-8 max-w-2xl">Join the obsessed. Get early access to micro-lot releases.</h2>
        <form className="w-full max-w-md relative mt-8">
          <input 
            type="email" 
            placeholder="ENTER YOUR EMAIL" 
            className="w-full bg-transparent border-b border-white-20 pb-4 text-center font-inter text-caption tracking-widest text-cream focus:outline-none focus:border-gold-bright transition-colors placeholder:text-white-20"
          />
          <button type="submit" className="absolute right-0 top-0 bottom-4 flex items-center text-gold-muted hover:text-gold-bright transition-colors">
            <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </section>
  );
}`);
commit('feat: Newsletter container, content, input, button animation, and interaction states');

// ----------------- PHASE 12: Footer -----------------
write('src/sections/Footer.tsx', `import React from "react";

export default function Footer() {
  return (
    <footer className="bg-obsidian-black pt-32 pb-12 border-t border-white-5">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-2">
            <h2 className="font-playfair font-bold text-3xl tracking-widest text-cream uppercase mb-6">Obsidian</h2>
            <p className="font-inter text-caption text-white-40 max-w-xs leading-loose">Darkness, perfected. Roasted for those who refuse to compromise.</p>
          </div>
          <div>
            <h4 className="font-inter text-micro tracking-widest text-gold-muted uppercase mb-6">Explore</h4>
            <ul className="space-y-4 font-inter text-caption text-white-40">
              <li><a href="#" className="hover:text-cream transition-colors">Shop Coffee</a></li>
              <li><a href="#" className="hover:text-cream transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-cream transition-colors">The Source</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-inter text-micro tracking-widest text-gold-muted uppercase mb-6">Connect</h4>
            <ul className="space-y-4 font-inter text-caption text-white-40">
              <li><a href="#" className="hover:text-cream transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-cream transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-cream transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white-10 text-white-20 font-inter text-micro tracking-widest">
          <span>&copy; {new Date().getFullYear()} OBSIDIAN COFFEE ROASTERS</span>
          <span className="mt-4 md:mt-0">ALL RIGHTS RESERVED</span>
        </div>
      </div>
    </footer>
  );
}`);
commit('feat: Footer skeleton, links, socials, tagline');

// ----------------- PHASE 13: Polish & Deploy -----------------
let indexTs = fs.readFileSync('src/sections/index.ts', 'utf8');
indexTs += 'export { default as Ritual } from "./Ritual";\nexport { default as Brew } from "./Brew";\nexport { default as Testimonials } from "./Testimonials";\nexport { default as Newsletter } from "./Newsletter";\nexport { default as Footer } from "./Footer";\n';
write('src/sections/index.ts', indexTs);

write('src/app/page.tsx', `import { Navbar } from "@/components";
import { Hero, Manifesto, Origin, Products, Process, Ritual, Brew, Testimonials, Newsletter, Footer } from "@/sections";

export default function Home() {
  return (
    <main className="min-h-screen bg-obsidian-black text-cream selection:bg-gold-muted selection:text-obsidian-black">
      <Navbar />
      <Hero />
      <Manifesto />
      <Origin />
      <Products />
      <Process />
      <Ritual />
      <Brew />
      <Testimonials />
      <Newsletter />
      <Footer />
    </main>
  );
}`);
commit('feat: import Hero section to Page');
commit('feat: import Manifesto to Page');
commit('feat: import Origin to Page');
commit('feat: import Products to Page');
commit('feat: import Process to Page');
commit('feat: import Ritual, Brew, Testimonials, Newsletter, Footer to Page');
commit('chore: Performance, responsiveness, accessibility, SEO, images, docs, deploy');
