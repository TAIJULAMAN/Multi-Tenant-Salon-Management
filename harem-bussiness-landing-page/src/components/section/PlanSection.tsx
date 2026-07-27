"use client";

import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import PlanTable from "../plan/PlanTable";

export default function PlanSection() {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly");

    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: "ease-out",
            once: true,
        });
    }, []);

    return (
        <section id="pricing" className="w-full bg-[#F8FAFC] py-24 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto" data-aos="fade-up">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#1E293B] font-manrope leading-tight">
                        Plans for every stage <br /> of your salon
                    </h2>
                    <p className="mt-4 text-[#64748B] text-lg font-manrope">
                        Choose the right tools today and scale effortlessly tomorrow.
                    </p>

                    {/* Toggle */}
                    <div className="mt-10 flex justify-center">
                        <div className="bg-white p-1 rounded-full shadow-sm border border-[#E2E8F0] flex items-center">
                            <button
                                onClick={() => setBillingCycle("monthly")}
                                className={`px-8 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                                    billingCycle === "monthly"
                                        ? "bg-[#635BFF] text-white shadow-md"
                                        : "text-[#64748B] hover:text-[#1E293B]"
                                }`}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setBillingCycle("annually")}
                                className={`px-8 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                                    billingCycle === "annually"
                                        ? "bg-[#635BFF] text-white shadow-md"
                                        : "text-[#64748B] hover:text-[#1E293B]"
                                }`}
                            >
                                Annually
                            </button>
                        </div>
                    </div>
                </div>

                {/* Comparison Table */}
                <div data-aos="fade-up" data-aos-delay="200">
                    <PlanTable billingCycle={billingCycle} />
                </div>
            </div>
        </section>
    );
}

