import CtaSection from "@/components/section/CtaSection";
import FaqSection from "@/components/section/FaqSection";
import FeaturesSection from "@/components/section/FetureSection";
import FooterSection from "@/components/common/FooterSection";
import HeaderSection from "@/components/common/HeaderSection";
import HeroSection from "@/components/section/HeroSection";
import ManageSection from "@/components/section/ManageSection";
import PromotionSection from "@/components/section/PromotionSection";
import StateSection from "@/components/section/StateSection";
import TestimonialSection from "@/components/section/TestimonialSection";
import HomePricing from "@/components/homePricing/homePricing";

export default function LandingPage() {
  return (
    <>
      <HeaderSection />
      <HeroSection />
      <StateSection />
      <PromotionSection />
      <HomePricing />
      <FeaturesSection />
      <ManageSection />
      <TestimonialSection />
      <FaqSection />
      <CtaSection />
      <FooterSection />
    </>
  );
}
