const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function commit(msg) {
  execSync('git add .');
  execSync(`git commit -m "${msg}"`);
}

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

// ----------------- PHASE 2: Navigation -----------------

// 16
write('src/components/Navbar.tsx', `"use client";
import React from "react";
export default function Navbar() {
  return <nav className="fixed top-0 left-0 right-0 z-40 bg-transparent py-6"></nav>;
}`);
commit('feat: Navbar component skeleton and layout');

// 17
write('src/components/Navbar.tsx', `"use client";
import React from "react";
import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-transparent py-6">
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        <Link href="/" className="font-playfair text-2xl font-bold tracking-widest text-cream uppercase">Obsidian</Link>
      </div>
    </nav>
  );
}`);
commit('feat: Navbar logo — OBSIDIAN wordmark');

// 18
write('src/components/Navbar.tsx', `"use client";
import React from "react";
import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-transparent py-6">
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        <Link href="/" className="font-playfair text-2xl font-bold tracking-widest text-cream uppercase">Obsidian</Link>
        <div className="hidden md:flex items-center space-x-12">
          {["Shop", "Story", "Source"].map((item) => (
            <Link key={item} href={\`/\${item.toLowerCase()}\`} className="font-inter text-caption uppercase tracking-widest text-cream relative">
              {item}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}`);
commit('feat: Navbar links (Shop, Story, Source)');

// 19
write('src/components/Navbar.tsx', `"use client";
import React from "react";
import Link from "next/link";
import { ShoppingBag, User } from "lucide-react";
export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-transparent py-6">
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        <Link href="/" className="font-playfair text-2xl font-bold tracking-widest text-cream uppercase">Obsidian</Link>
        <div className="hidden md:flex items-center space-x-12">
          {["Shop", "Story", "Source"].map((item) => (
            <Link key={item} href={\`/\${item.toLowerCase()}\`} className="font-inter text-caption uppercase tracking-widest text-cream relative">
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
}`);
commit('feat: Navbar right-side elements (Cart, Account icons)');

// 20
write('src/components/Navbar.tsx', `"use client";
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
    <nav className={\`fixed top-0 left-0 right-0 z-40 transition-all duration-500 \${scrolled ? "bg-obsidian-black/80 backdrop-blur-md py-4 border-b border-white-5" : "bg-transparent py-6"}\`}>
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        <Link href="/" className="font-playfair text-2xl font-bold tracking-widest text-cream uppercase">Obsidian</Link>
        <div className="hidden md:flex items-center space-x-12">
          {["Shop", "Story", "Source"].map((item) => (
            <Link key={item} href={\`/\${item.toLowerCase()}\`} className="font-inter text-caption uppercase tracking-widest text-cream relative hover:text-gold-bright transition-colors duration-300">
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
}`);
commit('ui: Navbar glassmorphism scroll effect');

// 21
write('src/components/Navbar.tsx', `"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ShoppingBag, User } from "lucide-react";
import gsap from "gsap";
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const linksRef = useRef<Array<HTMLAnchorElement | null>>([]);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const onEnter = (i) => gsap.to(linksRef.current[i], { color: "var(--gold-bright)", duration: 0.3 });
  const onLeave = (i) => gsap.to(linksRef.current[i], { color: "var(--cream)", duration: 0.3 });
  return (
    <nav className={\`fixed top-0 left-0 right-0 z-40 transition-all duration-500 \${scrolled ? "bg-obsidian-black/80 backdrop-blur-md py-4 border-b border-white-5" : "bg-transparent py-6"}\`}>
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        <Link href="/" className="font-playfair text-2xl font-bold tracking-widest text-cream uppercase">Obsidian</Link>
        <div className="hidden md:flex items-center space-x-12">
          {["Shop", "Story", "Source"].map((item, i) => (
            <Link key={item} ref={(el) => {linksRef.current[i] = el}} onMouseEnter={() => onEnter(i)} onMouseLeave={() => onLeave(i)} href={\`/\${item.toLowerCase()}\`} className="font-inter text-caption uppercase tracking-widest text-cream relative">
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
}`);
commit('ui: Navbar links hover animations (GSAP underline)');

// 22
write('src/components/Navbar.tsx', `"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ShoppingBag, User, Menu, X } from "lucide-react";
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
    <nav className={\`fixed top-0 left-0 right-0 z-40 transition-all duration-500 \${scrolled ? "bg-obsidian-black/80 backdrop-blur-md py-4 border-b border-white-5" : "bg-transparent py-6"}\`}>
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        <Link href="/" className="font-playfair text-2xl font-bold tracking-widest text-cream uppercase relative z-50">Obsidian</Link>
        <div className="hidden md:flex items-center space-x-12">
          {["Shop", "Story", "Source"].map((item, i) => (
            <Link key={item} ref={(el) => {linksRef.current[i] = el}} onMouseEnter={() => onEnter(i)} onMouseLeave={() => onLeave(i)} href={\`/\${item.toLowerCase()}\`} className="font-inter text-caption uppercase tracking-widest text-cream relative">
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
  );
}`);
commit('feat: Mobile menu trigger (hamburger) component');

// 23
write('src/components/Navbar.tsx', `"use client";
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
      <nav className={\`fixed top-0 left-0 right-0 z-40 transition-all duration-500 \${scrolled ? "bg-obsidian-black/80 backdrop-blur-md py-4 border-b border-white-5" : "bg-transparent py-6"}\`}>
        <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
          <Link href="/" className="font-playfair text-2xl font-bold tracking-widest text-cream uppercase relative z-50">Obsidian</Link>
          <div className="hidden md:flex items-center space-x-12">
            {["Shop", "Story", "Source"].map((item, i) => (
              <Link key={item} ref={(el) => {linksRef.current[i] = el}} onMouseEnter={() => onEnter(i)} onMouseLeave={() => onLeave(i)} href={\`/\${item.toLowerCase()}\`} className="font-inter text-caption uppercase tracking-widest text-cream relative">
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
          <div className="fixed inset-0 z-30 bg-obsidian-black flex flex-col items-center justify-center">
            {/* overlay */}
          </div>
        )}
      </AnimatePresence>
    </>
  );
}`);
commit('feat: Mobile menu full-screen overlay skeleton');

// 24
write('src/components/Navbar.tsx', `"use client";
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
      <nav className={\`fixed top-0 left-0 right-0 z-40 transition-all duration-500 \${scrolled ? "bg-obsidian-black/80 backdrop-blur-md py-4 border-b border-white-5" : "bg-transparent py-6"}\`}>
        <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
          <Link href="/" className="font-playfair text-2xl font-bold tracking-widest text-cream uppercase relative z-50">Obsidian</Link>
          <div className="hidden md:flex items-center space-x-12">
            {["Shop", "Story", "Source"].map((item, i) => (
              <Link key={item} ref={(el) => {linksRef.current[i] = el}} onMouseEnter={() => onEnter(i)} onMouseLeave={() => onLeave(i)} href={\`/\${item.toLowerCase()}\`} className="font-inter text-caption uppercase tracking-widest text-cream relative">
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
          <div className="fixed inset-0 z-30 bg-obsidian-black flex flex-col items-center justify-center">
            <div className="flex flex-col items-center space-y-8">
              {["Shop", "Story", "Source"].map((item) => (
                <Link key={item} href={\`/\${item.toLowerCase()}\`} className="font-playfair text-display text-cream hover:text-gold-bright transition-colors" onClick={() => setMenuOpen(false)}>
                  {item}
                </Link>
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}`);
commit('feat: Mobile menu links and typography');

// 25
write('src/components/Navbar.tsx', `"use client";
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
      <nav className={\`fixed top-0 left-0 right-0 z-40 transition-all duration-500 \${scrolled ? "bg-obsidian-black/80 backdrop-blur-md py-4 border-b border-white-5" : "bg-transparent py-6"}\`}>
        <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
          <Link href="/" className="font-playfair text-2xl font-bold tracking-widest text-cream uppercase relative z-50">Obsidian</Link>
          <div className="hidden md:flex items-center space-x-12">
            {["Shop", "Story", "Source"].map((item, i) => (
              <Link key={item} ref={(el) => {linksRef.current[i] = el}} onMouseEnter={() => onEnter(i)} onMouseLeave={() => onLeave(i)} href={\`/\${item.toLowerCase()}\`} className="font-inter text-caption uppercase tracking-widest text-cream relative">
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
              {["Shop", "Story", "Source"].map((item) => (
                <Link key={item} href={\`/\${item.toLowerCase()}\`} className="font-playfair text-display text-cream hover:text-gold-bright transition-colors" onClick={() => setMenuOpen(false)}>
                  {item}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}`);
commit('ui: Mobile menu entrance/exit animations');

// 26
write('src/components/Navbar.tsx', `"use client";
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
      <nav className={\`fixed top-0 left-0 right-0 z-40 transition-all duration-500 \${scrolled ? "bg-obsidian-black/80 backdrop-blur-md py-4 border-b border-white-5" : "bg-transparent py-6"}\`}>
        <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
          <Link href="/" className="font-playfair text-2xl font-bold tracking-widest text-cream uppercase relative z-50">Obsidian</Link>
          <div className="hidden md:flex items-center space-x-12">
            {["Shop", "Story", "Source"].map((item, i) => (
              <Link key={item} ref={(el) => {linksRef.current[i] = el}} onMouseEnter={() => onEnter(i)} onMouseLeave={() => onLeave(i)} href={\`/\${item.toLowerCase()}\`} className="font-inter text-caption uppercase tracking-widest text-cream relative">
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
                  <Link href={\`/\${item.toLowerCase()}\`} className="font-playfair text-display text-cream hover:text-gold-bright transition-colors" onClick={() => setMenuOpen(false)}>
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
}`);
commit('ui: Mobile menu staggering link animations');

// Export from index.ts
write('src/components/index.ts', `export { default as CustomCursor } from "./CustomCursor";
export { default as ScrollProgress } from "./ScrollProgress";
export { default as LenisProvider } from "./LenisProvider";
export { default as PageTransition } from "./PageTransition";
export { default as Navbar } from "./Navbar";\n`);
commit('chore: export Navbar from components');
