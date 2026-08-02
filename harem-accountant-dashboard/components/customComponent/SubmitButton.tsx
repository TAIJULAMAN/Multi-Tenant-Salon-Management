"use client";

import React from "react";

interface SubmitButtonProps {
  children?: React.ReactNode;
  disabled?: boolean;
}

export default function SubmitButton({
  children = "Submit",
  disabled,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="rounded-lg bg-brand px-6 py-2 text-sm font-semibold text-white shadow-sm cursor-pointer hover:bg-brand-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}
