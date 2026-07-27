"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import LogoIcon from "../svg/LogoIcon";
import MobileNavigation from "../header/MobileNavigation";
import CtaButton from "../header/CtaButton";

export default function HeaderSection() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { href: "/#features", label: "Features" },
        { href: "/#pricing", label: "Pricing" },
        { href: "/#testimonials", label: "Testimonials" },
        { href: "/ContactUs", label: "Contact Us" },
    ];

    return (
        <header className="absolute top-0 left-0 z-50 w-full bg-transparent pt-3">
            <div className="flex h-20 max-w-7xl mx-auto items-center justify-between px-4 md:px-8 lg:px-12">
                {/* Logo Section */}
                <Link href="/" className="flex items-center">
                    <div className="relative w-8 h-8 md:w-10 md:h-10">
                        <LogoIcon />
                    </div>
                    <span className="text-[18px] font-manrope font-bold text-[#635BFF] pb-1">
                        Your logo
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-[15px] font-manrope text-[#0A2540] font-semibold transition-colors hover:text-[#635BFF]"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* CTA Buttons */}
                <CtaButton />

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 text-[#2D3142]"
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Navigation Dropdown */}
            <MobileNavigation isOpen={isOpen} setIsOpen={setIsOpen} navLinks={navLinks} />
        </header>
    );
}
