"use client";
import React, { useRef, useEffect } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pinned cinematic zoom: scroll zooms INTO the image
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1,
        }
      });

      // Zoom the background image from 1 to 4x
      tl.fromTo(bgRef.current, 
        { scale: 1 },
        { scale: 4, ease: "power1.inOut" }, 
        0
      );

      // Darken the overlay as we zoom in — simulates "entering" the darkness
      tl.fromTo(overlayRef.current,
        { opacity: 0.4 },
        { opacity: 1, ease: "power2.in" },
        0
      );

      // Text fades and blurs away as we zoom
      tl.fromTo(contentRef.current,
        { opacity: 1, scale: 1, filter: "blur(0px)" },
        { opacity: 0, scale: 1.3, filter: "blur(15px)", ease: "power2.in" },
        0
      );

      // Initial entrance animation on page load
      const loadTl = gsap.timeline({ defaults: { ease: "power4.out" } });
      loadTl.fromTo(bgRef.current, 
        { scale: 1.15 }, 
        { scale: 1, duration: 2.5 }
      );
      loadTl.fromTo(".hero-title", 
        { y: 60, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.8 }, 
        "-=2"
      );
      loadTl.fromTo(".hero-sub", 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.5 }, 
        "-=1.2"
      );
      loadTl.fromTo(".hero-cta", 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.2 }, 
        "-=1"
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-obsidian-black">
      {/* Background: Cinematic coffee plantation landscape */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <div 
          ref={bgRef} 
          className="absolute inset-0 will-change-transform origin-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=2400&auto=format&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>

      {/* Overlay that darkens as you zoom in */}
      <div ref={overlayRef} className="absolute inset-0 bg-obsidian-black z-10 pointer-events-none" style={{ opacity: 0.4 }} />
      
      {/* Film grain */}
      <div className="absolute inset-0 z-10 opacity-30 mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Hero Content — visible on load, fades on scroll */}
      <div ref={contentRef} className="relative z-20 flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto will-change-transform">
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