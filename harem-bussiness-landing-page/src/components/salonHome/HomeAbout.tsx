"use client";

import Image from "next/image";

export default function HomeAbout() {
  return (
    <section id="about" className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div data-aos="fade-right" className="relative h-[500px] w-full rounded-[40px] overflow-hidden shadow-2xl">
          <Image
            src="/about.png"
            alt="Our Professional Team"
            fill
            className="object-cover"
          />
        </div>
        <div data-aos="fade-left" className="space-y-8">
          <h2 className="text-3xl md:text-[56px] font-normal text-[#1E293B] font-manrope leading-tight">
            More Than a Salon — <br />
            A Place to <span className="text-[#635BFF]">Feel Your Best</span>
          </h2>
          <p className="text-[#64748B] text-lg leading-relaxed font-manrope">
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
          </p>
          <button className="bg-[#635BFF] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#534dfd] transition-all shadow-lg shadow-[#635BFF]/20">
            Learn more
          </button>
        </div>
      </div>
    </section>
  );
}
