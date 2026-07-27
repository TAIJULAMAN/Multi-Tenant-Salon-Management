"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import LeftTestimonialContent from "../testimonial/LeftTestimonialContent";

const testimonials = [
    {
        text: "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        name: "Jenny Wilson",
        role: "CEO & Head of Comp Inc.",
        image: "/images/avatar.png",
    },
    {
        text: "This platform completely transformed how we manage our salon operations. Everything is streamlined and incredibly easy to use.",
        name: "Robert Fox",
        role: "Founder, Style Studio",
        image: "/images/avatar.png",
    },
    {
        text: "Our team productivity increased by 40% after switching. The automation features are a game changer.",
        name: "Cameron Williamson",
        role: "Salon Manager",
        image: "/images/avatar.png",
    },
    {
        text: "Customer satisfaction has improved dramatically. Booking and payments are now seamless.",
        name: "Savannah Nguyen",
        role: "Operations Lead",
        image: "/images/avatar.png",
    },
    {
        text: "I highly recommend this to any growing salon business. It scales beautifully.",
        name: "Devon Lane",
        role: "Owner, Luxe Beauty",
        image: "/images/avatar.png",
    },
];

export default function TestimonialSection() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: "ease-out",
            once: true,
        });
    }, []);

    const nextSlide = () => {
        setIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    return (
        <section id="testimonials" className=" py-20 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-14 items-start">
                    {/* LEFT SIDE */}
                    <LeftTestimonialContent prevSlide={prevSlide} nextSlide={nextSlide} index={index} testimonials={testimonials} />

                    {/* RIGHT SIDE */}
                    <div
                        data-aos="fade-up"
                        data-aos-delay="150"
                        className="relative min-h-[220px]"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.35 }}
                            >
                                <p className="text-[#29343D] font-manrope font-normal text-[16px] md:text-[18px] leading-[150%] mb-8 max-w-xl">
                                    {testimonials[index].text}
                                </p>

                                <div className="flex items-center gap-4">
                                    <Image
                                        src={testimonials[index].image}
                                        alt={testimonials[index].name}
                                        width={48}
                                        height={48}
                                        className="rounded-full object-cover"
                                    />

                                    <div>
                                        <p className="font-semibold text-gray-800">
                                            {testimonials[index].name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {testimonials[index].role}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Quote Icon */}
                        <div className="absolute right-0 bottom-8">
                            <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center shadow-md">
                                <Image
                                    src="/images/qoute.png"
                                    width={24}
                                    height={24}
                                    alt="Quote"
                                    className="w-6 h-6 object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div
                    data-aos="fade-up"
                    data-aos-delay="250"
                    className="border-t border-gray-200 mt-16 pt-10 overflow-hidden"
                >
                    <motion.div
                        className="flex gap-12 items-center w-max opacity-60"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            repeat: Infinity,
                            duration: 18,
                            ease: "linear",
                        }}
                    >
                        {/* First Set */}
                        <div className="flex gap-12 items-center">
                            <Image
                                src="/images/intel.svg"
                                alt="Intel"
                                height={24}
                                width={120}
                                className="h-6 w-auto opacity-60 hover:opacity-100 transition"
                            />
                            <Image
                                src="/images/oracle.svg"
                                alt="Oracle"
                                height={24}
                                width={80}
                                className="h-6 w-auto opacity-60 hover:opacity-100 transition"
                            />
                            <Image
                                src="/images/dell.svg"
                                alt="Dell"
                                height={24}
                                width={120}
                                className="h-6 w-auto opacity-60 hover:opacity-100 transition"
                            />
                            <Image
                                src="/images/samsung.svg"
                                alt="Samsung"
                                height={24}
                                width={80}
                                className="h-6 w-auto opacity-60 hover:opacity-100 transition"
                            />
                            <Image
                                src="/images/infosys.svg"
                                alt="Infosys"
                                height={24}
                                width={80}
                                className="h-6 w-auto opacity-60 hover:opacity-100 transition"
                            />
                            <Image
                                src="/images/capgemini.svg"
                                alt="Capgemini"
                                height={24}
                                width={80}
                                className="h-6 w-auto opacity-60 hover:opacity-100 transition"
                            />
                        </div>

                        {/* Duplicate Set */}
                        <div className="flex gap-12 items-center">
                            <Image
                                src="/images/intel.svg"
                                alt="Intel"
                                height={24}
                                width={120}
                                className="h-6 w-auto opacity-60 hover:opacity-100 transition"
                            />
                            <Image
                                src="/images/oracle.svg"
                                alt="Oracle"
                                height={24}
                                width={80}
                                className="h-6 w-auto opacity-60 hover:opacity-100 transition"
                            />
                            <Image
                                src="/images/dell.svg"
                                alt="Dell"
                                height={24}
                                width={120}
                                className="h-6 w-auto opacity-60 hover:opacity-100 transition"
                            />
                            <Image
                                src="/images/samsung.svg"
                                alt="Samsung"
                                height={24}
                                width={80}
                                className="h-6 w-auto opacity-60 hover:opacity-100 transition"
                            />
                            <Image
                                src="/images/infosys.svg"
                                alt="Infosys"
                                height={24}
                                width={80}
                                className="h-6 w-auto opacity-60 hover:opacity-100 transition"
                            />
                            <Image
                                src="/images/capgemini.svg"
                                alt="Capgemini"
                                height={24}
                                width={80}
                                className="h-6 w-auto opacity-60 hover:opacity-100 transition"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
