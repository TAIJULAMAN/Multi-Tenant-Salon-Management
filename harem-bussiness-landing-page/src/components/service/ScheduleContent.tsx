"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import ServiceCategorySlider from "./ServiceCategorySlider";
import ServiceItemCard from "./ServiceItemCard";
import TeamMemberGrid from "./TeamMemberGrid";
import SuccessStoryCard from "./SuccessStoryCard";
import ScheduleSidebarSection from "./ScheduleSidebarSection";
import ScheduleHighlightItem from "./ScheduleHighlightItem";
import Breadcrumbs from "../common/Breadcrumbs";
import { categories, services, team, highlights } from "./scheduleData";


export default function ScheduleContent() {
  const [selectedCategory, setSelectedCategory] = useState("Featured");

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Breadcrumbs title="Schedule Service" />

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-8">
          <header className="mb-12">
            <h1 className="text-4xl font-bold text-[#1E293B] font-manrope mb-4">Make An Appointment</h1>
            <p className="text-[#64748B] font-manrope">Your next beauty moment is just one click away.</p>
          </header>

          {/* Services Section */}
          <section className="mb-16">
            <h2 className="text-xl font-bold text-[#1E293B] font-manrope mb-6">Services</h2>

            <ServiceCategorySlider
              categories={categories}
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />

            {/* Search */}
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#635BFF] font-manrope text-sm shadow-sm bg-gray-50/50"
              />
            </div>

            {/* Service Cards */}
            <div className="space-y-4">
              {services.map((service) => (
                <ServiceItemCard key={service.id} service={service} />
              ))}
            </div>
          </section>

          <TeamMemberGrid team={team} />

          <SuccessStoryCard />

          {/* Highlights */}
          <section className="mt-20">
            <h2 className="text-2xl font-bold text-[#1E293B] font-manrope mb-10">Highlights</h2>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
              {highlights.map((item) => (
                <ScheduleHighlightItem
                  key={item.title}
                  icon={item.icon}
                  title={item.title}
                  desc={item.desc}
                />
              ))}
            </div>
          </section>
        </div>

        <ScheduleSidebarSection />
      </div>
    </div>
  );
}
