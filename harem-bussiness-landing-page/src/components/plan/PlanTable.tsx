"use client";

import React from "react";
import { CircleCheck, X } from "lucide-react";

interface Plan {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  popular?: boolean;
}

interface FeatureRow {
  name: string;
  availability: (boolean | null)[];
}

const plans: Plan[] = [
  { name: "Single Use", monthlyPrice: 49, yearlyPrice: 490 },
  { name: "Multiple Use", monthlyPrice: 89, yearlyPrice: 890 },
  { name: "Extended Use", monthlyPrice: 299, yearlyPrice: 2990, popular: true },
  { name: "Unlimited Use", monthlyPrice: 499, yearlyPrice: 4990 },
];

const features: FeatureRow[] = [
  { name: "Feature 1", availability: [true, true, true, true] },
  { name: "Feature 2", availability: [true, true, true, true] },
  { name: "Feature 3", availability: [true, true, true, true] },
  { name: "Feature 4", availability: [true, true, true, true] },
  { name: "Feature 5", availability: [false, true, true, true] },
  { name: "Feature 6", availability: [false, false, true, true] },
  { name: "Feature 7", availability: [false, false, false, true] },
  { name: "Feature 8", availability: [false, false, false, true] },
];

export default function PlanTable({ billingCycle = "monthly" }: { billingCycle?: "monthly" | "annually" }) {
  return (
    <div className="mt-10 overflow-x-auto py-10 px-5 font-sans">
      <div className="min-w-[1000px] flex bg-white rounded-3xl shadow-[0_4px_40px_rgba(0,0,0,0.04)] border border-[#E2E8F0] py-10">
        {/* Features Column (Headers) */}
        <div style={{ flex: 1.2 }} className="flex flex-col">
          <div className="h-[240px] p-5 lg:p-10 flex items-center">
            <span className="text-[22px] font-semibold text-[#5A4BFC] mt-28">
              Features
            </span>
          </div>
          {features.map((feature, fIdx) => (
            <div
              key={fIdx}
              className="h-[72px] px-8 lg:px-10 flex items-center border-t border-[#F1F5F9]"
            >
              <span className="text-[#1E293B] font-medium text-[15px]">
                {feature.name}
              </span>
            </div>
          ))}
          <div className="h-8"></div>
        </div>

        {/* Plan Columns */}
        {plans.map((plan, pIdx) => {
          const isPopular = plan.popular;
          return (
            <div
              key={pIdx}
              style={{ flex: 1 }}
              className={`flex flex-col relative transition-all duration-300 ${isPopular
                ? "bg-[#5A4BFC] text-white rounded-[24px] shadow-2xl z-10"
                : "text-[#1E293B]"
                }`}
            >
              {/* Plan Header */}
              <div
                className={`h-[240px] p-6 lg:p-8 flex flex-col items-center justify-center text-center relative ${isPopular ? "pt-10" : ""}`}
              >
                {isPopular && (
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 mb-2">
                    <span className="bg-white text-[#5A4BFC] text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider shadow-sm">
                      Popular
                    </span>
                  </div>
                )}
                <h6
                  className={`text-[20px] leading-[1.2] tracking-normal font-semibold my-3 mt-5 ${isPopular ? "text-white" : "text-[#1E293B]"}`}
                >
                  {plan.name}
                </h6>
                <div className="flex items-baseline justify-center mb-6">
                  <span className="text-xl lg:text-3xl font-bold">
                    ${billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                  </span>
                  <span
                    className={`text-sm ml-1 font-medium ${isPopular ? "text-white/80" : "text-[#94A3B8]"}`}
                  >
                    / {billingCycle === "monthly" ? "month" : "year"}
                  </span>
                </div>
                <button
                  className={`w-full py-3 rounded-lg text-[15px] font-semibold transition-colors
                    ${isPopular
                      ? "bg-white text-[#5A4BFC] hover:bg-gray-50"
                      : "bg-[#E3E6FF] text-[#5A4BFC] hover:bg-[#d8dbff]"
                    }`}
                >
                  Purchase Now
                </button>
              </div>

              {/* Plan Features */}
              {features.map((feature, fIdx) => {
                const available = feature.availability[pIdx];
                return (
                  <div
                    key={fIdx}
                    className={`h-[72px] flex items-center justify-center ${isPopular ? "" : "border-t border-[#F1F5F9]"}`}
                  >
                    {available === true ? (
                      <CircleCheck
                        className={`w-[22px] h-[22px] ${isPopular ? "text-[#00C48C] bg-white rounded-full" : "text-[#00C48C]"}`}
                        strokeWidth={2.5}
                      />
                    ) : available === false ? (
                      <X
                        className={`w-5 h-5 ${isPopular ? "text-white/40" : "text-[#CBD5E1]"}`}
                        strokeWidth={2.5}
                      />
                    ) : null}
                  </div>
                );
              })}
              <div className="h-8"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
