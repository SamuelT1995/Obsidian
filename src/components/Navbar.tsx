"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const linksRef = useRef<Array<HTMLAnchorElement | null>>([]);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const onEnter = (i) => gsap.to(linksRef.current[i], { color: "var(--gold-bright)", duration: 0.3 });
  const onLeave = (i) => gsap.to(linksRef.current[i], { color: "var(--cream)", duration: 0.3 });
  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled ? "bg-obsidian-black/80 backdrop-blur-md py-4 border-b border-white-5" : "bg-transparent py-6"}`}>
        <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
          <Link href="/" className="font-playfair text-2xl font-bold tracking-widest text-cream uppercase relative z-50">Obsidian</Link>
          <div className="hidden md:flex items-center space-x-12">
            {["Shop", "Story", "Source"].map((item, i) => (
              <Link key={item} ref={(el) => {linksRef.current[i] = el}} onMouseEnter={() => onEnter(i)} onMouseLeave={() => onLeave(i)} href={`/${item.toLowerCase()}`} className="font-inter text-caption uppercase tracking-widest text-cream relative">
                {item}
              </Link>
            ))}
          </div>
          <div className="hidden md:flex items-center space-x-6 text-cream">
            <button className="hover:text-gold-bright transition-colors duration-300"><User size={20} strokeWidth={1.5} /></button>
            <button className="hover:text-gold-bright transition-colors duration-300"><ShoppingBag size={20} strokeWidth={1.5} /></button>
          </div>
          <button className="md:hidden text-cream relative z-50" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: "-100%" }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: "-100%" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="fixed inset-0 z-30 bg-obsidian-black flex flex-col items-center justify-center">
            <div className="flex flex-col items-center space-y-8">
              {["Shop", "Story", "Source"].map((item, i) => (
                <motion.div key={item} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}>
                  <Link href={`/${item.toLowerCase()}`} className="font-playfair text-display text-cream hover:text-gold-bright transition-colors" onClick={() => setMenuOpen(false)}>
                    {item}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}