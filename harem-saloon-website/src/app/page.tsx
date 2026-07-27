"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";


import SalonHeader from "@/components/salonHome/SalonHeader";
import FooterSection from "@/components/common/FooterSection";
import TestimonialSection from "@/components/section/TestimonialSection";
import HomeHero from "@/components/salonHome/HomeHero";
import HomeStats from "@/components/salonHome/HomeStats";
import HomeAbout from "@/components/salonHome/HomeAbout";
import HomeServices from "@/components/salonHome/HomeServices";
import HomeGallery from "@/components/salonHome/HomeGallery";
import HomePhilosophy from "@/components/salonHome/HomePhilosophy";
import HomeCta from "@/components/salonHome/HomeCta";

export default function HomePage() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out",
      once: true,
    });
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <SalonHeader />
      <HomeHero />
      <HomeStats />
      <HomeAbout />
      <HomeServices />
      <TestimonialSection />
      <HomeGallery />
      <HomePhilosophy />
      <HomeCta />
      <FooterSection />
    </main>
  );
}
