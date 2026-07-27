"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const gallery = [
  "/gallery/gallery1.png",
  "/gallery/gallery2.png",
  "/gallery/gallery3.png",
  "/gallery/gallery4.png",
  "/gallery/gallery1.png",
  "/gallery/gallery2.png",
];

export default function HomeGallery() {
  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-16">
          <h2 className="text-3xl md:text-[56px] font-normal text-[#1E293B] font-manrope">
            Our Gallery
          </h2>
          <p className="text-[#64748B] hidden md:block font-manrope">Discover our latest works and styles</p>
        </div>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={24}
          slidesPerView={4}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="gallery-swiper"
        >
          {gallery.map((img, idx) => (
            <SwiperSlide key={idx}>
              <div
                className="relative h-[450px] w-full rounded-[32px] overflow-hidden group shadow-md"
              >
                <Image
                  src={img}
                  alt={`Gallery Image ${idx + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
