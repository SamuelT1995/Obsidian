"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div className="fixed top-0 left-0 w-3 h-3 bg-cream rounded-full pointer-events-none z-50 mix-blend-difference" />
  );
}
