import HeroSection from '../components/organisms/HeroSection'
import BenefitBar from '../components/organisms/BenefitBar'
import GutHealthSection from '../components/organisms/GutHealthSection'
import ProductsShowcase from '../components/organisms/ProductsShowcase'
import UsageTimingSection from '../components/organisms/UsageTimingSection'
import TestimonialsStrip from '../components/organisms/TestimonialsStrip'
import InspirationPreview from '../components/organisms/InspirationPreview'
import FAQSection from '../components/organisms/FAQSection'
import CTABanner from '../components/organisms/CTABanner'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BenefitBar />
      <GutHealthSection />
      <ProductsShowcase />
      <UsageTimingSection />
      <TestimonialsStrip />
      <InspirationPreview />
      <FAQSection />
      <CTABanner />
    </>
  )
}
