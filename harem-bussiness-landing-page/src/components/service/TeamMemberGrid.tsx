"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Member {
  name: string;
  role: string;
  image: string;
}

export default function TeamMemberGrid({ team }: { team: Member[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-[#1E293B] font-manrope">Team Members</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => scroll("left")}
            className="p-2 rounded-full border border-gray-200 text-gray-400 hover:text-[#635BFF] hover:border-[#635BFF] transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => scroll("right")}
            className="p-2 rounded-full border border-gray-200 text-gray-400 hover:text-[#635BFF] hover:border-[#635BFF] transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div 
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth"
      >
        {team.map((member, idx) => (
          <div key={`${member.name}-${idx}`} className="flex-shrink-0 w-[calc(50%-16px)] md:w-[calc(25%-24px)] text-center group cursor-pointer">
            <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-transparent group-hover:border-[#635BFF] transition-all">
              <Image src={member.image} alt={member.name} fill className="object-cover" />
            </div>
            <h4 className="font-bold text-[#1E293B] font-manrope text-sm">{member.name}</h4>
            <p className="text-xs text-[#64748B] font-manrope mt-1">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
