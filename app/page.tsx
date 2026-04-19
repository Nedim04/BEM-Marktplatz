import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import PressBar from "@/components/PressBar";
import TaskTypes from "@/components/TaskTypes";
import LiveBounties from "@/components/LiveBounties";
import ForAgents from "@/components/ForAgents";
import FindersFee from "@/components/FindersFee";
import HowItWorks from "@/components/HowItWorks";
import TrustSignals from "@/components/TrustSignals";
import CtaSection from "@/components/CtaSection";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <PressBar />
        <TaskTypes />
        <LiveBounties />
        <ForAgents />
        <FindersFee />
        <HowItWorks />
        <TrustSignals />
        <CtaSection />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
