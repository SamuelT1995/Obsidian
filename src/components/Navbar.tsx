"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, User } from "lucide-react";
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled ? "bg-obsidian-black/80 backdrop-blur-md py-4 border-b border-white-5" : "bg-transparent py-6"}`}>
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        <Link href="/" className="font-playfair text-2xl font-bold tracking-widest text-cream uppercase">Obsidian</Link>
        <div className="hidden md:flex items-center space-x-12">
          {["Shop", "Story", "Source"].map((item) => (
            <Link key={item} href={`/${item.toLowerCase()}`} className="font-inter text-caption uppercase tracking-widest text-cream relative hover:text-gold-bright transition-colors duration-300">
              {item}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex items-center space-x-6 text-cream">
          <button className="hover:text-gold-bright transition-colors duration-300"><User size={20} strokeWidth={1.5} /></button>
          <button className="hover:text-gold-bright transition-colors duration-300"><ShoppingBag size={20} strokeWidth={1.5} /></button>
        </div>
      </div>
    </nav>
  );
}