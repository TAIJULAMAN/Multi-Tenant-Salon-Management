"use client";

import Link from "next/link";

interface BreadcrumbsProps {
  title: string;
}

export default function Breadcrumbs({ title }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-3 text-sm text-[#64748B] mb-12 font-manrope">
      <Link href="/" className="w-8 h-8 flex items-center justify-center bg-[#F1F5F9] rounded-lg hover:bg-[#E2E8F0] transition-colors group">
        <svg className="w-4 h-4 text-gray-500 group-hover:text-[#635BFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </Link>
      <span className="text-gray-300">/</span>
      <span className="bg-[#DDDBFF] px-4 py-1.5 rounded-full text-[#635BFF] font-bold text-xs uppercase tracking-wide">
        {title}
      </span>
    </nav>
  );
}
