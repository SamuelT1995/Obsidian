"use client";
import React from "react";
export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 -top-[20%] w-full h-[120%]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian-black/60 via-obsidian-black/40 to-obsidian-black/90 z-10" />
      <div className="relative z-20 flex flex-col items-center text-center px-6 mt-16">
        <h1 className="font-playfair text-hero font-bold tracking-widest text-cream uppercase mb-6 leading-none">
          Before The<br />World Wakes
        </h1>
        <p className="font-cormorant italic text-headline text-parchment max-w-2xl mb-12 leading-relaxed">
          The ritual for those who treat their morning cup the way a musician tunes their instrument.
        </p>
      </div>
    </section>
  );
}