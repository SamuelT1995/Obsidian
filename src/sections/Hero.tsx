"use client";
import React, { useRef, useEffect } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgWrapperRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the hero section and create a massive cinematic zoom
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%", // Scroll distance for the animation
          pin: true,
          scrub: 1, // Smooth scrubbing
        }
      });

      // Massive zoom into the coffee field
      tl.to(bgRef.current, {
        scale: 6, // Massive zoom
        ease: "power2.inOut",
      }, 0);

      // Text scales up slightly and fades away as we "enter" the scene
      tl.to(contentRef.current, {
        scale: 1.5,
        opacity: 0,
        filter: "blur(20px)",
        ease: "power2.inOut",
      }, 0);

      // Initial Entrance Animation (on page load)
      const loadTl = gsap.timeline({ defaults: { ease: "power4.out" } });
      loadTl.fromTo(bgRef.current, { scale: 1.2, filter: "blur(10px)" }, { scale: 1, filter: "blur(0px)", duration: 2.5 });
      loadTl.fromTo(contentRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 2 }, "-=1.5");

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-obsidian-black">
      {/* Background Image Wrapper */}
      <div ref={bgWrapperRef} className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        {/* Cinematic Coffee Field Image */}
        <div 
          ref={bgRef} 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611070257405-25e63ad1c337?q=80&w=2400&auto=format&fit=crop')] bg-cover bg-center transform origin-center will-change-transform" 
        />
        {/* Overlays for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian-black/80 via-obsidian-black/50 to-obsidian-black z-10 pointer-events-none" />
        <div className="absolute inset-0 z-10 opacity-40 mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* Hero Content */}
      <div ref={contentRef} className="relative z-20 flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto h-full mt-10">
        <h1 className="font-playfair text-[clamp(40px,6vw,90px)] font-bold tracking-[0.1em] text-cream uppercase mb-8 leading-tight drop-shadow-2xl">
          Before The<br className="md:hidden" /> World Wakes
        </h1>
        
        <p className="font-inter font-light text-body md:text-body-lg text-parchment/80 max-w-lg mb-16 tracking-wide leading-loose">
          The ritual for those who treat their morning cup the way a musician tunes their instrument. Unforgiving, dark, absolute.
        </p>
        
        <div>
          <motion.button
            onClick={() => {
              // Smooth scroll to products if clicked, but skip past the pinned section
              const products = document.getElementById('products');
              if (products) {
                window.scrollTo({
                  top: products.offsetTop + (window.innerHeight * 1.5), // Offset for the pin distance
                  behavior: "smooth"
                });
              }
            }}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(201,169,110,0.1)" }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 border border-gold-muted/50 text-gold-bright transition-colors duration-500 font-inter tracking-[0.3em] uppercase text-micro hover:border-gold-bright cursor-pointer"
          >
            Experience Obsidian
          </motion.button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 z-20 text-white-20">
        <motion.div 
          animate={{ y: [0, 10, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="w-[1px] h-16 bg-gradient-to-b from-transparent via-gold-muted to-transparent mx-auto" 
        />
      </div>
    </section>
  );
}