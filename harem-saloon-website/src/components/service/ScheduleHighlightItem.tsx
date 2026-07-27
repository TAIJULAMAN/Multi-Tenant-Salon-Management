"use client";

import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export default function ScheduleHighlightItem({ icon: Icon, title, desc }: Props) {
  return (
    <div className="flex flex-col">
      <div className="w-12 h-12 bg-[#F5F3FF] rounded-xl flex items-center justify-center text-[#635BFF] mb-6">
        <Icon className="w-6 h-6" strokeWidth={1.5} />
      </div>
      <h4 className="text-xl font-bold text-[#1E293B] font-manrope mb-3">{title}</h4>
      <p className="text-[#64748B] font-manrope leading-relaxed">{desc}</p>
    </div>
  );
}

