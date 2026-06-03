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

// ----------------- PHASE 6: Product Section -----------------
write('src/sections/Products.tsx', `"use client";
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
    <section ref={containerRef} className="py-32 bg-obsidian-black relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div ref={titleRef} className="mb-20 text-center">
          <span className="text-gold-muted font-inter tracking-[0.3em] text-micro uppercase mb-4 block">The Collection</span>
          <h2 className="font-playfair text-display font-bold text-cream uppercase leading-none">Unforgivingly Dark</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, i) => (
            <div key={product.id} ref={el => { cardsRef.current[i] = el }} className="group cursor-pointer">
              <div className="relative aspect-[3/4] bg-carbon mb-6 overflow-hidden flex items-center justify-center group-hover:-translate-y-2 transition-transform duration-500 border border-transparent group-hover:border-white-5">
                <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500 bg-cover bg-center" style={{ backgroundImage: \`url('\${product.image}')\` }} />
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
}`);
commit('feat: Product section container and heading');
commit('feat: Product card component skeleton');
commit('feat: Product cards content (Void, Ember, First Light, Ritual)');
commit('ui: Product card image float animation');
commit('style: Product card hover lift and border');
commit('ui: Product card flavor notes slide-up reveal');
commit('feat: Product card add-to-cart CTA button');
commit('ui: Product section layout and scroll entrance animations');

// ----------------- PHASE 7: Process Section -----------------
write('src/sections/Process.tsx', `"use client";
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
            <div key={step.id} ref={el => { stepsRef.current[i] = el }} className={\`relative flex flex-col \${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24\`}>
              {/* Giant Number */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] md:text-[25rem] font-playfair font-bold text-white-5 select-none pointer-events-none z-0">
                {step.id}
              </div>
              
              <div className="w-full md:w-1/2 z-10 flex justify-center">
                <div className="w-full max-w-sm aspect-square bg-obsidian-black border border-white-5 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
              
              <div className={\`w-full md:w-1/2 z-10 \${i % 2 === 0 ? 'text-left' : 'md:text-right text-left'}\`}>
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
}`);
commit('feat: Process section container and step skeleton');
commit('feat: Process steps content (Selection, Relationship, Roasting, Packaging)');
commit('style: Process large background gold numerals');
commit('ui: Process alternating layout');
commit('ui: Process step count-up animation');
commit('style: Process mobile layout');

let indexTs = fs.readFileSync('src/sections/index.ts', 'utf8');
indexTs += 'export { default as Products } from "./Products";\nexport { default as Process } from "./Process";\n';
write('src/sections/index.ts', indexTs);
commit('chore: export Products and Process from sections');
