"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { BarChartIcon, Clock, UserCheckIcon } from "lucide-react";
import ChartIcon from "../svg/ChartIcon";
import DashIcon from "../svg/DahsIcon";

const features = [
  {
    title: "Save Time",
    description:
      "Automate administrative tasks and reduce double data entry so you can focus on delivering unforgettable service.",
    icon: Clock,
  },
  {
    title: "Reduce Costs",
    description:
      "No more out-of-stock surprises. Stay lean and avoid tying up cash in excess inventory.",
    icon: ChartIcon,
  },
  {
    title: "Delight Clients",
    description:
      "Offer a seamless, high-end experience from booking to checkout — and everything in between.",
    icon: UserCheckIcon,
  },
  {
    title: "Grow Confidently",
    description:
      "Whether you're a solo stylist or a salon with multiple locations, scale effortlessly without losing control.",
    icon: BarChartIcon,
    wide: true,
  },
  {
    title: "Stay in Control",
    description:
      "Full visibility on your finances, inventory, and client flow. No more guessing — just clarity.",
    icon: DashIcon,
    wide: true,
  },
];

export default function FeaturesSection() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out",
      once: true,
    });
  }, []);

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading (NO animation) */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-[44px] font-bold text-[#29343D] leading-[120%] font-manrope">
            Built for beauty
            <br />
            Designed for growth
          </h2>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 150}
                className={`
                  bg-[#F1F2FE]
                  rounded-xl
                  p-7
                  transition
                  hover:shadow-md
                  ${feature.wide ? "lg:col-span-3" : "lg:col-span-2"}
                `}
              >
                {/* Icon */}
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm mb-6">
                  <Icon className="w-6 h-6 text-[#635BFF]" />
                </div>

                {/* Title */}
                <h3 className="text-[#635BFF] font-bold text-[22px] font-manrope mb-4">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#526B7A] leading-relaxed font-manrope">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
