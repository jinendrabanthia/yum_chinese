"use client";

import { ShoppingBag, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useCartStore } from "@/store/cartStore";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [tableNumber, setTableNumber] = useState("04");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    // Get table from URL parameter
    const searchParams = new URLSearchParams(window.location.search);
    const table = searchParams.get("table");
    if (table) {
      setTableNumber(table);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        isScrolled ? "bg-black/40 backdrop-blur-2xl py-3 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]" : "bg-transparent py-5 border-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-black tracking-tighter text-gradient-yum">
            YUM CHINESE
          </h1>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-4">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2.5 rounded-full bg-[--glass-bg] border border-[--glass-border] shadow-[var(--glass-shadow)] text-[--foreground]"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[--glass-bg] px-4 py-2 rounded-full backdrop-blur-xl border border-[--glass-border] shadow-[var(--glass-shadow)] flex items-center gap-2"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[--color-crimson] animate-pulse shadow-[0_0_8px_rgba(255,0,60,0.8)]"></div>
            <span className="text-sm font-bold tracking-wide">Table #{tableNumber}</span>
          </motion.div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2.5 bg-[--glass-bg] rounded-full border border-[--glass-border] backdrop-blur-xl shadow-lg text-[--foreground]"
          >
            <ShoppingBag className="w-5 h-5" />
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.div
                  key={totalItems}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 bg-[--color-crimson] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
                >
                  {totalItems}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
