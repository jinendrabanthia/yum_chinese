"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { useCartStore } from "@/store/cartStore";

const CATEGORIES = ["Starters", "Dim Sum", "Woks", "Yoo Amigoes Fusion", "Drinks"];

const YUM_ITEMS = [
  { id: 1, name: "Chicken Butter Masala", desc: "Classic rich tomato gravy, tender chicken.", price: 450, img: "/gallery-1.jpg", category: "Woks" },
  { id: 2, name: "Chicken Hakka Noodles", desc: "Wok-tossed fresh noodles.", price: 250, img: "/gallery-2.jpg", category: "Woks" },
  { id: 3, name: "Chicken Lolly Pop", desc: "Crispy fried chicken wings, schezwan sauce.", price: 320, img: "/gallery-3.jpg", category: "Starters" },
  { id: 4, name: "Crispy Chilli Baby Corn", desc: "Crunchy baby corn tossed in spicy chilli sauce.", price: 280, img: "/gallery-4.jpg", category: "Starters" },
  { id: 7, name: "Fried Rice", desc: "Classic wok-tossed fried rice.", price: 220, img: "/gallery-5.jpg", category: "Woks" },
  { id: 8, name: "Konjee Crispy Chicken", desc: "Crispy shreds of chicken in a sweet & spicy sauce.", price: 350, img: "/gallery-6.jpg", category: "Starters" },
  { id: 9, name: "Vegetable Spring Rolls", desc: "Golden fried crispy rolls served with sweet chilli dip.", price: 200, img: "/gallery-1.jpg", category: "Starters" },
  { id: 10, name: "Prawns in Garlic Sauce", desc: "Fresh prawns wok-tossed in a rich burnt garlic sauce.", price: 550, img: "/gallery-3.jpg", category: "Woks" },
];

const AMIGOES_ITEMS = [
  { id: 5, name: "Kung Pao Chicken Tacos", desc: "Soft shell tacos, spicy kung pao chicken, fresh salsa.", price: 750, img: "/gallery-5.jpg", category: "Yoo Amigoes Fusion" },
  { id: 6, name: "Peking Duck Quesadilla", desc: "Crispy duck, hoisin, melted Oaxaca cheese.", price: 850, img: "/gallery-6.jpg", category: "Yoo Amigoes Fusion" },
  { id: 11, name: "Macho Nachos with Sichuan Beef", desc: "Loaded nachos topped with spicy Sichuan minced beef and melted cheese.", price: 450, img: "/gallery-2.jpg", category: "Yoo Amigoes Fusion" },
];

export function MenuInterface() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  
  // Ref for the Yoo Amigoes section to trigger background shift
  const amigoesRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: amigoesRef,
    offset: ["start end", "center center"],
  });

  const bgGradient = useTransform(
    scrollYProgress,
    [0, 1],
    [
      "linear-gradient(180deg, var(--color-obsidian) 0%, var(--color-obsidian-light) 100%)",
      "linear-gradient(180deg, var(--color-obsidian) 0%, rgba(255,69,0,0.15) 100%)"
    ]
  );

  return (
    <motion.section style={{ background: bgGradient }} className="min-h-screen py-10 relative transition-colors duration-700">
      
      {/* Category Pills */}
      <div className="sticky top-[88px] z-40 bg-[--background] backdrop-blur-2xl py-4 border-b border-[--glass-border] shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-colors duration-300">
        <div className="flex gap-3 px-6 overflow-x-auto no-scrollbar pb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? cat === "Yoo Amigoes Fusion" 
                    ? "bg-gradient-to-r from-[--color-sunset] to-[--color-teal] text-white shadow-[0_0_15px_rgba(255,69,0,0.4)]"
                    : "bg-[--color-crimson] text-white shadow-[0_0_15px_rgba(255,0,60,0.4)]"
                  : "bg-[--glass-bg] backdrop-blur-md text-gray-500 hover:bg-black/10 dark:hover:bg-white/10 hover:text-[--foreground] border border-[--glass-border] shadow-[var(--glass-shadow)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 mt-8 space-y-12">
        
        {/* Yum Chinese Menu Section */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold tracking-tight text-[--foreground] mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-[--color-crimson] rounded-full inline-block"></span>
            Yum Chinese Classics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {YUM_ITEMS.map((item, idx) => (
              <FoodCard key={item.id} item={item} index={idx} accent="crimson" />
            ))}
          </div>
        </div>

        {/* Yoo Amigoes Sub-Brand Section */}
        <div ref={amigoesRef} className="space-y-6 pt-12 pb-24">
          <h3 className="text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[--color-sunset] to-[--color-teal] mb-6 flex items-center gap-2">
            <span className="w-1 h-8 bg-gradient-to-b from-[--color-sunset] to-[--color-teal] rounded-full inline-block"></span>
            Yoo Amigoes Fusion
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {AMIGOES_ITEMS.map((item, idx) => (
              <FoodCard key={item.id} item={item} index={idx} accent="sunset" />
            ))}
          </div>
        </div>
        
      </div>
    </motion.section>
  );
}

function FoodCard({ item, index, accent }: { item: any, index: number, accent: string }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.5, delay: index * 0.05, type: "spring", bounce: 0.3 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-[--glass-bg] backdrop-blur-xl border border-[--glass-border] overflow-hidden flex flex-row items-center p-4 gap-5 cursor-pointer rounded-2xl shadow-[var(--glass-shadow)] hover:shadow-2xl transition-all duration-300"
    >
      <div className="relative w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0 border border-[--glass-border] shadow-inner">
        <Image src={item.img} alt={item.name} fill className="object-cover transition-transform duration-700 hover:scale-110" />
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="text-[--foreground] font-bold text-lg truncate">{item.name}</h4>
        <p className="text-gray-500 text-sm line-clamp-2 mt-1">{item.desc}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-black tracking-tight text-[--foreground]">₹{item.price}</span>
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              addItem({ id: item.id, name: item.name, price: item.price });
            }}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
              accent === "crimson" ? "bg-[--color-crimson]" : "bg-gradient-to-r from-[--color-sunset] to-[--color-teal]"
            }`}
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
