import React from "react";
import { Mail, X, Copy, Crown } from "lucide-react";

import Pagination from "../customComponent/Pagination";

export interface InvitationData {
  id: number;
  salonName: string;
  email: string;
  date: string;
  status: string;
  plan: string;
  planDetails: string;
  share: string;
  lastShare: string;
  avatarGradient: string;
}

interface InvitationsSentTableProps {
  invitations: InvitationData[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage?: number;
  onPageChange: (page: number) => void;
}

export default function InvitationsSentTable({
  invitations,
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage = 5,
  onPageChange,
}: InvitationsSentTableProps) {
  return (
    <div className="overflow-x-auto border border-slate-100 rounded-xl">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr className="bg-[#F8F9FA] border-b border-slate-100">
            <th className="px-6 py-4 text-sm font-semibold text-slate-700">
              Salon
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-slate-700">
              Invitation Date
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-slate-700">
              Status
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-slate-700">
              Plan
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-slate-700">
              Your Share (30%)
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-slate-700 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {invitations.map((inv, index) => (
            <tr
              key={inv.id}
              className={`border-b border-slate-50 hover:bg-slate-50/50 transition-colors ${
                index === invitations.length - 1 ? "border-none" : ""
              }`}
            >
              {/* Salon */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl shrink-0 bg-gradient-to-tr ${inv.avatarGradient} flex items-center justify-center text-white font-bold text-sm shadow-sm opacity-90`}
                  />
                  <div>
                    <h3 className="text-sm font-semibold text-slate-800">
                      {inv.salonName}
                    </h3>
                    <p className="text-xs text-slate-500">{inv.email}</p>
                  </div>
                </div>
              </td>

              {/* Date */}
              <td className="px-6 py-4 text-sm text-slate-600">{inv.date}</td>

              {/* Status */}
              <td className="px-6 py-4">
                {inv.status === "Accepted" && (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#E8F8EE] text-[#36C76C]">
                    Accepted
                  </span>
                )}
                {inv.status === "Pending" && (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#FFF7E3] text-[#FFB020]">
                    Pending
                  </span>
                )}
                {inv.status === "Rejected" && (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#FFEBEB] text-[#FF3B30]">
                    Rejected
                  </span>
                )}
              </td>

              {/* Plan */}
              <td className="px-6 py-4">
                {inv.plan === "Premium" && (
                  <div>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#E6F7F6] text-[#0D9488] mb-1">
                      Premium
                    </span>
                    <p className="text-[11px] text-slate-500">
                      {inv.planDetails}
                    </p>
                  </div>
                )}
                {inv.plan === "Enterprise" && (
                  <div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#635BFF] text-white mb-1">
                      <Crown size={12} /> Enterprise
                    </span>
                    <p className="text-[11px] text-slate-500">
                      {inv.planDetails}
                    </p>
                  </div>
                )}
                {inv.plan === "-" && (
                  <span className="text-sm text-slate-400">-</span>
                )}
              </td>

              {/* Your Share */}
              <td className="px-6 py-4">
                {inv.share !== "-" ? (
                  <div>
                    <p className="text-sm font-semibold text-[#36C76C]">
                      {inv.share}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {inv.lastShare}
                    </p>
                  </div>
                ) : (
                  <span className="text-sm text-slate-400">-</span>
                )}
              </td>

              {/* Actions */}
              <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-2">
                  <button className="w-8 h-8 rounded-lg bg-[#F4F4FD] text-[#635BFF] hover:bg-[#635BFF] hover:text-white flex items-center justify-center transition-colors">
                    <Mail size={14} />
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-[#FFEBEB] text-[#FF3B30] hover:bg-[#FF3B30] hover:text-white flex items-center justify-center transition-colors">
                    <X size={14} />
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition-colors">
                    <Copy size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        itemsName="invitations"
        onPageChange={onPageChange}
      />
    </div>
  );
}
