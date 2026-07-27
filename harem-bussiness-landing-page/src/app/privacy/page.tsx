"use client";

import Link from "next/link";
import LogoIcon from "@/components/svg/LogoIcon";
import HeaderSection from "@/components/common/HeaderSection";
import FooterSection from "@/components/common/FooterSection";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <HeaderSection />
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-30">
        <div className="px-5 py-5 md:py-20">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1E293B] font-manrope mb-8">
            Privacy Policy
          </h1>
          <p className="text-[#64748B] font-manrope mb-12 text-lg">
            Last updated: May 15, 2026
          </p>

          <div className="prose prose-slate max-w-none space-y-12">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#1E293B] font-manrope">1. Introduction</h2>
              <p className="text-[#64748B] font-manrope leading-relaxed">
                Welcome to Harem. We are committed to protecting your personal information and your right to privacy.
                If you have any questions or concerns about our policy, or our practices with regards to your personal information,
                please contact us at privacy@yourlogo.com.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#1E293B] font-manrope">2. Information We Collect</h2>
              <p className="text-[#64748B] font-manrope leading-relaxed">
                We collect personal information that you provide to us such as name, address, contact information, passwords and security data,
                and payment information. This information is used to provide you with the best possible service and to maintain the security of our platform.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#1E293B] font-manrope">3. How We Use Your Information</h2>
              <p className="text-[#64748B] font-manrope leading-relaxed">
                We use personal information collected via our Services for a variety of business purposes described below.
                We process your personal information for these purposes in reliance on our legitimate business interests,
                in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#1E293B] font-manrope">4. Sharing Your Information</h2>
              <p className="text-[#64748B] font-manrope leading-relaxed">
                We only share information with your consent, to comply with laws, to provide you with services, to protect your rights,
                or to fulfill business obligations. We do not sell your personal data to third parties.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#1E293B] font-manrope">5. Data Security</h2>
              <p className="text-[#64748B] font-manrope leading-relaxed">
                We aim to protect your personal information through a system of organizational and technical security measures.
                However, please also remember that we cannot guarantee that the internet itself is 100% secure.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#1E293B] font-manrope">6. Your Privacy Rights</h2>
              <p className="text-[#64748B] font-manrope leading-relaxed">
                In some regions, such as the European Economic Area, you have rights that allow you greater access to and control over your personal information.
                You may review, change, or terminate your account at any time.
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
