import { Header } from "@/components/layout/header";
import { HeroSection } from "@/components/layout/hero-section";
import { PropertyListSection } from "@/components/property/property-list-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Header />
      <HeroSection />
      <PropertyListSection />
    </div>
  );
}
