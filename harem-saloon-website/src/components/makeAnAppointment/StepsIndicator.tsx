import { FileText, CheckCircle, DollarSign, CalendarCheck, Users } from "lucide-react";

interface StepsIndicatorProps {
  currentStep: number;
  isGroup?: boolean;
  onStepClick?: (step: number) => void;
}

export default function StepsIndicator({ currentStep, isGroup, onStepClick }: StepsIndicatorProps) {
  const steps = [
    { id: 1, label: "Appointment Details", icon: CalendarCheck },
    ...(isGroup ? [{ id: 2, label: "Add Participants", icon: Users }] : []),
    { id: isGroup ? 3 : 2, label: "Review Appointment", icon: FileText },
    { id: isGroup ? 4 : 3, label: "Confirm", icon: CheckCircle },
    { id: isGroup ? 5 : 4, label: "Payment", icon: DollarSign },
  ];

  return (
    <div className="flex items-center gap-6 overflow-x-auto pb-4 scrollbar-hide">
      {steps.map((step) => {
        const Icon = step.icon;
        const isActive = step.id === currentStep;
        return (
          <div
            key={step.id}
            onClick={() => {
              if (step.id < currentStep && onStepClick) {
                onStepClick(step.id);
              }
            }}
            className={`flex items-center gap-2 whitespace-nowrap rounded-2xl px-5 py-3 transition-colors ${
              step.id < currentStep && onStepClick ? "cursor-pointer" : ""
            } ${
              isActive
                ? "bg-[#EEEDFF] text-[#635BFF]"
                : "text-[#64748B] hover:bg-gray-50"
            }`}
          >
            <div
              className={`flex items-center justify-center w-6 h-6 rounded-full ${
                isActive ? "bg-[#635BFF] text-white" : "bg-gray-100 text-gray-400"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
            </div>
            <span
              className={`font-manrope text-sm font-semibold ${
                isActive ? "text-[#635BFF]" : "text-[#64748B]"
              }`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
