"use client";

import { Award, Heart, Sparkles, CheckCircle2 } from "lucide-react";

const philosophy = [
  {
    title: "Expertise",
    description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley.",
    icon: <Award className="w-6 h-6 text-[#635BFF]" />,
    delay: 100,
  },
  {
    title: "Personal Care",
    description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley.",
    icon: <Heart className="w-6 h-6 text-[#635BFF]" />,
    delay: 200,
  },
  {
    title: "Creativity",
    description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley.",
    icon: <Sparkles className="w-6 h-6 text-[#635BFF]" />,
    delay: 300,
  },
  {
    title: "Quality Products",
    description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley.",
    icon: <CheckCircle2 className="w-6 h-6 text-[#635BFF]" />,
    delay: 400,
  },
];

export default function HomePhilosophy() {
  return (
    <section className="py-24 px-6 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20">
          <div data-aos="fade-up">
            <h2 className="text-3xl md:text-[56px] font-normal text-[#1E293B] font-manrope leading-tight mb-8">
              Our Philosophy <br /> of Beauty
            </h2>
            <p className="text-[#64748B] text-lg mb-10 max-w-lg font-manrope">
              We believe that every person deserves to feel beautiful. Our approach combines expertise with personalized care.
            </p>
            <button className="bg-[#635BFF] text-white px-4 py-2 rounded-lg font-bold text-lg hover:bg-[#534dfd] transition-all shadow-lg shadow-[#635BFF]/20">
              Schedule Now
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-8 lg:gap-12">
            {philosophy.map((item, idx) => (
              <div key={idx} data-aos="fade-up" data-aos-delay={item.delay} className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-md">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-[#1E293B] font-manrope">{item.title}</h3>
                <p className="text-[#64748B] leading-relaxed text-sm font-manrope">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
