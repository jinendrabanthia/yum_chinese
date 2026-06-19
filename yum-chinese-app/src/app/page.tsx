import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MenuInterface } from "@/components/MenuInterface";
import { OrderBottomSheet } from "@/components/OrderBottomSheet";

export default function Home() {
  return (
    <main className="relative bg-[--color-obsidian] min-h-screen">
      <Header />
      <Hero />
      <MenuInterface />
      <OrderBottomSheet />
    </main>
  );
}
