import { Star, MapPin } from "lucide-react";
import { Voucher } from "./SelectVoucherStep";

interface VoucherSidebarProps {
  selectedVoucher?: Voucher;
  quantity: number;
  total: number;
  handleNextStep: () => void;
}

export default function VoucherSidebar({
  selectedVoucher,
  quantity,
  total,
  handleNextStep,
}: VoucherSidebarProps) {
  return (
    <div className="lg:col-span-4">
      <div className="bg-[#F8F9FE] rounded-[24px] p-8 border border-gray-100 sticky top-32">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-[#1E293B] font-manrope">
            Salon Name
          </h3>
          <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-50 text-yellow-400">
            <Star className="w-3.5 h-3.5 fill-yellow-400" />
            <span className="text-xs font-bold text-[#1E293B] font-manrope">
              4.8
            </span>
            <span className="text-xs text-gray-400 font-manrope">
              (78)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-gray-500 mb-8 font-manrope text-sm border-b border-gray-200 pb-8">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span>Full Address</span>
        </div>

        {selectedVoucher && (
          <>
            <div className="mb-8">
              <div className="grid grid-cols-12 gap-4 text-xs font-bold text-[#64748B] uppercase tracking-wider mb-4 px-2">
                <div className="col-span-6">Vouchers</div>
                <div className="col-span-3 text-center">Amount</div>
                <div className="col-span-3 text-right">Price</div>
              </div>

              <div className="grid grid-cols-12 gap-4 text-sm font-manrope items-center bg-white p-4 rounded-xl shadow-sm border border-gray-50">
                <div className="col-span-6 font-semibold text-[#1E293B]">
                  Gift Card
                </div>
                <div className="col-span-3 text-center text-gray-500">
                  {quantity}
                </div>
                <div className="col-span-3 text-right font-medium text-[#64748B]">
                  € {selectedVoucher.price}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-50 mb-8">
              <h4 className="font-bold text-[#1E293B] font-manrope text-sm mb-4">
                Order Summary
              </h4>
              <div className="space-y-3 font-manrope text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Tax</span>
                  <span>0</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Discount</span>
                  <span className="text-emerald-500 font-medium">
                    € 49
                  </span>
                </div>
                <div className="pt-3 mt-3 border-t border-gray-100 flex justify-between items-center">
                  <span className="font-bold text-[#1E293B]">Total</span>
                  <span className="font-bold text-[#1E293B] text-lg">
                    € {total}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}

        <button
          onClick={handleNextStep}
          className="w-full bg-[#635BFF] text-white py-4 rounded-xl font-bold font-manrope text-sm hover:bg-[#534dfd] transition-all shadow-xl shadow-[#635BFF]/30"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
