"use client";
import React from "react";
export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 -top-[20%] w-full h-[120%]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian-black/60 via-obsidian-black/40 to-obsidian-black/90 z-10" />
    </section>
  );
}