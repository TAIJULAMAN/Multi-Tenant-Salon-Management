"use client";

import Image from "next/image";
import Link from "next/link";

export default function HomeCta() {
  return (
    <section id="cta" className="pt-20 relative overflow-hidden">
      <div className="relative z-10">
        <div className="relative h-[450px] w-full overflow-hidden flex flex-col items-center justify-center text-center px-4">
          <Image
            src="/cta.png"
            alt="Book Now"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50 z-0" />
          <div className="relative z-10 space-y-8">
            <h2 data-aos="fade-up" className="text-3xl md:text-[56px] font-normal text-white font-manrope leading-tight max-w-3xl">
              Book Your Appointment Today
            </h2>
            <p data-aos="fade-up" data-aos-delay="200" className="text-white/80 text-lg md:text-xl font-manrope">
              Don't wait for your beauty moment. Reserve your spot now.
            </p>
            <Link href="/ScheduleService">
              <button
                data-aos="fade-up"
                data-aos-delay="400"
                className="border-2 border-white text-white px-4 py-2 rounded-lg font-bold text-lg transition-all shadow-2xl hover:bg-white hover:text-black"
              >
                Appointment
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
