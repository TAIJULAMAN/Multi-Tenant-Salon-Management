"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import StepsIndicator from "./StepsIndicator";
import DateSelection from "./DateSelection";
import TimeSelection from "./TimeSelection";
import ServiceSelection from "./ServiceSelection";
import TeamMemberSelection from "./TeamMemberSelection";
import BookingSummary from "./BookingSummary";
import ConfirmAppointment from "./ConfirmAppointment";
import ReviewAppointment from "./ReviewAppointment";
import PaymentSelection from "../payment/PaymentSelection";
import SuccessModal from "../payment/SuccessModal";
import AddParticipants from "./AddParticipants";

export default function BookingContent() {
  const searchParams = useSearchParams();
  const isGroup = searchParams.get("type") === "group";
  const [currentStep, setCurrentStep] = useState(1);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<number[]>([1]);
  const [participants, setParticipants] = useState([
    { id: 1, name: "Me", canDelete: false },
    { id: 2, name: "Participant 2", canDelete: true },
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 relative">
      <Breadcrumbs title="Schedule Service" />

      <header className="mb-8 md:mb-10 mt-4 md:mt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-[#1E293B] font-manrope mb-2 md:mb-3">
          Make An Appointment
        </h1>
        <p className="text-[#64748B] font-manrope text-sm">
          Your next beauty moment is just one click away.
        </p>
      </header>

      <div className="mb-12">
        <StepsIndicator currentStep={currentStep} isGroup={isGroup} onStepClick={setCurrentStep} />
      </div>

      {currentStep === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-8">
            <DateSelection />
            <TimeSelection />
            <ServiceSelection selectedServices={selectedServices} setSelectedServices={setSelectedServices} />
            <TeamMemberSelection />
          </div>

          {/* Sidebar - Right Side */}
          <div className="lg:col-span-4 sticky top-6 self-start">
            <BookingSummary onContinue={() => setCurrentStep(2)} isGroup={isGroup} selectedServices={selectedServices} participants={participants} />
          </div>
        </div>
      )}

      {isGroup && currentStep === 2 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-8">
            <AddParticipants
              onBack={() => setCurrentStep(1)}
              onContinue={() => setCurrentStep(3)}
              participants={participants}
              setParticipants={setParticipants}
            />
          </div>
          <div className="lg:col-span-4 sticky top-6 self-start">
            <BookingSummary onContinue={() => setCurrentStep(3)} isGroup={isGroup} selectedServices={selectedServices} participants={participants} />
          </div>
        </div>
      )}

      {currentStep === (isGroup ? 3 : 2) && (
        <ReviewAppointment
          onBack={() => setCurrentStep(isGroup ? 2 : 1)}
          onContinue={() => setCurrentStep(isGroup ? 4 : 3)}
          selectedServices={selectedServices}
          setSelectedServices={setSelectedServices}
          isGroup={isGroup}
          participants={participants}
        />
      )}

      {currentStep === (isGroup ? 4 : 3) && (
        <ConfirmAppointment
          onBack={() => setCurrentStep(isGroup ? 3 : 2)}
          onConfirm={() => setCurrentStep(isGroup ? 5 : 4)}
        />
      )}

      {currentStep === (isGroup ? 5 : 4) && (
        <PaymentSelection
          onBack={() => setCurrentStep(isGroup ? 4 : 3)}
          onComplete={() => setIsSuccessModalOpen(true)}
        />
      )}

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        onSendEmail={() => alert("Email sent!")}
        onPrintReceipt={() => alert("Printing receipt...")}
      />
    </div>
  );
}
