"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { Radio, RefreshCcw, TrendingUp } from "lucide-react";
import DashBoardIcon from "../svg/DashBoardIcon";

const features = [
    {
        title: "Set up in minutes",
        description:
            "Import your team, services, and products. We guide you through every step.",
        icon: DashBoardIcon,
        color: "text-pink-500",
        bg: "bg-pink-100",
    },
    {
        title: "Connect your channels",
        description:
            "Keep everything organized in one place and ensure a consistent experience for your clients.",
        icon: Radio,
        color: "text-indigo-500",
        bg: "bg-indigo-100",
    },
    {
        title: "Automate everything",
        description: "Turn on reminders and rebooking campaigns.",
        icon: RefreshCcw,
        color: "text-teal-500",
        bg: "bg-teal-100",
    },
    {
        title: "Track and scale",
        description:
            "Monitor performance, make smarter buys, and budget with confidence.",
        icon: TrendingUp,
        color: "text-gray-700",
        bg: "bg-gray-200",
    },
];

export default function ManageSection() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: "ease-out",
            once: true,
        });
    }, []);

    return (
        <section className="bg-white py-20 px-6">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
                {/* Left content */}
                <div data-aos="fade-up">
                    <h2 className="text-3xl md:text-[44px] font-semibold text-[#29343D] leading-[120%] mb-6 font-manrope">
                        A simpler way to
                        <br />
                        manage your salon
                    </h2>

                    <p className="text-[#526B7A] font-manrope max-w-md mb-6">
                        From setup to automation, every step is designed to save time and
                        reduce complexity.
                    </p>

                    <button className="bg-[#635BFF] text-[14px] font-manrope text-white px-4 py-2.5 rounded-[10px] font-medium cursor-pointer hover:bg-[#4B4ECA] transition-all duration-300 hover:-translate-y-0.5 active:scale-95">
                        Explore Now
                    </button>
                </div>

                {/* Right grid */}
                <div className="grid sm:grid-cols-2 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={index}
                                data-aos="fade-up"
                                data-aos-delay={index * 150}
                                className="flex flex-col items-left text-left gap-3"
                            >
                                {/* Icon */}
                                <div
                                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${feature.bg}`}
                                >
                                    <Icon className={`w-6 h-6 ${feature.color}`} />
                                </div>

                                {/* Text */}
                                <div>
                                    <h3 className="font-bold text-[#29343D] text[22px] font-manrope mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-[#526B7A] leading-relaxed font-manrope">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
