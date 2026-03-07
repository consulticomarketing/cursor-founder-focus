import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { StatsSection } from "@/components/stats-section"
import { AboutSection } from "@/components/about-section"
import { TheWeekSection } from "@/components/the-week-section"
import { WhoItsForSection } from "@/components/who-its-for-section"
import { CTASection } from "@/components/cta-section"
import { LocationSection } from "@/components/location-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FAQSection } from "@/components/faq-section"
import { WaitlistSection } from "@/components/waitlist-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <TheWeekSection />
      <WhoItsForSection />
      <CTASection />
      <LocationSection />
      <TestimonialsSection />
      <FAQSection />
      <WaitlistSection />
      <Footer />
    </main>
  )
}
