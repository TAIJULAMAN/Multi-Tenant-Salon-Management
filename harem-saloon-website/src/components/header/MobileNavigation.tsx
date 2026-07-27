import Link from 'next/link';
import React from 'react'

export default function MobileNavigation({ isOpen, setIsOpen, navLinks }: { isOpen: boolean; setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; navLinks: { href: string; label: string }[] }) {
    return (
        <>
            {isOpen && (
                <div
                    className="absolute top-full left-0 w-full bg-white shadow-xl 
        border-b border-gray-100 md:hidden animate-in slide-in-from-top duration-300"
                >
                    <div className="flex flex-col p-6 gap-3 md:gap-4 lg:gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-lg font-semibold text-[#2D3142] hover:text-[#5F63F2]"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="flex flex-col gap-4 pt-4">
                            <button
                                className="w-full px-4 py-2.5 font-manrope rounded-[8px] bg-[#DDDBFF] 
              text-[#635BFF] font-medium transition-colors cursor-pointer leading-6 font-sm"
                            >
                                Get Started
                            </button>
                            <button className="w-full py-3 rounded-lg border-2 border-[#5F63F2] text-[#5F63F2] font-bold">
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
