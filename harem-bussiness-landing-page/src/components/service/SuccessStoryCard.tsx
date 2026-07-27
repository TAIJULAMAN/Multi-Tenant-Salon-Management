"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const SUCCESS_STORIES = [
  {
    id: 1,
    name: "Maria Rodriguez",
    role: "Customer for two years",
    content: "The booking process is so seamless. I can schedule my hair appointments while on my lunch break, and the reminders ensure I never miss a slot. It's truly transformed how I manage my self-care.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Regular Client",
    content: "I love being able to see all the available stylists and their work before booking. The interface is beautiful and so easy to use. Harem has made my salon visits much more organized.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop",
    rating: 5,
  },
  {
    id: 3,
    name: "Emma Wilson",
    role: "New Customer",
    content: "As someone who is always busy, the instant confirmation and digital receipts are a lifesaver. The salon experience starts the moment I open the app. Highly recommended!",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop",
    rating: 5,
  },
  {
    id: 4,
    name: "Jessica Taylor",
    role: "Loyal Member",
    content: "The loyalty program integrated into the booking system is fantastic. I can track my points and redeem them for services easily. It makes me feel valued as a customer.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=100&auto=format&fit=crop",
    rating: 5,
  },
  {
    id: 5,
    name: "Olivia Brown",
    role: "VIP Client",
    content: "Best salon management tool I've ever interacted with as a client. Everything is transparent, from pricing to stylist availability. It's clear they care about the customer experience.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
    rating: 5,
  },
];

export default function SuccessStoryCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentStory = SUCCESS_STORIES[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SUCCESS_STORIES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + SUCCESS_STORIES.length) % SUCCESS_STORIES.length);
  };

  return (
    <section className="mb-16 bg-[#F8FAFC] rounded-3xl p-8 md:p-12 relative overflow-hidden">
      <Quote className="absolute top-8 right-8 w-12 h-12 text-[#635BFF]/10" />
      <h2 className="text-xl font-bold text-[#1E293B] font-manrope mb-8">Success stories from real clients</h2>
      
      <div className="max-w-2xl transition-all duration-300 ease-in-out">
        <p className="text-[#64748B] font-manrope leading-relaxed mb-8 text-lg min-h-[100px]">
          "{currentStory.content}"
        </p>
        
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
            <Image 
              src={currentStory.image} 
              alt={currentStory.name} 
              width={48} 
              height={48} 
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h4 className="font-bold text-[#1E293B] font-manrope">{currentStory.name}</h4>
            <p className="text-xs text-[#64748B] font-manrope">{currentStory.role}</p>
          </div>
          <div className="ml-auto flex gap-1">
            {[...Array(currentStory.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#635BFF] text-[#635BFF]" />
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-8 pt-8 border-t border-gray-100">
        <button 
          onClick={handlePrev}
          className="p-2 rounded-full border border-gray-200 text-[#1E293B] hover:bg-white hover:shadow-md transition-all active:scale-95"
          aria-label="Previous story"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-sm font-manrope font-medium text-[#64748B]">
          <span className="text-[#1E293B] font-bold">{currentIndex + 1}</span> / {SUCCESS_STORIES.length}
        </span>
        <button 
          onClick={handleNext}
          className="p-2 rounded-full border border-gray-200 text-[#1E293B] hover:bg-white hover:shadow-md transition-all active:scale-95"
          aria-label="Next story"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}

