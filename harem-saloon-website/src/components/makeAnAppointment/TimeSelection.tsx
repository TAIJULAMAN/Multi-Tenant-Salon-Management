import { useState } from "react";

const times = [
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
];

export default function TimeSelection() {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  return (
    <div className="mb-10">
      <h3 className="text-lg font-bold text-[#1E293B] font-manrope mb-4">
        Select a Time
      </h3>

      <div className="space-y-3">
        {times.map((time) => {
          const isSelected = time === selectedTime;
          return (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`w-full text-left px-5 py-4 rounded-xl border transition-all ${isSelected
                  ? "border-[#635BFF] bg-[#EEEDFF] shadow-sm shadow-[#635BFF]/10 text-[#635BFF]"
                  : "border-gray-100 bg-white hover:border-[#635BFF]/50 text-[#1E293B]"
                }`}
            >
              <span className="font-manrope font-semibold text-sm">{time}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
