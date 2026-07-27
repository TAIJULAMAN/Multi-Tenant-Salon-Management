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
}

export default function ServiceItemCard({ service }: { service: Service }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center justify-between hover:shadow-md transition-shadow group cursor-pointer">
      <div className="flex items-center gap-5">
        <div className="w-14 h-14 bg-[#F1F5F9] rounded-xl flex items-center justify-center overflow-hidden">
          <Image src={service.image} alt={service.name} width={56} height={56} className="object-cover" />
        </div>
        <div>
          <h4 className="font-bold text-[#1E293B] font-manrope">{service.name}</h4>
          <p className="text-xs text-[#64748B] font-manrope mt-1">
            {service.duration} {service.description && `• ${service.description}`}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-5 text-right">
          <p className="text-xl font-bold text-[#635BFF] font-manrope">€ {service.price}</p>
          <p className="ml-3 text-[10px] bg-[#ECFDFD] text-[#16CDC7] px-2 py-1 rounded-full font-bold">
            {service.discount}
          </p>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#635BFF] transition-colors" />
      </div>
    </div>
  );
}
