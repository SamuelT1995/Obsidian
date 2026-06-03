import React from "react";

export default function Footer() {
  return (
    <footer className="bg-obsidian-black pt-32 pb-12 border-t border-white-5">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-2">
            <h2 className="font-playfair font-bold text-3xl tracking-widest text-cream uppercase mb-6">Obsidian</h2>
            <p className="font-inter text-caption text-white-40 max-w-xs leading-loose">Darkness, perfected. Roasted for those who refuse to compromise.</p>
          </div>
          <div>
            <h4 className="font-inter text-micro tracking-widest text-gold-muted uppercase mb-6">Explore</h4>
            <ul className="space-y-4 font-inter text-caption text-white-40">
              <li><a href="#" className="hover:text-cream transition-colors">Shop Coffee</a></li>
              <li><a href="#" className="hover:text-cream transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-cream transition-colors">The Source</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-inter text-micro tracking-widest text-gold-muted uppercase mb-6">Connect</h4>
            <ul className="space-y-4 font-inter text-caption text-white-40">
              <li><a href="#" className="hover:text-cream transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-cream transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-cream transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white-10 text-white-20 font-inter text-micro tracking-widest">
          <span>&copy; {new Date().getFullYear()} OBSIDIAN COFFEE ROASTERS</span>
          <span className="mt-4 md:mt-0">ALL RIGHTS RESERVED</span>
        </div>
      </div>
    </footer>
  );
}