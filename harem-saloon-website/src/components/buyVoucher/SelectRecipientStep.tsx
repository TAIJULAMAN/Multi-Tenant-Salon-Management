import { User, Printer, Mail } from "lucide-react";

interface SelectRecipientStepProps {
  recipientType: string | null;
  setRecipientType: (type: string | null) => void;
  getStep2Title: () => string;
}

export default function SelectRecipientStep({
  recipientType,
  setRecipientType,
  getStep2Title,
}: SelectRecipientStepProps) {
  return (
    <>
      <h3 className="text-xl font-bold text-[#1E293B] font-manrope mb-6">
        {getStep2Title()}
      </h3>
      {!recipientType ? (
        <div className="space-y-4">
          <div
            onClick={() => setRecipientType("for_me")}
            className="flex items-center gap-4 bg-[#F8FAFC] border border-transparent hover:border-gray-200 p-5 rounded-2xl cursor-pointer transition-all"
          >
            <div className="w-12 h-12 rounded-full bg-[#Eef0ff] flex items-center justify-center text-[#635BFF] shrink-0">
              <User className="w-5 h-5" />
            </div>
            <span className="font-bold text-[#1E293B] font-manrope text-[15px]">
              A gift for me
            </span>
          </div>
          <div
            onClick={() => setRecipientType("print")}
            className="flex items-center gap-4 bg-[#F8FAFC] border border-transparent hover:border-gray-200 p-5 rounded-2xl cursor-pointer transition-all"
          >
            <div className="w-12 h-12 rounded-full bg-[#Eef0ff] flex items-center justify-center text-[#635BFF] shrink-0">
              <Printer className="w-5 h-5" />
            </div>
            <span className="font-bold text-[#1E293B] font-manrope text-[15px]">
              Print as a gift
            </span>
          </div>
          <div
            onClick={() => setRecipientType("email")}
            className="flex items-center gap-4 bg-[#F8FAFC] border border-transparent hover:border-gray-200 p-5 rounded-2xl cursor-pointer transition-all"
          >
            <div className="w-12 h-12 rounded-full bg-[#Eef0ff] flex items-center justify-center text-[#635BFF] shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <span className="font-bold text-[#1E293B] font-manrope text-[15px]">
              Send by email as a gift
            </span>
          </div>
        </div>
      ) : (
        <div className="border border-gray-100 rounded-[24px] p-6 shadow-sm bg-white">
          <h4 className="font-bold text-[#1E293B] font-manrope text-[15px] mb-6">
            Recipient information
          </h4>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs font-bold text-[#1E293B] font-manrope mb-2">
                First Name *
              </label>
              <input
                type="text"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#1E293B] font-manrope mb-2">
                Last Name *
              </label>
              <input
                type="text"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF]"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-[#1E293B] font-manrope mb-2">
              Personalized message (optional)
            </label>
            <textarea
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm h-32 resize-none focus:outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF]"
              placeholder="Add a note"
            ></textarea>
          </div>
        </div>
      )}
    </>
  );
}
