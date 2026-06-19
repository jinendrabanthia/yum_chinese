"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { QrCode } from "lucide-react";
import { useRef } from "react";
import Image from "next/image";

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[--color-obsidian]/60 to-[--color-obsidian] z-10 backdrop-blur-[2px]"></div>
        <Image
          src="/home-banner.png"
          alt="Yum Chinese"
          fill
          className="object-cover opacity-80"
          priority
        />
      </motion.div>

      <div className="relative z-10 text-center px-6 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">Sizzle.</span>{" "}
            <span className="text-[--color-crimson]">Scan.</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">Savor.</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-md mx-auto mb-10">
            Premium dining experience, right from your table.
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5, type: "spring", bounce: 0.4 }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 0, 60, 0.6)" }}
          whileTap={{ scale: 0.95 }}
          className="bg-white/10 backdrop-blur-xl border border-[--color-crimson]/50 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center gap-3 relative overflow-hidden group shadow-[0_8px_32px_rgba(255,0,60,0.3)]"
        >
          <div className="absolute inset-0 bg-[--color-crimson]/20 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
          <QrCode className="w-6 h-6 relative z-10" />
          <span className="relative z-10">Scan Table QR</span>
          
          {/* Pulsing ring */}
          <div className="absolute inset-0 rounded-full border border-[--color-crimson] animate-ping opacity-30"></div>
        </motion.button>
      </div>
    </section>
  );
}
