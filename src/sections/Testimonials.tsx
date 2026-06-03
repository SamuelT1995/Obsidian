"use client";
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
}