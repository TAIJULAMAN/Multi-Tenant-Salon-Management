"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, MoreVertical, Edit2, Download, MinusCircle, FileText, Calendar, CalendarX } from "lucide-react";
import Pagination from "@/components/common/Pagination";
import { mockContracts, metricData, Contract } from "./data";
import TerminateContractModal from "./TerminateContractModal";
import SuccessModal from "../employee-notices/SuccessModal";

export default function ContractsOverview() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [terminatingContract, setTerminatingContract] = useState<Contract | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const totalPages = Math.ceil(mockContracts.length / itemsPerPage);
  const paginatedData = mockContracts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const handleClickOutside = () => setActiveDropdown(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const getTypeBadgeStyles = (type: string) => {
    switch (type) {
      case "Full Time":
        return "border border-[#22c55e] text-[#22c55e]";
      case "Part Time":
        return "border border-[#8b5cf6] text-[#8b5cf6]";
      case "Vat collaboration":
        return "border border-[#facc15] text-[#facc15]";
      case "Stage":
        return "border border-[#f43f5e] text-[#f43f5e]";
      default:
        return "border border-slate-200 text-slate-500";
    }
  };

  const getStatusBadgeStyles = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-[#22c55e] text-white";
      case "Inactive":
        return "bg-[#f43f5e] text-white";
      case "Pending":
        return "bg-[#facc15] text-white";
      default:
        return "bg-slate-200 text-slate-700";
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-100 px-6 py-5 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-slate-800 tracking-tight">
          Employee Notices
        </h1>
        <Link
          href="/documents/contracts/new"
          className="flex items-center gap-2 bg-[#6366f1] hover:bg-[#4f46e5] text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-colors shadow-sm cursor-pointer"
        >
          <Plus size={16} strokeWidth={3} />
          <span>New Contract</span>
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Active Contracts */}
        <div className="bg-[#ecfdf5] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#22c55e] text-white rounded-xl flex items-center justify-center">
              <FileText size={20} />
            </div>
            <span className="text-[13px] font-bold text-slate-700">Active Contracts</span>
          </div>
          <div className="text-[32px] font-bold text-slate-800">{metricData.activeContracts}</div>
        </div>

        {/* Expiring Soon */}
        <div className="bg-[#fffbf0] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#facc15] text-white rounded-xl flex items-center justify-center">
              <Calendar size={20} />
            </div>
            <span className="text-[13px] font-bold text-slate-700">Expiring Soon</span>
          </div>
          <div className="text-[32px] font-bold text-slate-800">{metricData.expiringSoon}</div>
        </div>

        {/* Expired */}
        <div className="bg-[#fff1f2] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#f43f5e] text-white rounded-xl flex items-center justify-center">
              <CalendarX size={20} />
            </div>
            <span className="text-[13px] font-bold text-slate-700">Expired</span>
          </div>
          <div className="text-[32px] font-bold text-slate-800">{metricData.expired}</div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-100 overflow-hidden">
        <div className="overflow-x-auto min-h-[380px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-slate-100">
                <th className="px-6 py-5 text-xs font-bold text-slate-700 whitespace-nowrap">Employee</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-700 whitespace-nowrap">Salon</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-700 whitespace-nowrap">Type</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-700 whitespace-nowrap">Start Date</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-700 whitespace-nowrap">End Date</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-700 whitespace-nowrap">Status</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-700 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedData.map((contract) => (
                <tr key={contract.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={contract.employee.avatar} alt="avatar" className="w-10 h-10 rounded-xl object-cover bg-slate-100 shadow-sm" />
                      <div className="text-sm font-bold text-slate-700">{contract.employee.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={contract.salon.logo} alt="salon" className="w-8 h-8 rounded-lg object-cover shadow-sm" />
                      <div className="text-sm font-medium text-slate-500">{contract.salon.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-bold ${getTypeBadgeStyles(contract.type)}`}>
                      {contract.type}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-slate-600">
                    {contract.startDate}
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-slate-600">
                    {contract.endDate}
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-bold ${getStatusBadgeStyles(contract.status)}`}>
                      {contract.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 relative" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === contract.id ? null : contract.id)}
                      className="p-1 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors cursor-pointer"
                    >
                      <MoreVertical size={20} />
                    </button>

                    {activeDropdown === contract.id && (
                      <div className="absolute right-6 top-10 w-36 bg-white border border-slate-100 rounded-xl shadow-xl z-20 py-2 animate-in fade-in zoom-in-95 duration-100">
                        <button className="w-full text-left px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-3 transition-colors cursor-pointer">
                          <Edit2 size={12} className="text-[#8b5cf6]" /> Modify
                        </button>
                        <button className="w-full text-left px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-3 transition-colors cursor-pointer">
                          <Download size={12} className="text-[#20c997]" /> Download
                        </button>
                        <button 
                          onClick={() => {
                            setActiveDropdown(null);
                            setTerminatingContract(contract);
                          }}
                          className="w-full text-left px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-3 transition-colors cursor-pointer"
                        >
                          <MinusCircle size={12} className="text-[#f43f5e]" /> Terminate
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div className="px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end">
           <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={mockContracts.length}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      <TerminateContractModal 
        isOpen={!!terminatingContract}
        onClose={() => setTerminatingContract(null)}
        onConfirm={() => setIsSuccessModalOpen(true)}
      />
      
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Success!"
        message="Contract terminated successfully."
      />
    </div>
  );
}
