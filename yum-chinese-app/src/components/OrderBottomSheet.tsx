"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Receipt, X, CreditCard, Wallet, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";

export function OrderBottomSheet() {
  const [isOpen, setIsOpen] = useState(false);
  const [tableNumber, setTableNumber] = useState("04");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const table = searchParams.get("table");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (table) setTableNumber(table);
  }, []);

  const { items: cartItems, getSubtotal, removeItem } = useCartStore();

  const subtotal = getSubtotal();
  const taxes = Math.round(subtotal * 0.05); // 5% GST
  const serviceCharge = Math.round(subtotal * 0.10); // 10% Service Charge
  const total = subtotal > 0 ? subtotal + taxes + serviceCharge : 0;

  return (
    <>
      {/* Floating Action Button */}
      <motion.div
        className="fixed bottom-6 left-0 right-0 z-40 flex justify-center pointer-events-none"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
      >
        <button
          onClick={() => setIsOpen(true)}
          className="pointer-events-auto bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.6)] px-6 py-4 rounded-full flex items-center gap-3 group transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-white/20"
        >
          <div className="bg-[--color-crimson] p-2 rounded-full text-white group-hover:animate-pulse">
            <Receipt className="w-5 h-5" />
          </div>
          <span className="text-white font-bold tracking-tight">View My Table Order</span>
          <div className="ml-2 bg-white/20 px-3 py-1 rounded-full text-sm font-black text-white">
            ₹{total}
          </div>
        </button>
      </motion.div>

      {/* Bottom Sheet Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
        )}
      </AnimatePresence>

      {/* Bottom Sheet */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-[--background] backdrop-blur-3xl border-t border-[--glass-border] rounded-t-[2.5rem] p-6 shadow-[0_-20px_60px_rgba(0,0,0,0.2)] flex flex-col max-h-[85vh]"
          >
            <div className="w-14 h-1.5 bg-white/30 rounded-full mx-auto mb-6 shrink-0" />
            
            <div className="flex items-center justify-between mb-6 shrink-0">
              <div>
                <h3 className="text-2xl font-black text-[--foreground] tracking-tight">Table #{tableNumber}</h3>
                <p className="text-[--color-teal] font-medium text-sm">Status: Preparing in Kitchen</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full bg-[--glass-bg] border border-[--glass-border] flex items-center justify-center text-gray-500 hover:text-[--foreground] hover:bg-[--glass-border] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto no-scrollbar flex-1 -mx-6 px-6">
              <div className="space-y-4 mb-6">
                {cartItems.length === 0 ? (
                  <div className="text-center py-10 text-gray-500">
                    Your cart is empty. Add some delicious food!
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-[--foreground]">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded bg-[--glass-bg] flex items-center justify-center text-xs font-bold text-[--foreground]">
                          {item.qty}x
                        </span>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold">₹{item.price * item.qty}</span>
                        <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t border-[--glass-border] pt-4 space-y-2 text-sm text-gray-500 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[--foreground]">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>CGST & SGST (5%)</span>
                  <span className="text-[--foreground]">₹{taxes}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Charge (10%)</span>
                  <span className="text-[--foreground]">₹{serviceCharge}</span>
                </div>
              </div>
            </div>

            <div className="shrink-0 pt-4 border-t border-white/10 mt-auto">
              <div className="flex justify-between items-end mb-6">
                <span className="text-gray-500 font-medium">Total Amount</span>
                <span className="text-3xl font-black text-[--foreground]">₹{total}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={cartItems.length === 0}
                  className="bg-[--glass-bg] hover:bg-[--glass-border] text-[--foreground] py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors border border-[--glass-border] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Wallet className="w-5 h-5" />
                  UPI / QR
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={cartItems.length === 0}
                  className="bg-gradient-to-r from-[--color-sunset] to-[--color-teal] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-[--color-teal]/20 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <CreditCard className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Pay via Card</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
