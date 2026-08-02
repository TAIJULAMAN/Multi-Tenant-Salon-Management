"use client";

import React, { useState } from "react";
import InvitationsSentTable from "./InvitationsSentTable";
import { mockInvitations } from "./data";
import CustomSelect from "../customComponent/CustomSelect";
import CustomSearch from "../customComponent/CustomSearch";

type StatusType = "All" | "Pending" | "Accepted" | "Rejected" | "Expired";

export default function InvitationsSentTab() {
  const [activeStatus, setActiveStatus] = useState<StatusType>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const statuses: StatusType[] = [
    "All",
    "Pending",
    "Accepted",
    "Rejected",
    "Expired",
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 animate-in fade-in duration-300">
      <h2 className="text-lg font-bold text-slate-800 mb-6">
        Invitations Sent
      </h2>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="w-full sm:w-48">
          <CustomSelect
            label="STATUS"
            value={activeStatus}
            options={statuses as string[]}
            onChange={(val) => setActiveStatus(val as StatusType)}
          />
        </div>

        <div className="w-full sm:w-72 mt-4 sm:mt-0 self-end">
          <CustomSearch
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search"
          />
        </div>
      </div>

      <InvitationsSentTable
        invitations={mockInvitations}
        currentPage={1}
        totalPages={2}
        totalItems={8}
        itemsPerPage={5}
        onPageChange={() => {}}
      />
    </div>
  );
}
