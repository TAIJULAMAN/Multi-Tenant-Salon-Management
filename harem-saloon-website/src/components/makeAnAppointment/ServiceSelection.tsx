import { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import ServiceCategorySlider from "@/components/service/ServiceCategorySlider";
import { categories, services } from "@/components/service/scheduleData";

interface ServiceSelectionProps {
  selectedServices: number[];
  setSelectedServices: (services: number[] | ((prev: number[]) => number[])) => void;
}

export default function ServiceSelection({ selectedServices, setSelectedServices }: ServiceSelectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("Featured");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = services.filter((service) => {
    const matchesCategory = selectedCategory === "Featured" || service.category === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (service.description ? service.description.toLowerCase().includes(searchQuery.toLowerCase()) : false);
    return matchesCategory && matchesSearch;
  });

  const toggleService = (id: number) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(sId => sId !== id) : [...prev, id]
    );
  };

  return (
    <div className="mb-10">
      <h3 className="text-lg font-bold text-[#1E293B] font-manrope mb-4">Services</h3>
      
      <ServiceCategorySlider
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#635BFF] font-manrope text-sm shadow-sm bg-white"
        />
      </div>

      <div className="space-y-4">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => {
            const isSelected = selectedServices.includes(service.id);
            return (
            <div
              key={service.id}
              onClick={() => toggleService(service.id)}
              className={`border rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 transition-all cursor-pointer ${
                isSelected
                  ? "border-[#635BFF] bg-[#EEEDFF] shadow-sm shadow-[#635BFF]/10"
                  : "border-gray-100 bg-white hover:border-[#635BFF]/50"
              }`}
            >
              <div className="flex items-start sm:items-center gap-3 md:gap-4">
                <div
                  className={`w-5 h-5 rounded border flex flex-shrink-0 items-center justify-center transition-colors mt-1 sm:mt-0 ${
                    isSelected ? "bg-[#635BFF] border-[#635BFF]" : "border-gray-300"
                  }`}
                >
                  {isSelected && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                
                <div className="w-12 h-12 flex-shrink-0 bg-[#F1F5F9] rounded-xl flex items-center justify-center overflow-hidden">
                  <Image src={service.image} alt={service.name} width={48} height={48} className="object-cover w-full h-full" />
                </div>
                
                <div>
                  <h4 className={`font-bold font-manrope text-sm md:text-base text-[#1E293B]`}>{service.name}</h4>
                  <p className="text-xs text-[#64748B] font-manrope mt-1">
                    {service.duration} {service.description && `• ${service.description}`}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto pl-[92px] sm:pl-0 mt-1 sm:mt-0">
                <div className="flex items-center gap-3">
                  <p className="text-lg md:text-xl font-bold text-[#635BFF] font-manrope">€ {service.price}</p>
                  <p className="text-[10px] bg-[#ECFDFD] text-[#16CDC7] px-2 py-1 rounded-full font-bold whitespace-nowrap">
                    {service.discount}
                  </p>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-[#64748B] font-manrope text-center py-8">No services found.</p>
      )}
      </div>
    </div>
  );
}
