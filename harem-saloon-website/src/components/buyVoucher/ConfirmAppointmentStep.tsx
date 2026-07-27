import { Ticket } from "lucide-react";

interface ConfirmAppointmentStepProps {
  handleBackStep: () => void;
  handleNextStep: () => void;
}

export default function ConfirmAppointmentStep({
  handleBackStep,
  handleNextStep,
}: ConfirmAppointmentStepProps) {
  return (
    <div className="max-w-4xl">
      <div className="bg-[#F8FAFC] p-4 rounded-[24px] flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#EEEDFF] flex items-center justify-center text-[#635BFF]">
            <Ticket className="w-5 h-5" />
          </div>
          <span className="font-bold text-[#1E293B] font-manrope text-[15px]">
            Gift Card
          </span>
        </div>
        <button className="bg-[#EEEDFF] text-[#635BFF] px-6 py-2.5 rounded-xl text-xs font-bold font-manrope hover:bg-[#e4e7ff] transition-colors">
          Print Voucher
        </button>
      </div>

      <h3 className="text-[22px] font-bold text-[#1E293B] font-manrope mb-6">
        Confirm Appointment
      </h3>

      <div className="border border-gray-100 rounded-[24px] p-6 shadow-sm mb-8 bg-white">
        <h4 className="font-bold text-[#1E293B] font-manrope text-[15px] mb-8">
          Enter your phone number to confirm appointment
        </h4>
        <div className="max-w-lg mb-8">
          <label className="block text-xs font-bold text-[#1E293B] font-manrope mb-2">
            Phone Number *
          </label>
          <input
            type="text"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF]"
          />
        </div>
      </div>

      <div className="flex items-center justify-between mt-8 pt-8">
        <button
          onClick={handleBackStep}
          className="bg-[#F8FAFC] text-[#64748B] px-8 py-3 rounded-xl font-bold font-manrope text-sm hover:bg-gray-100 transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleNextStep}
          className="bg-[#635BFF] text-white px-8 py-3 rounded-xl font-bold font-manrope text-sm hover:bg-[#534dfd] transition-all shadow-xl shadow-[#635BFF]/30"
        >
          Confirm Appointment
        </button>
      </div>
    </div>
  );
}
