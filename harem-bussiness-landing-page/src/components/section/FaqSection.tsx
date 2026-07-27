"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

// AOS
import AOS from "aos";
import "aos/dist/aos.css";

const faqs = [
  {
    question:
      "Does the platform work for solo stylists as well as full salons?",
    answer:
      "Yes. Our tools are designed to support solo professionals, small teams, and multi-location salons. You can start small and scale anytime.",
  },
  {
    question: "Do I need technical experience to set everything up?",
    answer:
      "No. The platform is designed to be intuitive and easy to use, even for beginners.",
  },
  {
    question: "Can I migrate from another system?",
    answer:
      "Yes. We provide migration tools and support to help you move your data smoothly.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We use industry-standard encryption and security practices.",
  },
  {
    question: "Do you offer customer support?",
    answer:
      "Yes. Our support team is available to assist you whenever you need help.",
  },
  {
    question: "Do you charge additional fees for staff members?",
    answer:
      "No hidden fees. Pricing is transparent and scales with your business.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out",
      once: true,
    });
  }, []);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <h2 className="text-center text-3xl md:text-[44px] font-semibold font-manrope text-[#29343D] mb-14">
          Frequently asked questions
        </h2>

        {/* FAQ list */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 120}
                className="bg-white border border-[#E0E6EB] rounded-xl overflow-hidden"
              >
                {/* Question */}
                <button
                  onClick={() => toggle(index)}
                  className={`w-full flex items-center justify-between text-left px-5 py-4 rounded-xl ${
                    isOpen ? "border-b border-[#E0E6EB]" : ""
                  }`}
                >
                  <span className="text-[#29343D] font-manrope font-semibold text-sm md:text-base cursor-pointer">
                    {faq.question}
                  </span>

                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  )}
                </button>

                {/* Answer */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-5">
                    <p className="text-sm text-[#98A4AE] leading-relaxed pt-5 font-manrope">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
