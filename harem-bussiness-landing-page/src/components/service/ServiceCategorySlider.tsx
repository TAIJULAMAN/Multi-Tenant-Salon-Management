"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

export default function ServiceCategorySlider({ categories, selectedCategory, onSelect }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - 200 : scrollLeft + 200;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="flex items-center gap-3 mb-8">
      <button
        onClick={() => scroll("left")}
        className="flex-shrink-0 w-10 h-10 bg-[#E2E1FF] rounded-full flex items-center justify-center text-[#635BFF] transition-all hover:bg-[#d4d2ff]"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div
        ref={scrollRef}
        className="flex items-center gap-3 overflow-x-auto scrollbar-hide py-2"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all font-manrope ${selectedCategory === cat
              ? "bg-[#E2E1FF] text-[#635BFF]"
              : "bg-[#F1F5F9] text-[#1E293B] hover:bg-gray-100"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="flex-shrink-0 w-10 h-10 bg-[#E2E1FF] rounded-full flex items-center justify-center text-[#635BFF] transition-all hover:bg-[#d4d2ff]"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
