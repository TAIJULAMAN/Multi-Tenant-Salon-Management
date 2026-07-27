import React from 'react'
import Image from "next/image";
import Link from "next/link";
export default function HeroCta({ setOpenVideo }: { setOpenVideo: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <>
            <div
                data-aos="fade-up"
                data-aos-delay="300"
                className="flex flex-col items-center gap-2 z-10"
            >
                <div className="flex items-center gap-4 flex-wrap justify-center">
                    <Link
                        href="/#pricing"
                        className="px-4 py-2.5 font-manrope bg-[#635BFF] text-white text-[14px] lg:text-[16px] rounded-[8px] 
                    hover:bg-[#4B4ECA] transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer block text-center"
                    >
                        Start Your Free Trial
                    </Link>

                    {/* Watch Overview Button */}
                    <button
                        onClick={() => setOpenVideo(true)}
                        className="px-4 py-2 font-manrope border border-[#635BFF] text-[#635BFF] text-[14px] lg:text-[16px] rounded-[8px] 
                     transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer flex items-center gap-1"
                    >
                        <Image
                            src="/images/play.svg"
                            alt="play"
                            width={24}
                            height={24}
                            priority
                            className='w-4 h-4 lg:w-6 lg:h-6'
                        />
                        Watch an overview
                    </button>
                </div>

                <span className="text-sm font-medium text-[#526B7A] text-normal leading-6 font-manrope">
                    No credit card needed
                </span>
            </div>
        </>
    )
}
