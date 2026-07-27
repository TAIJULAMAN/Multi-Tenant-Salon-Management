import React from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendEmail: () => void;
  onPrintReceipt: () => void;
}

export default function SuccessModal({ isOpen, onClose, onSendEmail, onPrintReceipt }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl flex flex-col p-8 relative animate-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-50"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Illustration Area */}
        <div className="relative w-full aspect-square max-w-[240px] mx-auto mb-6">
          <Image 
            src="/success.png" 
            alt="Appointment successfully scheduled"
            fill
            className="object-contain"
          />
        </div>

        {/* Text */}
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold text-[#1E293B] font-manrope mb-2">Success!</h3>
          <p className="text-[#64748B] font-manrope text-sm">Appointment successfully scheduled.</p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4">
          <button 
            onClick={onSendEmail}
            className="px-6 py-2.5 rounded-xl bg-[#EEEDFF] text-[#635BFF] font-bold font-manrope text-sm hover:bg-[#E0E7FF] transition-colors"
          >
            Send by Email
          </button>
          <button 
            onClick={onPrintReceipt}
            className="px-6 py-2.5 rounded-xl bg-[#635BFF] text-white font-bold font-manrope text-sm hover:bg-[#534dfd] transition-all shadow-lg shadow-[#635BFF]/20"
          >
            Print Receipt
          </button>
        </div>

      </div>
    </div>
  );
}
