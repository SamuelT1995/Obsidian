"use client";
import React from "react";
import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-transparent py-6">
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        <Link href="/" className="font-playfair text-2xl font-bold tracking-widest text-cream uppercase">Obsidian</Link>
        <div className="hidden md:flex items-center space-x-12">
          {["Shop", "Story", "Source"].map((item) => (
            <Link key={item} href={`/${item.toLowerCase()}`} className="font-inter text-caption uppercase tracking-widest text-cream relative">
              {item}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}