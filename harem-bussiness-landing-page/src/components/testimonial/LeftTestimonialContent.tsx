import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function LeftTestimonialContent({ prevSlide, nextSlide, index, testimonials }: { prevSlide: () => void; nextSlide: () => void; index: number; testimonials: { text: string; name: string; role: string; image: string }[] }) {
    return (
        <>
            <div data-aos="fade-up">
                <h2 className="text-3xl leading-[120%] md:text-[44px] font-bold text-[#29343D] font-manrope mb-6">
                    Success stories from
                    <br />
                    real professionals
                </h2>

                <p className="text-[#526B7A] font-manrope font-normal text-[16px] md:text-[18px] max-w-sm mb-6">
                    Stylists and salons share why they rely on our tools to run their
                    business.
                </p>

                {/* Controls */}
                <div className="flex items-center gap-4 text-gray-500">
                    <button
                        onClick={prevSlide}
                        className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-200 transition cursor-pointer"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>

                    <span className="text-sm font-medium">
                        {index + 1} / {testimonials.length}
                    </span>

                    <button
                        onClick={nextSlide}
                        className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-200 transition cursor-pointer"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </>
    )
}
