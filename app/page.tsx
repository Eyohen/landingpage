import Header from "@/components/Header"
import Hero from "@/components/Hero"
import AboutSection from "@/components/AboutSection"
import DashboardPreview from "@/components/DashboardPreview"
import IntegrationPartners from "@/components/IntegrationPartners"
import FinalCTA from "@/components/FinalCTA"
import Footer from "@/components/Footer"
import FAQSection from "@/components/FAQs"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#070707] overflow-x-hidden font-grotesque">
      <Header />
      <Hero />
      <div id="why-us">
        <AboutSection />
      </div>
      <div id="features">
        <DashboardPreview />
      </div>
      <div id="pricing">
        <IntegrationPartners />
      </div>
      <div id="faq">
        <FAQSection />
      </div>
      <FinalCTA />
      <Footer />
    </main>
  )
}
