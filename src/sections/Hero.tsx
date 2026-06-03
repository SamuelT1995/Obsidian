"use client";
import React, { useRef, useEffect } from "react";
import { motion, useSpring } from "motion/react";
import gsap from "gsap";
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  
  const mouseX = useSpring(0, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(0, { stiffness: 150, damping: 15 });
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);
    mouseX.set(x * 0.2);
    mouseY.set(y * 0.2);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(headlineRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, delay: 0.5 });
      tl.fromTo(subheadRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, "-=1");
      tl.fromTo(ctaRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, "-=0.8");
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 -top-[20%] w-full h-[120%]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian-black/60 via-obsidian-black/40 to-obsidian-black/90 z-10" />
      <div className="relative z-20 flex flex-col items-center text-center px-6 mt-16">
        <h1 ref={headlineRef} className="font-playfair text-hero font-bold tracking-widest text-cream uppercase mb-6 leading-none">
          Before The<br />World Wakes
        </h1>
        <p ref={subheadRef} className="font-cormorant italic text-headline text-parchment max-w-2xl mb-12 leading-relaxed">
          The ritual for those who treat their morning cup the way a musician tunes their instrument.
        </p>
        <div ref={ctaRef}>
          <motion.button
            ref={btnRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileTap={{ scale: 0.95 }}
            style={{ x: mouseX, y: mouseY }}
            className="px-8 py-4 border border-gold-bright text-gold-bright hover:bg-gold-bright hover:text-obsidian-black transition-colors duration-300 font-inter tracking-[0.2em] uppercase text-caption relative overflow-hidden group"
          >
            <span className="relative z-10">Experience Obsidian</span>
          </motion.button>
        </div>
      </div>
    </section>
  );
}