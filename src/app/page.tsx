import { Navbar } from "@/components";
import { Hero, Manifesto, Origin, Products, Process, Ritual, Brew, Testimonials, Newsletter, Footer } from "@/sections";

export default function Home() {
  return (
    <main className="min-h-screen bg-obsidian-black text-cream selection:bg-gold-muted selection:text-obsidian-black">
      <Navbar />
      <Hero />
      <Manifesto />
      <Origin />
      <Products />
      <Process />
      <Ritual />
      <Brew />
      <Testimonials />
      <Newsletter />
      <Footer />
    </main>
  );
}