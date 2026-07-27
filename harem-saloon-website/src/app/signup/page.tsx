"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SignupStep0 from "@/components/auth/SignupStep0";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    businessName: "",
    businessType: "",
    goals: [] as string[],
    businessDisplayName: "",
    brandColor: "#7C3AED",
    tagline: "",
    phone: "",
    contactEmail: "",
    subdomain: "",
  });

  const nextStep = () => {
    router.push("/login");
  };

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <main className="min-h-screen bg-white">
      <SignupStep0
        onNext={nextStep}
        updateData={updateFormData}
        data={formData}
      />
    </main>
  );
}
