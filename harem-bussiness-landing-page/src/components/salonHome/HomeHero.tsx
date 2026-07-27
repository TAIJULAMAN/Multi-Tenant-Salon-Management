"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const bannerImages = [
  "/banner/banner1.png",
  "/banner/banner2.png",
  "/banner/banner3.png",
];

export default function HomeHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <style>{`
        .hero-swiper .swiper-pagination-bullet {
          width: 10px !important;
          height: 10px !important;
          background: white !important;
          opacity: 0.5 !important;
          transition: all 0.3s ease !important;
          border: 2px solid transparent !important;
          margin-bottom: 30px !important;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          background: #635BFF !important;
          opacity: 1 !important;
          width: 28px !important;
          border-radius: 5px !important;
        
        }
      `}</style>
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="h-full w-full hero-swiper"
      >
        {bannerImages.map((img, idx) => (
          <SwiperSlide key={idx} className="relative h-full w-full">
            <div className="absolute inset-0 bg-black/40 z-10" />
            <Image
              src={img}
              alt={`Banner ${idx + 1}`}
              fill
              className="object-cover"
              priority={idx === 0}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
        <h1
          data-aos="fade-up"
          className="text-white text-4xl md:text-[56px] font-normal font-manrope max-w-4xl leading-tight mb-6"
        >
          More than a service. <br /> A beauty experience.
        </h1>
        <p
          data-aos="fade-up"
          data-aos-delay="200"
          className="text-white/80 text-lg md:text-xl font-manrope mb-10 max-w-2xl"
        >
          Experience the best beauty services in the city with our expert team.
        </p>
        <button
          data-aos="fade-up"
          data-aos-delay="400"
          className="bg-white text-[#1E293B] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#635BFF] hover:text-white transition-all duration-300 shadow-xl"
        >
          Schedule a Service
        </button>
      </div>
    </section>
  );
}
