"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";

interface Service {
  id: number;
  name: string;
  duration: string;
  description: string;
  price: number;
  discount: string;
  image: string;
  category?: string;
}

export default function ServiceItemCard({ service }: { service: Service }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 hover:shadow-md transition-shadow group cursor-pointer">
      <div className="flex items-start sm:items-center gap-4 md:gap-5">
        <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-[#F1F5F9] rounded-xl flex items-center justify-center overflow-hidden">
          <Image src={service.image} alt={service.name} width={56} height={56} className="object-cover w-full h-full" />
        </div>
        <div>
          <h4 className="font-bold text-[#1E293B] font-manrope text-sm md:text-base">{service.name}</h4>
          <p className="text-xs text-[#64748B] font-manrope mt-1 line-clamp-2 sm:line-clamp-none">
            {service.duration} {service.description && `• ${service.description}`}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto pl-16 sm:pl-0 mt-1 sm:mt-0">
        <div className="flex items-center gap-3">
          <p className="text-lg md:text-xl font-bold text-[#635BFF] font-manrope">€ {service.price}</p>
          <p className="text-[10px] bg-[#ECFDFD] text-[#16CDC7] px-2 py-1 rounded-full font-bold whitespace-nowrap">
            {service.discount}
          </p>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#635BFF] transition-colors ml-2" />
      </div>
    </div>
  );
}
