import Image from "next/image";
import { Minus, Plus } from "lucide-react";

export interface Voucher {
  id: number;
  image: string;
  name: string;
  validity: string;
  price: number;
  originalPrice: number | null;
  discountText: string;
}

interface SelectVoucherStepProps {
  vouchers: Voucher[];
  selectedVoucherId: number | null;
  setSelectedVoucherId: (id: number) => void;
  quantity: number;
  setQuantity: (q: number) => void;
}

export default function SelectVoucherStep({
  vouchers,
  selectedVoucherId,
  setSelectedVoucherId,
  quantity,
  setQuantity,
}: SelectVoucherStepProps) {
  return (
    <>
      <h3 className="text-xl font-bold text-[#1E293B] font-manrope mb-6">
        Select a Voucher
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        {vouchers.map((voucher) => {
          const isSelected = selectedVoucherId === voucher.id;
          return (
            <div
              key={voucher.id}
              onClick={() => {
                setSelectedVoucherId(voucher.id);
                if (!isSelected) setQuantity(1);
              }}
              className={`border rounded-[24px] p-6 cursor-pointer transition-all ${
                isSelected
                  ? "border-[#635BFF] bg-white shadow-lg shadow-[#635BFF]/10"
                  : "border-gray-100 bg-white hover:border-gray-200"
              }`}
            >
              <div className="w-full aspect-[1.6] relative rounded-2xl overflow-hidden mb-6">
                <Image
                  src={voucher.image}
                  alt={voucher.name}
                  fill
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-[#1E293B] font-manrope text-base mb-1">
                    {voucher.name}
                  </h4>
                  <p className="text-[#64748B] text-sm font-manrope">
                    {voucher.validity}
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-[#635BFF] text-xl font-manrope mb-2">
                    € {voucher.price}
                  </div>
                  <div className="bg-[#EEEDFF] text-[#635BFF] text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    {voucher.discountText}
                  </div>
                </div>
              </div>

              {isSelected && (
                <div className="mt-6 flex items-center justify-center gap-6">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (quantity > 1) setQuantity(quantity - 1);
                    }}
                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-bold text-[#1E293B] font-manrope text-lg min-w-[20px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setQuantity(quantity + 1);
                    }}
                    className="w-8 h-8 rounded-full bg-[#635BFF] flex items-center justify-center text-white hover:bg-[#534dfd] transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
