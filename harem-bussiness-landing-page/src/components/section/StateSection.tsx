"use client";

import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function useCountUp(end: number, duration: number = 2000, start: boolean) {
    const [count, setCount] = useState(0);
    const startTime = useRef<number | null>(null);

    useEffect(() => {
        if (!start) return;

        const step = (timestamp: number) => {
            if (!startTime.current) startTime.current = timestamp;

            const progress = timestamp - startTime.current;
            const percentage = Math.min(progress / duration, 1);

            const eased = 1 - Math.pow(1 - percentage, 3);
            setCount(Math.floor(eased * end));

            if (percentage < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    }, [end, duration, start]);

    return count;
}

function StatItem({
    prefix = "",
    suffix = "",
    end,
    label,
    start,
}: {
    prefix?: string;
    suffix?: string;
    end: number;
    label: string;
    start: boolean;
}) {
    const count = useCountUp(end, 2000, start);

    return (
        <div className="text-center">
            <div className="text-[#635BFF] font-Manrope text-4xl sm:text-5xl lg:text-[64px] font-medium font-manrope">
                {prefix}
                {count.toLocaleString()}
                {suffix}
            </div>
            <p className="mt-4 text-[#526B7A] text-[14px] sm:text-base font-manrope font-normal leading-5">
                {label}
            </p>
        </div>
    );
}

export default function StateSection() {
    const [startCount, setStartCount] = useState(false);
    const sectionRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: "ease-out",
            once: true,
        });
    }, []);

    // IntersectionObserver for CountUp Trigger
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStartCount(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.4 }, // 40% visible hole start hobe
        );

        if (sectionRef.current) observer.observe(sectionRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <section className="w-full pt-12 md:pt-20 px-6">
            <div
                ref={sectionRef}
                data-aos="fade-up"
                className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-[40px] md:gap-[84px] items-center border-b border-[#E0E6EB] pb-12 md:pb-20"
            >
                {/* Left Text */}
                <div
                    data-aos="fade-up"
                    data-aos-delay="100"
                    className="w-full lg:w-1/3 text-center lg:text-left"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-[44px] font-bold text-[#29343D] leading-tight font-manrope">
                        A unique story in <br className="hidden sm:block" />
                        every number
                    </h2>
                </div>

                {/* Stats */}
                <div className="w-full lg:w-3/4 flex flex-col sm:flex-row">
                    <div data-aos="fade-up" data-aos-delay="200" className="flex-1">
                        <StatItem
                            prefix="+"
                            end={10000}
                            label="Beauty Businesses"
                            start={startCount}
                        />
                    </div>

                    <div data-aos="fade-up" data-aos-delay="350" className="flex-1">
                        <StatItem
                            end={49}
                            suffix="/5"
                            label="Average Rating"
                            start={startCount}
                        />
                    </div>

                    <div data-aos="fade-up" data-aos-delay="500" className="flex-1">
                        <StatItem
                            end={2}
                            suffix="M+"
                            label="Appointments Managed"
                            start={startCount}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
