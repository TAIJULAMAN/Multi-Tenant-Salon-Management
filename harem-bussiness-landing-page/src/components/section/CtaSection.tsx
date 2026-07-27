"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Image from "next/image";

export default function CtaSection() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: "ease-out",
            once: true,
        });
    }, []);

    return (
        <section className="relative overflow-hidden">
            {/* Gradient background */}
            <div className="bg-[#635BFF] from-indigo-600 via-indigo-500 to-purple-500 h-[400px]">
                <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24 grid lg:grid-cols-2 gap-10 items-center">
                    {/* Left content */}
                    <div data-aos="fade-up" className="text-white items-center mb-60">
                        <h2 className="text-2xl md:text-3xl lg:text-[42px] font-bold font-manrope leading-tight mb-4">
                            Ready to elevate your salon?
                        </h2>

                        <p className="text-white md:text-[18px] mb-8 max-w-xl font-manrope">
                            Try it free today – streamline your operations, delight your
                            clients, and grow your business with confidence.
                        </p>

                        <button className="border border-white text-[14px] font-manrope text-white px-4 py-2.5 rounded-[10px] font-medium cursor-pointer transition-all duration-300 hover:-translate-y-0.5 active:scale-95">
                            Get Started Free
                        </button>
                    </div>

                    {/* Right images */}
                    <div
                        data-aos="fade-up"
                        data-aos-delay="200"
                        className="relative hidden lg:block"
                    >
                        <div className="relative h-[480px]">
                            {/* Main Dashboard Image */}
                            <Image
                                src="/images/team.svg"
                                alt="Dashboard preview"
                                width={300}
                                height={400}
                                priority
                                className="
                  absolute 
                  right-[-335px] 
                  top-[-100px]
                  w-[600px]
                  max-w-none
                  rounded-xl
                "
                            />

                            {/* Floating Overlay Image */}
                            <Image
                                src="/images/calender.svg"
                                alt="Analytics panel"
                                width={400}
                                height={460}
                                className="
                  absolute 
                  left-[35px]
                  right-[50px] 
                  top-[-40px]
                  w-[700px]
                  max-w-none
                  rounded-xl
                "
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
