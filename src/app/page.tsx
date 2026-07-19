import { AgentCards } from "@/components/AgentCards";
import { BriefForm } from "@/components/BriefForm";
import { CosmicBackground } from "@/components/CosmicBackground";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowWeBuild } from "@/components/HowWeBuild";
import { Nav } from "@/components/Nav";
import { Showcase } from "@/components/Showcase";

export default function Home() {
  return (
    <>
      <CosmicBackground />
      <Nav />
      <main className="flex-1">
        <Hero />
        <AgentCards />
        <HowWeBuild />
        <Showcase />
        <BriefForm />
      </main>
      <Footer />
    </>
  );
}
