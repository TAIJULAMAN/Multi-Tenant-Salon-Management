"use client";

import SalonHeader from "@/components/salonHome/SalonHeader";
import FooterSection from "@/components/common/FooterSection";
import ContactUsSection from "./ContactUs";

export default function ContactUsPage() {
  return (
    <main className="min-h-screen bg-white">
      <SalonHeader />
      <div className="pt-32">
        <ContactUsSection />
      </div>
      <FooterSection />
    </main>
  );
}
