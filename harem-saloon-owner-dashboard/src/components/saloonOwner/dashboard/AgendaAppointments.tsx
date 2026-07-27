"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Edit2 } from "lucide-react";

export default function AgendaAppointments() {
  const [expandedId, setExpandedId] = useState<number | null>(1);

  const appointments = [
    {
      id: 1,
      name: "Maria Rodriguez",
      phone: "+39 345 678 9123",
      avatar: "https://i.pravatar.cc/100?img=1",
      time: "12:00 AM - 12:15 AM",
      status: "Booked",
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      phone: "+39 345 678 9123",
      avatar: "https://i.pravatar.cc/100?img=5",
      time: "12:00 AM - 12:15 AM",
      status: "Booked",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg border border-[#E2E8F0] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.02)] h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 mb-6">
        <h2 className="text-[16px] font-bold text-[#1E293B]">Agenda - Appointments</h2>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-1.5 border border-[#E2E8F0] rounded-lg text-[12px] font-semibold text-[#1E293B] hover:bg-[#F8FAFC] transition-colors">
            Sep 16, 2025 <ChevronDown className="w-3 h-3 text-[#64748B]" />
          </button>
          <button className="flex-1 sm:flex-none px-4 py-1.5 border border-[#635BFF] text-[#635BFF] rounded-lg text-[12px] font-bold hover:bg-[#EEF2FF] transition-colors text-center">
            View All
          </button>
        </div>
      </div>

      {/* List Container */}
      <div className="border border-[#E2E8F0] rounded-lg overflow-hidden flex-1 flex flex-col">
        {/* Table Header */}
        <div className="hidden md:grid bg-[#F8FAFC] grid-cols-3 px-6 py-4 border-b border-[#E2E8F0]">
          <div className="text-[12px] font-bold text-[#64748B]">Client</div>
          <div className="text-[12px] font-bold text-[#64748B]">Time</div>
          <div className="text-[12px] font-bold text-[#64748B]">Status</div>
        </div>

        {/* List Body */}
        <div className="flex-1 overflow-y-auto">
          {appointments.map((apt) => {
            const isExpanded = expandedId === apt.id;
            return (
              <div key={apt.id} className="border-b border-[#E2E8F0] last:border-b-0 p-6">

                {/* Main Row */}
                <div className="flex flex-col md:grid md:grid-cols-3 items-start md:items-center gap-4">
                  {/* Client */}
                  <div className="flex items-center gap-3 w-full">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#E2E8F0] shrink-0">
                      <img src={apt.avatar} alt={apt.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[13px] font-bold text-[#1E293B]">{apt.name}</div>
                      <div className="text-[11px] font-medium text-[#94A3B8]">{apt.phone}</div>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="text-[12px] font-semibold text-[#64748B] w-full">
                    <span className="md:hidden font-bold mr-2">Time:</span>
                    {apt.time}
                  </div>

                  {/* Status & Actions */}
                  <div className="flex items-center justify-between w-full md:w-auto">
                    <span className="bg-[#E0E7FF] text-[#635BFF] px-3 py-1 rounded-lg text-[11px] font-bold">
                      {apt.status}
                    </span>
                    <div className="flex items-center gap-2">
                      <button className="w-8 h-8 rounded bg-[#F1F5F9] flex items-center justify-center text-[#64748B] hover:text-[#635BFF] transition-colors">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : apt.id)}
                        className="w-8 h-8 rounded bg-[#F1F5F9] flex items-center justify-center text-[#64748B] hover:text-[#635BFF] transition-colors"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-[#635BFF]" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Timeline */}
                {isExpanded && (
                  <div className="mt-6 pt-6 border-t border-[#F1F5F9] flex flex-col items-center">
                    <h4 className="text-[13px] font-bold text-[#1E293B] mb-6">Booking Order</h4>

                    <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
                      <div className="flex items-start justify-center gap-4 w-full min-w-[300px] max-w-[400px] relative mx-auto">
                        {/* Connecting Line */}
                        <div className="absolute top-[14px] left-[15%] right-[15%] h-[2px] bg-[#E2E8F0] -z-10"></div>

                        {/* Step 1 */}
                        <div className="flex-1 flex flex-col items-center relative z-0">
                          <div className="w-7 h-7 rounded-full bg-white border-[2px] border-[#FBBF24] text-[#FBBF24] font-bold text-[12px] flex items-center justify-center mb-2">1</div>
                          <div className="bg-[#FEF3C7] text-[#F59E0B] px-3 py-0.5 rounded-full text-[10px] font-bold mb-2">Overdue</div>
                          <div className="text-[10px] font-semibold text-[#94A3B8]">12:00 - 12:05</div>
                          <div className="text-[12px] font-bold text-[#1E293B]">Shampoo</div>
                          <div className="text-[11px] font-medium text-[#94A3B8]">Angelica</div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex-1 flex flex-col items-center relative z-0">
                          <div className="w-7 h-7 rounded-full bg-[#F1F5F9] text-[#64748B] font-bold text-[12px] flex items-center justify-center mb-2">2</div>
                          <div className="bg-[#F1F5F9] text-[#64748B] px-3 py-0.5 rounded-full text-[10px] font-bold mb-2">To Do</div>
                          <div className="text-[10px] font-semibold text-[#94A3B8]">12:30 - 12:45</div>
                          <div className="text-[12px] font-bold text-[#1E293B]">Shampoo</div>
                          <div className="text-[11px] font-medium text-[#94A3B8]">Angelica</div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex-1 flex flex-col items-center relative z-0">
                          <div className="w-7 h-7 rounded-full bg-[#F1F5F9] text-[#64748B] font-bold text-[12px] flex items-center justify-center mb-2">3</div>
                          <div className="bg-[#F1F5F9] text-[#64748B] px-3 py-0.5 rounded-full text-[10px] font-bold mb-2">To Do</div>
                          <div className="text-[10px] font-semibold text-[#94A3B8]">13:00 - 13:15</div>
                          <div className="text-[12px] font-bold text-[#1E293B]">Shampoo</div>
                          <div className="text-[11px] font-medium text-[#94A3B8]">Angelica</div>
                        </div>
                      </div>
                    </div>

                    <button className="mt-8 bg-[#E0E7FF] text-[#635BFF] px-6 py-2 rounded-lg text-[12px] font-bold hover:bg-[#EEF2FF] transition-colors">
                      Print Receipt
                    </button>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
