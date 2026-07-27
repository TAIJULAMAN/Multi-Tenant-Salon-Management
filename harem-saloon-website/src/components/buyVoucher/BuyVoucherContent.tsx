"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Ticket,
  User,
  CheckCircle,
  DollarSign,
} from "lucide-react";
import PaymentSelection from "../payment/PaymentSelection";
import SelectVoucherStep, { Voucher } from "./SelectVoucherStep";
import SelectRecipientStep from "./SelectRecipientStep";
import ConfirmAppointmentStep from "./ConfirmAppointmentStep";
import VoucherSidebar from "./VoucherSidebar";
import SuccessModal from "../payment/SuccessModal";
import Breadcrumbs from "@/components/common/Breadcrumbs";

export default function BuyVoucherContent() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedVoucherId, setSelectedVoucherId] = useState<number | null>(1);
  const [quantity, setQuantity] = useState(1);
  const [recipientType, setRecipientType] = useState<string | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const steps = [
    { id: 1, label: "Select a Voucher", icon: Ticket },
    { id: 2, label: "Select a Recipient", icon: User },
    { id: 3, label: "Confirm", icon: CheckCircle },
    { id: 4, label: "Payment", icon: DollarSign },
  ];

  const vouchers: Voucher[] = [
    {
      id: 1,
      image: "/boucher/boucher1.png",
      name: "Name",
      validity: "Valid for 6 months",
      price: 99,
      originalPrice: 249,
      discountText: "Save up to 10%",
    },
    {
      id: 2,
      image: "/boucher/boucher2.png",
      name: "Name",
      validity: "Valid for 6 months",
      price: 199,
      originalPrice: null,
      discountText: "Save up to 10%",
    },
  ];

  const selectedVoucher = vouchers.find((v) => v.id === selectedVoucherId);
  const total = selectedVoucher ? selectedVoucher.price * quantity : 0;

  const handleNextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handleBackStep = () => {
    if (currentStep > 1) {
      if (currentStep === 2 && recipientType) {
        setRecipientType(null);
      } else {
        setCurrentStep(currentStep - 1);
      }
    }
  };

  const getStep2Title = () => {
    if (!recipientType) return "Select a Recipient";
    if (recipientType === "for_me") return "A gift for me";
    if (recipientType === "print") return "Print as a gift";
    return "Send by email as a gift";
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 relative">
      <Breadcrumbs title="Buy a Voucher" />

      <header className="mb-10 mt-6">
        <h1 className="text-4xl font-bold text-[#1E293B] font-manrope mb-3">
          Buy a Voucher
        </h1>
        <p className="text-[#64748B] font-manrope text-sm">
          Your next beauty moment is just one click away.
        </p>
      </header>

      <div className="mb-12 flex items-center gap-6 overflow-x-auto pb-4 scrollbar-hide">
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = step.id === currentStep;
          return (
            <div
              key={step.id}
              onClick={() => {
                if (step.id < currentStep) {
                  setCurrentStep(step.id);
                }
              }}
              className={`flex items-center gap-2 whitespace-nowrap rounded-2xl px-5 py-3 transition-colors ${step.id < currentStep ? "cursor-pointer" : ""
                } ${isActive
                  ? "bg-[#EEEDFF] text-[#635BFF]"
                  : "text-[#64748B] hover:bg-gray-50"
                }`}
            >
              <div
                className={`flex items-center justify-center w-6 h-6 rounded-full ${isActive
                    ? "bg-[#635BFF] text-white"
                    : "bg-gray-100 text-gray-400"
                  }`}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>
              <span
                className={`font-manrope text-sm font-semibold ${isActive ? "text-[#635BFF]" : "text-[#64748B]"
                  }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Main Content - Left Side */}
        <div
          className={
            currentStep >= 3 ? "lg:col-span-12 max-w-4xl" : "lg:col-span-8"
          }
        >
          {currentStep === 1 && (
            <SelectVoucherStep
              vouchers={vouchers}
              selectedVoucherId={selectedVoucherId}
              setSelectedVoucherId={setSelectedVoucherId}
              quantity={quantity}
              setQuantity={setQuantity}
            />
          )}

          {currentStep === 2 && (
            <SelectRecipientStep
              recipientType={recipientType}
              setRecipientType={setRecipientType}
              getStep2Title={getStep2Title}
            />
          )}

          {currentStep === 3 && (
            <ConfirmAppointmentStep
              handleBackStep={handleBackStep}
              handleNextStep={handleNextStep}
            />
          )}

          {currentStep === 4 && (
            <div className="max-w-4xl">
              <PaymentSelection
                onBack={handleBackStep}
                onComplete={() => setIsSuccessModalOpen(true)}
              />
            </div>
          )}
        </div>

        {/* Sidebar - Right Side */}
        {currentStep < 3 && (
          <VoucherSidebar
            selectedVoucher={selectedVoucher}
            quantity={quantity}
            total={total}
            handleNextStep={handleNextStep}
          />
        )}
      </div>

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        onSendEmail={() => { }}
        onPrintReceipt={() => { }}
      />
    </div>
  );
}
