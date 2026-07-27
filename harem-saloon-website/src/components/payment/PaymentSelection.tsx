import React, { useState } from "react";
import Image from "next/image";
import { Store, DollarSign, CreditCard, Building2 } from "lucide-react";

interface PaymentSelectionProps {
  onBack?: () => void;
  onComplete?: () => void;
}

export default function PaymentSelection({
  onBack,
  onComplete,
}: PaymentSelectionProps) {
  const [selectedMethod, setSelectedMethod] = useState<
    "salon" | "online" | null
  >(null);
  const [selectedOnlineMethod, setSelectedOnlineMethod] = useState<
    string | null
  >("card");

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mb-4">
        <h3 className="text-sm font-bold text-[#1E293B] font-manrope mb-6">
          Payment
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pay in Salon */}
          <div
            onClick={() => setSelectedMethod("salon")}
            className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${
              selectedMethod === "salon"
                ? "border-[#635BFF] bg-[#F8F9FD]"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-[#EEEDFF] flex items-center justify-center shrink-0">
              <Store className="w-5 h-5 text-[#635BFF]" />
            </div>
            <span className="font-manrope font-semibold text-sm text-[#1E293B]">
              Pay in Salon
            </span>
          </div>

          {/* Pay now */}
          <div
            onClick={() => setSelectedMethod("online")}
            className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${
              selectedMethod === "online"
                ? "border-[#635BFF] bg-[#F8F9FD]"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#EEEDFF] flex items-center justify-center shrink-0">
                <DollarSign className="w-5 h-5 text-[#635BFF]" />
              </div>
              <span className="font-manrope font-semibold text-sm text-[#1E293B]">
                Pay now
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5 opacity-80">
                {/* Visa */}
                <div className="h-5 w-8 bg-white border border-gray-200 rounded flex items-center justify-center">
                  <span className="text-[8px] font-bold text-[#1A1F71]">
                    VISA
                  </span>
                </div>
                {/* Mastercard */}
                <div className="h-5 w-8 bg-white border border-gray-200 rounded flex items-center justify-center relative overflow-hidden">
                  <div className="w-3 h-3 rounded-full bg-[#EB001B] absolute -left-0.5"></div>
                  <div className="w-3 h-3 rounded-full bg-[#F79E1B] absolute -right-0.5 mix-blend-multiply"></div>
                </div>
                {/* Google Pay */}
                <div className="h-5 w-8 bg-white border border-gray-200 rounded flex items-center justify-center">
                  <span className="text-[7px] font-bold text-gray-700">
                    G Pay
                  </span>
                </div>
                {/* Apple Pay */}
                <div className="h-5 w-8 bg-white border border-gray-200 rounded flex items-center justify-center">
                  <span className="text-[7px] font-bold text-gray-700">
                    Pay
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedMethod === "online" && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm animate-in fade-in zoom-in-95 duration-300 mb-8">
          <h3 className="text-sm font-bold text-[#1E293B] font-manrope mb-6">
            Payment Methods
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Card */}
            <div
              onClick={() => setSelectedOnlineMethod("card")}
              className={`flex flex-col items-center justify-center gap-3 p-6 rounded-xl border cursor-pointer transition-all ${
                selectedOnlineMethod === "card"
                  ? "border-[#635BFF] bg-white shadow-sm ring-1 ring-[#635BFF]"
                  : "border-gray-100 hover:border-gray-200"
              }`}
            >
              <CreditCard className={`w-8 h-8 ${selectedOnlineMethod === "card" ? "text-[#635BFF]" : "text-[#635BFF]"}`} />
              <span className="font-manrope font-semibold text-[13px] text-[#1E293B]">
                Card
              </span>
            </div>

            {/* Apple Pay */}
            <div
              onClick={() => setSelectedOnlineMethod("apple")}
              className={`flex flex-col items-center justify-center gap-3 p-6 rounded-xl border cursor-pointer transition-all ${
                selectedOnlineMethod === "apple"
                  ? "border-[#635BFF] bg-white shadow-sm ring-1 ring-[#635BFF]"
                  : "border-gray-100 hover:border-gray-200"
              }`}
            >
              <svg className={`w-8 h-8 ${selectedOnlineMethod === "apple" ? "text-black" : "text-black"}`} viewBox="0 0 384 512" fill="currentColor">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
              </svg>
              <span className="font-manrope font-semibold text-[13px] text-[#1E293B]">
                Apple Pay
              </span>
            </div>

            {/* Google Pay */}
            <div
              onClick={() => setSelectedOnlineMethod("google")}
              className={`flex flex-col items-center justify-center gap-3 p-6 rounded-xl border cursor-pointer transition-all ${
                selectedOnlineMethod === "google"
                  ? "border-[#635BFF] bg-white shadow-sm ring-1 ring-[#635BFF]"
                  : "border-gray-100 hover:border-gray-200"
              }`}
            >
              <svg className="w-8 h-8" viewBox="0 0 488 512">
                <path fill="#4285F4" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
                <path fill="#34A853" d="M248 504c76.5 0 141.1-25.4 188.2-68.8l-72.2-56.1C338.2 402.6 298.1 416 248 416c-85 0-157-57.4-182.6-134.5L1.8 333.1C47.2 423.2 140.2 504 248 504z"/>
                <path fill="#FBBC05" d="M65.4 281.5C61.4 266.3 59 250.4 59 234s2.4-32.3 6.4-47.5L1.8 134.9C-4 153.4-7 173.3-7 194s3 40.6 8.8 59.1l63.6-49.3z"/>
                <path fill="#EA4335" d="M248 88c41.6 0 78.9 14.3 108.3 42.4l81.2-81.2C389 9.3 324.5-12 248-12 140.2-12 47.2 68.8 1.8 158.9l63.6 49.3C91 131 163 73.4 248 73.4z"/>
              </svg>
              <span className="font-manrope font-semibold text-[13px] text-[#1E293B]">
                Google Pay
              </span>
            </div>

            {/* Transfer */}
            <div
              onClick={() => setSelectedOnlineMethod("transfer")}
              className={`flex flex-col items-center justify-center gap-3 p-6 rounded-xl border cursor-pointer transition-all ${
                selectedOnlineMethod === "transfer"
                  ? "border-[#635BFF] bg-white shadow-sm ring-1 ring-[#635BFF]"
                  : "border-gray-100 hover:border-gray-200"
              }`}
            >
              <Building2 className={`w-8 h-8 ${selectedOnlineMethod === "transfer" ? "text-[#635BFF]" : "text-[#635BFF]"}`} />
              <span className="font-manrope font-semibold text-[13px] text-[#1E293B]">
                Transfer
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-8 mt-8 border-t border-gray-100">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-xl bg-gray-50 text-[#1E293B] font-bold font-manrope text-sm hover:bg-gray-100 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onComplete}
          disabled={!selectedMethod || (selectedMethod === "online" && !selectedOnlineMethod)}
          className={`px-8 py-3 rounded-xl font-bold font-manrope text-sm transition-all ${
            selectedMethod && (selectedMethod !== "online" || selectedOnlineMethod)
              ? "bg-[#635BFF] text-white hover:bg-[#534dfd] shadow-xl shadow-[#635BFF]/30"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Complete Booking
        </button>
      </div>
    </div>
  );
}
