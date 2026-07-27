"use client";

import FooterSection from "@/components/common/FooterSection";
import ContactUsSection from "./ContactUs";
import HeaderSection from "@/components/common/HeaderSection";

export default function ContactUsPage() {
  return (
    <main className="min-h-screen bg-white">
      <HeaderSection />
      <div className="pt-32">
        <ContactUsSection />
      </div>
      <FooterSection />
    </main>
  );
}
