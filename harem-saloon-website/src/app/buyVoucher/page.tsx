"use client";

import SalonHeader from "@/components/salonHome/SalonHeader";
import FooterSection from "@/components/common/FooterSection";
import BuyVoucherContent from "@/components/buyVoucher/BuyVoucherContent";

export default function BuyVoucherPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <SalonHeader />
      <div className="flex-grow pt-24">
        <BuyVoucherContent />
      </div>
      <FooterSection />
    </main>
  );
}
