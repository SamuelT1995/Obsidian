"use client";
import React, { useRef, useEffect } from "react";
import { motion, useSpring } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mouse } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background parallax and scale
      gsap.fromTo(bgRef.current, 
        { scale: 1 },
        {
          scale: 1.15,
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Scroll-driven dissolve for the content
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -100,
        filter: "blur(10px)",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      // Initial Entrance
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(headlineRef.current, { y: 50, opacity: 0, filter: "blur(10px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 2, delay: 0.2 });
      tl.fromTo(subheadRef.current, { opacity: 0 }, { opacity: 1, duration: 2 }, "-=1");
      tl.fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.5 }, "-=1.5");
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 -top-[10%] w-full h-[120%] z-0">
        <div ref={bgRef} className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center" />
      </div>

      {/* Dark gradient for negative space */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian-black/80 via-obsidian-black/60 to-obsidian-black z-10" />
      
      {/* Noise Texture */}
      <div className="absolute inset-0 z-10 opacity-40 mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Extremely clean, uncrowded centered layout */}
      <div ref={contentRef} className="relative z-20 flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto h-full mt-10">
        <h1 ref={headlineRef} className="font-playfair text-[clamp(40px,6vw,90px)] font-bold tracking-[0.1em] text-cream uppercase mb-8 leading-tight drop-shadow-2xl">
          Before The<br className="md:hidden" /> World Wakes
        </h1>
        
        <p ref={subheadRef} className="font-inter font-light text-body md:text-body-lg text-parchment/80 max-w-lg mb-16 tracking-wide leading-loose">
          The ritual for those who treat their morning cup the way a musician tunes their instrument. Unforgiving, dark, absolute.
        </p>
        
        <div ref={ctaRef}>
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

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-12 z-20 text-white-20"
        animate={{ y: [0, 10, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-gold-muted to-transparent" />
      </motion.div>
    </section>
  );
}