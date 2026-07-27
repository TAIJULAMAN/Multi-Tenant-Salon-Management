"use client";

import SalonHeader from "@/components/salonHome/SalonHeader";
import FooterSection from "@/components/common/FooterSection";
import ScheduleContent from "@/components/service/ScheduleContent";

export default function ScheduleServicePage() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <SalonHeader />
      <div className="pt-36 md:pt-40 pb-10">
        <ScheduleContent />
      </div>
      <FooterSection />
    </main>
  );
}
