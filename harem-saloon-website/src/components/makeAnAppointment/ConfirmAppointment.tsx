import React from "react";

interface ConfirmAppointmentProps {
  onBack: () => void;
  onConfirm: () => void;
}

export default function ConfirmAppointment({
  onBack,
  onConfirm,
}: ConfirmAppointmentProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-xl font-bold text-[#1E293B] font-manrope">
        Confirm Appointment
      </h3>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h4 className="font-bold text-[#1E293B] font-manrope text-sm mb-6">
          Enter your phone number to confirm appointment
        </h4>

        <div className="max-w-md">
          <label className="block text-xs font-bold text-[#1E293B] font-manrope mb-2">
            Phone number *
          </label>
          <input
            type="text"
            className="w-full rounded-lg border border-gray-200 px-4 py-3 font-manrope text-sm text-[#1E293B] focus:outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition-colors"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-4">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-xl bg-gray-50 text-[#1E293B] font-bold font-manrope text-sm hover:bg-gray-100 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onConfirm}
          className="px-8 py-3 rounded-xl bg-[#635BFF] text-white font-bold font-manrope text-sm hover:bg-[#534dfd] transition-all shadow-xl shadow-[#635BFF]/30"
        >
          Confirm Appointment
        </button>
      </div>
    </div>
  );
}
