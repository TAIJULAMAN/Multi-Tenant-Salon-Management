"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";

const team = [
  { id: "any", name: "Any\nProfessional", role: "", image: null },
  {
    id: "1",
    name: "Virgie\nSutton",
    role: "Hair Stylist",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Fernanda\nSuarez",
    role: "Hair Stylist",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Lois\nGregory",
    role: "Hair Stylist",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Maria\nFernandez",
    role: "Hair Stylist",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "5",
    name: "Sophia\nTurner",
    role: "Colorist",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "6",
    name: "Emma\nWatson",
    role: "Nail Artist",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "7",
    name: "Olivia\nBrown",
    role: "Makeup Artist",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "8",
    name: "Isabella\nDavis",
    role: "Esthetician",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "9",
    name: "Mia\nMiller",
    role: "Massage Therapist",
    image:
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=200&auto=format&fit=crop",
  },
];

export default function TeamMemberSelection() {
  const [selectedMembers, setSelectedMembers] = useState<string[]>(["any"]);

  const toggleMember = (id: string) => {
    if (id === "any") {
      setSelectedMembers(["any"]);
      return;
    }

    setSelectedMembers((prev) => {
      const withoutAny = prev.filter(mId => mId !== "any");
      
      if (withoutAny.includes(id)) {
        const newSelection = withoutAny.filter(mId => mId !== id);
        return newSelection.length === 0 ? ["any"] : newSelection;
      } else {
        return [...withoutAny, id];
      }
    });
  };
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 280; // Approximate width of 2 items plus gap
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mb-10">
      <h3 className="text-lg font-bold text-[#1E293B] font-manrope mb-4">
        Select a Team Member
      </h3>

      <div className="relative flex items-center">
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-0 z-10 -ml-4 w-8 h-8 rounded-full bg-white border border-gray-100 items-center justify-center text-gray-400 shadow-sm hover:text-[#635BFF] hover:border-[#635BFF] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div
          ref={scrollContainerRef}
          className="flex w-full gap-3 md:gap-4 overflow-x-auto px-1 md:px-4 py-2 scrollbar-hide scroll-smooth"
        >
          {team.map((member) => {
            const isSelected = selectedMembers.includes(member.id);
            return (
              <button
                key={member.id}
                onClick={() => toggleMember(member.id)}
                className={`flex-shrink-0 flex flex-col items-center justify-center w-[100px] h-[120px] md:w-[120px] md:h-[140px] rounded-2xl border transition-all relative ${
                  isSelected
                    ? "border-[#635BFF] bg-[#EEEDFF] shadow-sm shadow-[#635BFF]/10"
                    : "border-gray-100 bg-white hover:border-[#635BFF]/50"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 w-4 h-4 bg-[#635BFF] rounded-full flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden mb-2 md:mb-3 bg-[#E0E7FF] flex items-center justify-center">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name.replace("\n", " ")}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <Users className="w-4 h-4 md:w-5 md:h-5 text-[#635BFF]" />
                  )}
                </div>
                <span
                  className={`text-xs md:text-sm font-bold font-manrope text-center whitespace-pre-line leading-tight ${
                    isSelected ? "text-[#635BFF]" : "text-[#1E293B]"
                  }`}
                >
                  {member.name}
                </span>
                {member.role && (
                  <span className="text-[9px] md:text-[10px] text-gray-400 font-manrope mt-1">
                    {member.role}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-0 z-10 -mr-4 w-8 h-8 rounded-full bg-white border border-gray-100 items-center justify-center text-gray-400 shadow-sm hover:text-[#635BFF] hover:border-[#635BFF] transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
