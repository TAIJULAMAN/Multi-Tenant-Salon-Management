"use client";

import { Suspense } from "react";
import SalonHeader from "@/components/salonHome/SalonHeader";
import FooterSection from "@/components/common/FooterSection";
import BookingContent from "@/components/makeAnAppointment/BookingContent";

export default function MakeAnAppointmentPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <SalonHeader />
      <div className="flex-grow pt-32">
        <Suspense fallback={<div>Loading...</div>}>
          <BookingContent />
        </Suspense>
      </div>
      <FooterSection />
    </main>
  );
}
