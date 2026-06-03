"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const containerRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "bottom 80%",
          toggleActions: "play none none reverse",
        }
      });

      tl.fromTo(dividerRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "power3.inOut" })
        .fromTo(labelRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.5")
        .fromTo(quoteRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, "-=0.2")
        .fromTo(bodyRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, "-=0.6");
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 md:py-48 bg-obsidian-black relative z-20 flex flex-col items-center justify-center px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <div className="w-full flex items-center justify-center space-x-4 mb-16">
          <div ref={dividerRef} className="h-px bg-gold-muted w-16 origin-left" />
          <span ref={labelRef} className="text-gold-muted font-inter tracking-[0.3em] text-micro uppercase">The Manifesto</span>
          <div ref={dividerRef} className="h-px bg-gold-muted w-16 origin-right" />
        </div>
        <h2 ref={quoteRef} className="font-cormorant italic text-display text-cream leading-tight mb-12">
          "For those who refuse to dilute<br className="hidden md:block"/> their ambition with mediocrity."
        </h2>
        <p ref={bodyRef} className="font-inter text-body-lg text-parchment max-w-2xl leading-relaxed">
          We don't roast for the masses. We roast for the obsessive. The ones who measure their water temperature to the degree, who weigh their beans to the tenth of a gram. Obsidian is sourced from the rarest volcanic soils on earth, bringing you a cup that is dark, unforgiving, and absolutely perfect.
        </p>
      </div>
    </section>
  );
}