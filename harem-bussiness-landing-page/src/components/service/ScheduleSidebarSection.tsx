"use client";

import { useState } from "react";
import {
  Star,
  MapPin,
  Clock,
  CreditCard,
  Wallet,
  Smartphone,
  Gift,
  User,
  Users,
  Ticket,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function ScheduleSidebarSection() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("only_me");

  const handleContinue = () => {
    if (selectedOption === "only_me") {
      router.push("/makeAnAppointment");
    } else if (selectedOption === "group") {
      router.push("/makeAnAppointment?type=group");
    } else if (selectedOption === "voucher") {
      router.push("/buyVoucher");
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <aside className="lg:col-span-4">
        <div className="bg-[#F1F2FE] rounded-3xl p-8 border border-gray-100 sticky top-32 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-[#1E293B] font-manrope">
              Salon Name
            </h3>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-bold text-[#1E293B] font-manrope">
                4.8
              </span>
              <span className="text-sm text-gray-400 font-manrope">(73)</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-gray-500 mb-8 font-manrope text-sm">
            <MapPin className="w-4 h-4" />
            <span>Full Address</span>
          </div>

          <div className="space-y-6 mb-10">
            <h4 className="font-bold text-[#1E293B] font-manrope text-sm uppercase tracking-wider">
              Schedules
            </h4>
            {[
              { day: "Monday", time: "9:00 AM - 3:00 PM" },
              { day: "Tuesday", time: "9:00 AM - 8:00 PM" },
              { day: "Wednesday", time: "9:00 AM - 8:00 PM" },
              { day: "Thursday", time: "9:00 AM - 8:00 PM" },
              { day: "Friday", time: "9:00 AM - 8:00 PM" },
              { day: "Saturday", time: "9:00 AM - 8:00 PM" },
            ].map((schedule) => (
              <div
                key={schedule.day}
                className="flex items-center gap-3 text-sm font-manrope group"
              >
                <div className="w-6 h-6 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-[#635BFF] transition-colors">
                  <Clock className="w-3 h-3" />
                </div>
                <span className="text-gray-400 w-24">{schedule.day}</span>
                <span className="text-[#1E293B] font-medium">
                  {schedule.time}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-6 mb-10">
            <h4 className="font-bold text-[#1E293B] font-manrope text-sm uppercase tracking-wider">
              Payment Methods
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Smartphone, label: "Card Terminal" },
                { icon: Wallet, label: "Cash" },
                { icon: CreditCard, label: "Online Payment" },
                { icon: Gift, label: "Gift Card" },
              ].map((method) => (
                <div
                  key={method.label}
                  className="flex items-center gap-3 text-xs font-manrope bg-white p-3 rounded-xl border border-gray-50"
                >
                  <div className="p-1.5 bg-[#F1F5F9] rounded-lg text-[#635BFF]">
                    <method.icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-gray-600 font-semibold">
                    {method.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-[#635BFF] text-white py-4 rounded-xl font-bold font-manrope text-sm hover:bg-[#534dfd] transition-all shadow-xl shadow-[#635BFF]/30"
            >
              Schedule Now
            </button>
          </div>
        </div>
      </aside>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-[500px] rounded-[24px] p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[18px] font-bold text-[#1E293B] font-manrope">
                Choose an Option
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {/* Option 1: Only Me */}
              <div
                onClick={() => setSelectedOption("only_me")}
                className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all border ${
                  selectedOption === "only_me"
                    ? "border-[#635BFF] bg-[#F8F9FE]"
                    : "border-transparent bg-[#F8FAFC] hover:border-gray-200"
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-[#Eef0ff] flex items-center justify-center text-[#635BFF] shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1E293B] font-manrope text-sm">
                    Book an Appointment
                  </h4>
                  <p className="text-gray-500 text-[13px] font-manrope mt-0.5">
                    Only Me
                  </p>
                </div>
              </div>

              {/* Option 2: Group */}
              <div
                onClick={() => setSelectedOption("group")}
                className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all border ${
                  selectedOption === "group"
                    ? "border-[#635BFF] bg-[#F8F9FE]"
                    : "border-transparent bg-[#F8FAFC] hover:border-gray-200"
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-[#Eef0ff] flex items-center justify-center text-[#635BFF] shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1E293B] font-manrope text-sm">
                    Group appointment
                  </h4>
                  <p className="text-gray-500 text-[13px] font-manrope mt-0.5">
                    For me and others
                  </p>
                </div>
              </div>

              {/* Option 3: Voucher */}
              <div
                onClick={() => setSelectedOption("voucher")}
                className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all border ${
                  selectedOption === "voucher"
                    ? "border-[#635BFF] bg-[#F8F9FE]"
                    : "border-transparent bg-[#F8FAFC] hover:border-gray-200"
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-[#Eef0ff] flex items-center justify-center text-[#635BFF] shrink-0">
                  <Ticket className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1E293B] font-manrope text-sm">
                    Buy a Voucher
                  </h4>
                  <p className="text-gray-500 text-[13px] font-manrope mt-0.5">
                    For me or my friends
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={handleContinue}
                className="bg-[#635BFF] text-white px-8 py-3 rounded-xl font-bold font-manrope text-sm hover:bg-[#534dfd] transition-all"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
