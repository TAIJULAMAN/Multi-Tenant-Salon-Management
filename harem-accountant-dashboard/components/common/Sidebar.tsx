"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  HandCoins,
  ShieldCheck,
  FileText,
  Wallet,
  Store,
  ChevronDown,
  ChevronRight,
  X,
  LineChart,
  Upload,
  Clipboard,
  History,
} from "lucide-react";
import Image from "next/image";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [clickedItem, setClickedItem] = useState<string | null>(null);
  const [prevPath, setPrevPath] = useState(pathname);

  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setClickedItem(null);
  }

  const activeItem =
    clickedItem ||
    (pathname === "/salaries/overview"
      ? "Salaries-Overview"
      : pathname === "/salaries/history"
        ? "Salaries-History"
        : pathname === "/salaries/upload"
          ? "Salaries-Upload"
          : pathname === "/salaries/pending"
            ? "Salaries-Pending"
            : pathname === "/taxes/overview"
              ? "Taxes-Overview"
              : pathname === "/taxes/history"
                ? "Taxes-History"
                : pathname === "/taxes/new-upload"
                  ? "Taxes-Upload"
                  : pathname === "/taxes/pending"
                    ? "Taxes-Pending"
                    : pathname === "/notifications"
                      ? "Notifications"
                      : "");

  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    Salaries: true,
    "Taxes & Compliance": true,
    Documents: false,
    "Budgeting & Finances": false,
    "Salons & Invitations": false,
  });

  const toggleExpand = (name: string) => {
    setExpandedItems((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, hasDropdown: false },
    {
      name: "Salaries",
      icon: HandCoins,
      hasDropdown: true,
      basePrefix: "Salaries",
      subItems: [
        { name: "Overview", icon: LineChart, path: "/salaries/overview", id: "Salaries-Overview" },
        { name: "New Upload", icon: Upload, path: "/salaries/upload", id: "Salaries-Upload" },
        { name: "Pending & Declined", icon: Clipboard, path: "/salaries/pending", id: "Salaries-Pending" },
        { name: "History", icon: History, path: "/salaries/history", id: "Salaries-History" },
      ]
    },
    {
      name: "Taxes & Compliance",
      icon: ShieldCheck,
      hasDropdown: true,
      basePrefix: "Taxes",
      subItems: [
        { name: "Overview", icon: LineChart, path: "/taxes/overview", id: "Taxes-Overview" },
        { name: "New Upload", icon: Upload, path: "/taxes/new-upload", id: "Taxes-Upload" },
        { name: "Pending & Declined", icon: Clipboard, path: "/taxes/pending", id: "Taxes-Pending" },
        { name: "History", icon: History, path: "/taxes/history", id: "Taxes-History" },
      ]
    },
    { name: "Documents", icon: FileText, hasDropdown: true },
    { name: "Budgeting & Finances", icon: Wallet, hasDropdown: true },
    { name: "Salons & Invitations", icon: Store, hasDropdown: true },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-100 bg-white px-6 py-6 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        {/* Header Logo */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Image
              src="/assets/icons/logo.svg"
              alt="Logo"
              width={140}
              height={40}
            />
          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-600 lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Categories */}
        <div className="flex-1 overflow-y-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Main
          </span>

          <nav className="mt-4 space-y-1">
            {navItems.map((item) => {
              const isActive = activeItem === item.name;
              const isExpanded = expandedItems[item.name];
              const Icon = item.icon;

              return (
                <div key={item.name} className="space-y-1">
                  {item.subItems ? (
                    <div
                      className={`${activeItem?.startsWith(item.basePrefix!) ? "bg-[#f5f6ff]/70" : ""} rounded-lg p-3 space-y-3 transition-colors`}
                    >
                      {/* Section Header */}
                      <button
                        onClick={() => toggleExpand(item.name)}
                        className={`flex w-full items-center justify-between text-sm font-medium px-1 cursor-pointer transition-colors ${activeItem?.startsWith(item.basePrefix!) || isExpanded
                          ? "text-brand"
                          : "text-slate-500 hover:text-slate-900"
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon
                            size={18}
                            className={
                              activeItem?.startsWith(item.basePrefix!) || isExpanded
                                ? "text-brand"
                                : "text-slate-400"
                            }
                          />
                          <span>{item.name}</span>
                        </div>
                        <ChevronDown
                          size={14}
                          className={`${activeItem?.startsWith(item.basePrefix!) || isExpanded ? "text-brand" : "text-slate-400"} transition-transform duration-200 ${isExpanded ? "" : "rotate-180"}`}
                        />
                      </button>

                      {/* Sub-items list */}
                      {isExpanded && (
                        <div className="space-y-2.5 animate-in fade-in slide-in-from-top-1 duration-150">
                          {item.subItems.map((subItem) => {
                            const SubIcon = subItem.icon;
                            const isSubActive = activeItem === subItem.id;

                            return (
                              <Link
                                key={subItem.id}
                                href={subItem.path}
                                onClick={() => {
                                  setClickedItem(subItem.id);
                                  if (window.innerWidth < 1024) onClose();
                                }}
                                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold transition-all cursor-pointer
                                  ${isSubActive
                                    ? "bg-brand text-white shadow-md shadow-brand/20"
                                    : "bg-brand/5 text-brand hover:bg-brand/10"
                                  }
                                `}
                              >
                                <SubIcon size={16} />
                                <span>{subItem.name}</span>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      {item.hasDropdown ? (
                        <button
                          onClick={() => toggleExpand(item.name)}
                          className={`
                            flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 cursor-pointer
                            ${isActive
                              ? "bg-brand text-white shadow-md shadow-brand/20"
                              : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                            }
                          `}
                        >
                          <div className="flex items-center gap-3">
                            <Icon
                              size={18}
                              className={
                                isActive
                                  ? "text-white"
                                  : "text-slate-400 group-hover:text-slate-600"
                              }
                            />
                            <span>{item.name}</span>
                          </div>
                          {isExpanded ? (
                            <ChevronDown size={14} />
                          ) : (
                            <ChevronRight size={14} />
                          )}
                        </button>
                      ) : (
                        <Link
                          href={
                            item.name === "Dashboard"
                              ? "/"
                              : `/${item.name.toLowerCase()}`
                          }
                          onClick={() => {
                            if (window.innerWidth < 1024) {
                              onClose();
                            }
                          }}
                          className={`
                            flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 cursor-pointer
                            ${isActive
                              ? "bg-brand text-white shadow-md shadow-brand/20"
                              : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                            }
                          `}
                        >
                          <Icon
                            size={18}
                            className={
                              isActive ? "text-white" : "text-slate-400"
                            }
                          />
                          <span>{item.name}</span>
                        </Link>
                      )}

                      {/* Default Submenu Mock for other categories */}
                      {item.hasDropdown && isExpanded && (
                        <div className="pl-11 pr-2 py-1 space-y-1 border-l border-slate-100 ml-6 mt-1">
                          <button
                            onClick={() => {
                              if (window.innerWidth < 1024) onClose();
                            }}
                            className="block w-full text-left rounded-xl py-1.5 px-3 text-xs font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
                          >
                            Overview
                          </button>
                          <button className="block w-full text-left rounded-xl py-1.5 px-3 text-xs font-medium text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer">
                            History
                          </button>
                          <button className="block w-full text-left rounded-xl py-1.5 px-3 text-xs font-medium text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer">
                            Reports
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
