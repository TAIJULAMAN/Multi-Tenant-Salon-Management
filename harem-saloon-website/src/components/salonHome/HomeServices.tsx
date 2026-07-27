"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

const services = [
  {
    title: "Hair Cut",
    oldPrice: "$79.99",
    price: "$49.99",
    image: "/service/service1.png",
    delay: 100,
  },
  {
    title: "Dye Hair",
    oldPrice: "$399.99",
    price: "$299.99",
    image: "/service/service2.png",
    delay: 200,
  },
  {
    title: "MakeUp",
    oldPrice: "$109.99",
    price: "$89.99",
    image: "/service/service3.png",
    delay: 300,
  },
  {
    title: "Facial",
    oldPrice: "$129.99",
    price: "$99.99",
    image: "/service/service1.png",
    delay: 400,
  },
  {
    title: "Nails",
    oldPrice: "$59.99",
    price: "$39.99",
    image: "/service/service2.png",
    delay: 500,
  },
];

export default function HomeServices() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<any>(null);

  return (
    <section id="services" className="py-24 px-6 bg-[#ECEBFF]">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-16">
          <h2 className="text-3xl md:text-[56px] font-semibold text-[#635BFF] font-manrope">
            Our Services
          </h2>
          <Link
            href="/ScheduleService"
            className="bg-[#635BFF] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-[#534dfd] transition-all shadow-lg shadow-[#635BFF]/20 text-sm md:text-base"
          >
            View All <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="mb-16">
          <Swiper
            modules={[Navigation]}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {services.map((service, idx) => (
              <SwiperSlide key={idx}>
                <div
                  data-aos="fade-up"
                  data-aos-delay={service.delay}
                  className="bg-white rounded-[16px] shadow-sm hover:shadow-xl transition-all duration-300 group h-full"
                >
                  <div className="relative h-[280px] w-full rounded-t-[16px] overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-8 space-y-4">
                    <h3 className="text-xl font-bold text-[#1E293B] font-manrope">{service.title}</h3>
                    <div className="space-y-1">
                      <p className="text-[#64748B] text-sm font-manrope line-through">{service.oldPrice}</p>
                      <p className="text-[40px] font-bold text-[#635BFF] font-manrope leading-none">
                        {service.price}
                      </p>
                    </div>
                    <Link href="/ScheduleService">
                      <button className="w-full bg-[#E0DFFF] text-[#635BFF] py-3.5 rounded-lg font-bold hover:bg-[#635BFF] hover:text-white transition-all duration-300">
                        Book Now
                      </button>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 hover:text-[#635BFF] transition-colors shadow-sm disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
          <span className="text-gray-500 font-manrope text-sm font-medium">
            {activeIndex + 1} / {services.length}
          </span>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 hover:text-[#635BFF] transition-colors shadow-sm disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
