"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import LogoIcon from "../svg/LogoIcon";

export default function SalonHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/#about", label: "About us" },
    { href: "/#services", label: "Services" },
    { href: "/#testimonials", label: "Testimonials" },
    { href: "/buyVoucher", label: "Buy Gift Card" },
    // { href: "/ContactUs", label: "Contact Us" },
  ];

  return (
    <header className="absolute top-8 left-0 right-0 z-50 px-2">
      <div className="max-w-7xl mx-auto bg-white rounded-[24px] shadow-xl border border-gray-100/50">
        <div className="flex h-20 items-center justify-between px-5">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8 md:w-10 md:h-10">
              <LogoIcon />
            </div>
            <span className="text-[18px] font-manrope font-bold text-[#635BFF]">
              Your logo
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            <nav className="flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[15px] font-manrope text-[#1E293B] font-semibold transition-colors hover:text-[#635BFF]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4">
              <Link href="/ScheduleService">
                <button className="bg-[#635BFF] text-white px-6 py-2.5 rounded-xl font-bold font-manrope text-sm hover:bg-[#534dfd] transition-all shadow-lg shadow-[#635BFF]/20">
                  Schedule Now
                </button>
              </Link>
              <Link href="/login">
                <button className="border-2 border-[#635BFF] text-[#635BFF] px-6 py-2.5 rounded-xl font-bold font-manrope text-sm hover:bg-[#635BFF] hover:text-white transition-all">
                  Login
                </button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-[#1E293B]"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isOpen && (
          <div className="md:hidden px-6 pb-8 pt-2 border-t border-gray-50">
            <nav className="flex flex-col gap-4 mb-6">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-[16px] font-manrope text-[#1E293B] font-semibold"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-4">
              <Link href="/ScheduleService" onClick={() => setIsOpen(false)}>
                <button className="w-full bg-[#635BFF] text-white px-6 py-3 rounded-xl font-bold font-manrope text-sm shadow-lg shadow-[#635BFF]/20">
                  Schedule Now
                </button>
              </Link>
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <button className="w-full border-2 border-[#635BFF] text-[#635BFF] px-6 py-3 rounded-xl font-bold font-manrope text-sm">
                  Login
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
