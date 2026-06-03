"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";

export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <>
      <motion.div
        className="fixed inset-0 z-[100] bg-obsidian-black pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      />
      {children}
    </>
  );
}
