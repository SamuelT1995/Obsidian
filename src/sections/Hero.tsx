"use client";
import React, { useRef, useEffect } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const skyRef = useRef<HTMLDivElement>(null);
  const farmRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Sky/clouds layer — moves VERY slow (deep background)
      gsap.to(skyRef.current, {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      // Farm layer — moves slightly faster (foreground parallax)
      gsap.to(farmRef.current, {
        yPercent: 25,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      // Text floats up and fades as you scroll
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -100,
        filter: "blur(6px)",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "80% top",
          scrub: true,
        }
      });

      // Entrance animation
      const loadTl = gsap.timeline({ defaults: { ease: "power4.out" } });
      loadTl.fromTo(skyRef.current, { scale: 1.1 }, { scale: 1, duration: 3 });
      loadTl.fromTo(farmRef.current, { scale: 1.15, opacity: 0 }, { scale: 1, opacity: 1, duration: 2.5 }, "-=2.5");
      loadTl.fromTo(".hero-title", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.8 }, "-=1.5");
      loadTl.fromTo(".hero-sub", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5 }, "-=1.2");
      loadTl.fromTo(".hero-cta", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 }, "-=1");
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-obsidian-black">
      
      {/* Layer 1: Sky & Clouds — deep background, slow parallax */}
      <div className="absolute inset-0 -top-[5%] w-full h-[115%] z-0 overflow-hidden">
        <div 
          ref={skyRef} 
          className="absolute inset-0 will-change-transform"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=2400&auto=format&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
          }}
        />
      </div>

      {/* Layer 2: Coffee Farm — foreground, faster parallax for depth */}
      <div className="absolute inset-0 -top-[10%] w-full h-[130%] z-[2] overflow-hidden">
        <div 
          ref={farmRef} 
          className="absolute inset-0 will-change-transform"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1595981234058-a9302fb97229?q=80&w=2400&auto=format&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'bottom center',
          }}
        />
      </div>

      {/* Gradient overlays for text readability and cinematic mood */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian-black/50 via-transparent to-obsidian-black z-[3] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian-black/70 via-transparent to-transparent z-[3] pointer-events-none" />
      
      {/* Film grain texture */}
      <div className="absolute inset-0 z-[3] opacity-20 mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Hero Content */}
      <div ref={contentRef} className="relative z-[5] flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto will-change-transform">
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

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-12 z-20"
        animate={{ y: [0, 10, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-gold-muted to-transparent" />
      </motion.div>
    </section>
  );
}
