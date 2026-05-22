import Navigation from "@/components/sections/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import HowItWorks from "@/components/sections/HowItWorks";
import UseCases from "@/components/sections/UseCases";
import Features from "@/components/sections/Features";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <HowItWorks />
      <UseCases />
      <Features />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
