"use client";
import React, { useRef, useEffect } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text fades and blurs out as you scroll
      gsap.to(contentRef.current, {
        opacity: 0,
        filter: "blur(12px)",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "50% top",
          scrub: true,
        }
      });

      // Entrance animation
      const loadTl = gsap.timeline({ defaults: { ease: "power4.out" } });
      loadTl.fromTo(bgRef.current, { scale: 1.1 }, { scale: 1, duration: 2.5 });
      loadTl.fromTo(".hero-title", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.8 }, "-=2");
      loadTl.fromTo(".hero-sub", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5 }, "-=1.2");
      loadTl.fromTo(".hero-cta", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 }, "-=1");
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* FIXED background that stays behind all sections — this is what creates the seamless transition */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden">
        <div 
          ref={bgRef} 
          className="absolute inset-0 will-change-transform origin-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1504630083234-14187a9df0f5?q=80&w=2400&auto=format&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Base overlay so text is readable */}
        <div className="absolute inset-0 bg-obsidian-black/40 pointer-events-none" />
        {/* Film grain */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* Hero section — scrolls normally, text is on top of the fixed bg */}
      <section ref={containerRef} className="relative h-[150vh] w-full z-10">
        <div ref={contentRef} className="sticky top-0 h-screen flex items-center justify-center will-change-transform">
          <div className="flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto">
            <h1 className="hero-title font-playfair text-[clamp(40px,6vw,90px)] font-bold tracking-[0.1em] text-cream uppercase mb-8 leading-tight drop-shadow-2xl">
              Before The<br className="md:hidden" /> World Wakes
            </h1>
            
            <p className="hero-sub font-inter font-light text-body md:text-body-lg text-parchment/80 max-w-lg mb-16 tracking-wide leading-loose">
              The ritual for those who treat their morning cup the way a musician tunes their instrument.
            </p>
            
            <div className="hero-cta">
              <motion.button
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(201,169,110,0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-4 border border-gold-muted/50 text-gold-bright transition-colors duration-500 font-inter tracking-[0.3em] uppercase text-micro hover:border-gold-bright cursor-pointer"
              >
                Experience Obsidian
              </motion.button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="fixed bottom-12 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
          animate={{ y: [0, 10, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-gold-muted to-transparent" />
        </motion.div>
      </section>
    </>
  );
}
