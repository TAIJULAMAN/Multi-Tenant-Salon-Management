"use client";

import Link from "next/link";
import FooterSection from "@/components/common/FooterSection";
import HeaderSection from "@/components/common/HeaderSection";

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <HeaderSection />
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="px-5 py-5 md:py-20">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1E293B] font-manrope mb-8">
            Terms of Service
          </h1>
          <p className="text-[#64748B] font-manrope mb-12 text-lg">
            Last updated: May 15, 2026
          </p>

          <div className="prose prose-slate max-w-none space-y-12">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#1E293B] font-manrope">1. Agreement to Terms</h2>
              <p className="text-[#64748B] font-manrope leading-relaxed">
                By accessing or using our Services, you agree to be bound by these Terms. If you disagree with any part of the terms,
                then you may not access the Services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#1E293B] font-manrope">2. Intellectual Property</h2>
              <p className="text-[#64748B] font-manrope leading-relaxed">
                The Service and its original content, features, and functionality are and will remain the exclusive property of Harem
                and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without
                the prior written consent of Harem.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#1E293B] font-manrope">3. User Accounts</h2>
              <p className="text-[#64748B] font-manrope leading-relaxed">
                When you create an account with us, you must provide information that is accurate, complete, and current at all times.
                Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#1E293B] font-manrope">4. Limitation of Liability</h2>
              <p className="text-[#64748B] font-manrope leading-relaxed">
                In no event shall Harem, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect,
                incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill,
                or other intangible losses.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#1E293B] font-manrope">5. Termination</h2>
              <p className="text-[#64748B] font-manrope leading-relaxed">
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever,
                including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#1E293B] font-manrope">6. Changes to Terms</h2>
              <p className="text-[#64748B] font-manrope leading-relaxed">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material
                we will try to provide at least 30 days notice prior to any new terms taking effect.
              </p>
            </section>
          </div>

          <div className="mt-16 pt-8 border-t border-[#E2E8F0] flex justify-center">
            <Link href="/signup">
              <button className="bg-[#635BFF] text-white px-10 py-4 rounded-xl font-bold font-manrope hover:bg-[#534dfd] transition-all shadow-lg shadow-[#635BFF]/20">
                Back to Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
      <FooterSection />
    </main>
  );
}
