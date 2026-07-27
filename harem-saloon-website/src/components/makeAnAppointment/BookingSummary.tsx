import { Star, MapPin } from "lucide-react";
import { services } from "@/components/service/scheduleData";

interface BookingSummaryProps {
  onContinue?: () => void;
  isGroup?: boolean;
  selectedServices?: number[];
  participants?: { id: number, name: string, canDelete: boolean }[];
}

export default function BookingSummary({ onContinue, isGroup, selectedServices = [], participants = [] }: BookingSummaryProps) {
  const selectedServicesData = services.filter(s => selectedServices.includes(s.id));
  const subtotal = selectedServicesData.reduce((acc, curr) => acc + curr.price, 0);
  
  const multiplier = isGroup ? Math.max(1, participants.length) : 1;
  const groupSubtotal = subtotal * multiplier;

  // Just a simple calculation to show some discount logic if there's a price, else 0
  const discount = groupSubtotal > 0 ? (isGroup ? 99 * multiplier : 99) : 0; 
  const total = Math.max(0, groupSubtotal - discount);

  return (
    <div className="bg-[#F1F2FE] rounded-3xl p-6 lg:p-8">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-[22px] font-bold text-[#1E293B] font-manrope">Salon Name</h3>
        <div className="flex items-center gap-1.5 pt-1">
          <Star className="w-4 h-4 fill-[#FBBF24] text-[#FBBF24]" />
          <span className="text-[13px] text-gray-500 font-manrope">4.8 (78)</span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-gray-500 mb-6 font-manrope text-[13px]">
        <MapPin className="w-4 h-4" />
        <span>Full Address</span>
      </div>

      {isGroup ? (
        <>
          {participants.map((participant) => (
            <div key={participant.id}>
              <div className="font-bold text-[#1E293B] font-manrope text-[13px] mb-3">{participant.name}</div>
              <div className="bg-white rounded-[20px] p-5 mb-4 shadow-sm">
                <div className="grid grid-cols-12 mb-3 pb-3 border-b border-gray-100 text-[13px] font-medium text-[#1E293B] font-manrope">
                  <div className="col-span-6">Service</div>
                  <div className="col-span-3 text-center">Price</div>
                  <div className="col-span-3 text-right">Duration</div>
                </div>

                {selectedServicesData.length > 0 ? selectedServicesData.map(service => (
                  <div key={service.id} className="grid grid-cols-12 items-center mb-2 last:mb-0">
                    <div className="col-span-6">
                      <p className="font-semibold text-[#1E293B] font-manrope text-[13px]">{service.name}</p>
                    </div>
                    <div className="col-span-3 text-center">
                      <p className="font-manrope text-[13px] text-gray-500">€ {service.price}</p>
                    </div>
                    <div className="col-span-3 text-right">
                      <p className="font-manrope text-[13px] text-gray-500">{service.duration}</p>
                    </div>
                  </div>
                )) : (
                  <p className="text-sm text-gray-400 font-manrope text-center py-2">No services selected.</p>
                )}
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="bg-white rounded-[20px] p-5 mb-6 shadow-sm">
          <div className="grid grid-cols-12 mb-3 pb-3 border-b border-gray-100 text-[13px] font-medium text-[#1E293B] font-manrope">
            <div className="col-span-6">Service</div>
            <div className="col-span-3 text-center">Price</div>
            <div className="col-span-3 text-right">Duration</div>
          </div>

          {selectedServicesData.length > 0 ? selectedServicesData.map(service => (
            <div key={service.id} className="grid grid-cols-12 items-center mb-2 last:mb-0">
              <div className="col-span-6">
                <p className="font-semibold text-[#1E293B] font-manrope text-[13px]">{service.name}</p>
              </div>
              <div className="col-span-3 text-center">
                <p className="font-manrope text-[13px] text-gray-500">€ {service.price}</p>
              </div>
              <div className="col-span-3 text-right">
                <p className="font-manrope text-[13px] text-gray-500">{service.duration}</p>
              </div>
            </div>
          )) : (
            <p className="text-sm text-gray-400 font-manrope text-center py-2">No services selected.</p>
          )}
        </div>
      )}

      <div className="bg-white rounded-[20px] p-6 mb-6 shadow-sm">
        <h4 className="font-bold text-[#1E293B] font-manrope text-[17px] mb-5">Order Summary</h4>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center text-[13px] font-manrope">
            <span className="text-gray-500">Tax</span>
            <span className="text-[#1E293B]">0</span>
          </div>
          <div className="flex justify-between items-center text-[13px] font-manrope">
            <span className="text-gray-500">Discount</span>
            <span className="font-medium text-[#10B981]">€ {discount}</span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className="font-bold text-[#1E293B] font-manrope text-base">Total</span>
          <span className="font-bold text-[#1E293B] font-manrope text-[22px]">€ {total}</span>
        </div>
      </div>

      <button
        onClick={onContinue}
        className="w-full bg-[#635BFF] text-white py-4 rounded-xl font-semibold font-manrope text-[15px] hover:bg-[#534dfd] transition-all"
      >
        Continue
      </button>
    </div>
  );
}
