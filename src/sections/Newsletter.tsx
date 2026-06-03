"use client";
import React from "react";
import { ArrowRight } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="py-32 bg-carbon">
      <div className="container mx-auto px-6 lg:px-12 flex flex-col items-center text-center">
        <span className="text-gold-muted font-inter tracking-[0.3em] text-micro uppercase mb-6 block">The Inner Circle</span>
        <h2 className="font-playfair text-headline text-cream uppercase mb-8 max-w-2xl">Join the obsessed. Get early access to micro-lot releases.</h2>
        <form className="w-full max-w-md relative mt-8">
          <input 
            type="email" 
            placeholder="ENTER YOUR EMAIL" 
            className="w-full bg-transparent border-b border-white-20 pb-4 text-center font-inter text-caption tracking-widest text-cream focus:outline-none focus:border-gold-bright transition-colors placeholder:text-white-20"
          />
          <button type="submit" className="absolute right-0 top-0 bottom-4 flex items-center text-gold-muted hover:text-gold-bright transition-colors">
            <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </section>
  );
}