"use client";

import React, { useState } from "react";
import { List, LayoutGrid } from "lucide-react";
import ExpenseGrid from "./ExpenseGrid";
import ExpenseList from "./ExpenseList";
import ExpenseHeader from "./ExpenseHeader";
import ExpenseFilters from "./ExpenseFilters";
import ExpenseAttachmentView from "./ExpenseAttachmentView";
import AddExpenseModal from "./AddExpenseModal";
import BudgetExceededModal from "./BudgetExceededModal";
import AttachmentModal from "./AttachmentModal";
import ViewExpenseModal from "./ViewExpenseModal";
import {
  initialExpensesData,
  ExpenseTransaction,
  NewExpenseInput,
} from "./data";

import CustomSearch from "@/components/customComponent/CustomSearch";

export default function ExpenseManagement() {
  const [expenses, setExpenses] =
    useState<ExpenseTransaction[]>(initialExpensesData);
  const [viewType, setViewType] = useState<"list" | "grid">("list");

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSalon, setSelectedSalon] = useState("All Salons");
  const [selectedMacroCategory, setSelectedMacroCategory] =
    useState("All Categories");
  const [selectedCategory, setSelectedCategory] = useState("All Subcategories");
  const [selectedSupplier, setSelectedSupplier] = useState("All Suppliers");
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("All Methods");

  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isExceededOpen, setIsExceededOpen] = useState(false);
  const [isAttachOpen, setIsAttachOpen] = useState(false);
  const [activeTxId, setActiveTxId] = useState<string | null>(null);
  const [pendingExpense, setPendingExpense] = useState<NewExpenseInput | null>(
    null,
  );
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [activeViewTx, setActiveViewTx] = useState<ExpenseTransaction | null>(
    null,
  );
  const [viewingAttachmentTx, setViewingAttachmentTx] =
    useState<ExpenseTransaction | null>(null);

  // Filter Logic
  const filteredExpenses = expenses.filter((tx) => {
    // Search Query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const matchName = tx.salon.name.toLowerCase().includes(q);
      const matchSupplier = tx.supplier.toLowerCase().includes(q);
      const matchNote = (tx.note || "").toLowerCase().includes(q);
      const matchCat = tx.category.toLowerCase().includes(q);
      if (!matchName && !matchSupplier && !matchNote && !matchCat) {
        return false;
      }
    }

    // Salon Dropdown
    if (selectedSalon !== "All Salons" && tx.salon.name !== selectedSalon) {
      return false;
    }

    // Macro Category
    if (
      selectedMacroCategory !== "All Categories" &&
      tx.macroCategory !== selectedMacroCategory
    ) {
      return false;
    }

    // Category
    if (
      selectedCategory !== "All Subcategories" &&
      tx.category !== selectedCategory
    ) {
      return false;
    }

    // Supplier
    if (
      selectedSupplier !== "All Suppliers" &&
      tx.supplier !== selectedSupplier
    ) {
      return false;
    }

    // Payment Method
    if (
      selectedPaymentMethod !== "All Methods" &&
      tx.paymentMethod !== selectedPaymentMethod
    ) {
      return false;
    }

    // Date (Simple startsWith check since dates are formatted "02/01/2025...")
    if (
      selectedDate &&
      !tx.date.startsWith(selectedDate.split("-").reverse().join("/"))
    ) {
      // Input date is YYYY-MM-DD, transaction date is DD/MM/YYYY
      const parts = selectedDate.split("-"); // [YYYY, MM, DD]
      if (parts.length === 3) {
        const formattedDateInput = `${parts[2]}/${parts[1]}/${parts[0]}`;
        if (!tx.date.startsWith(formattedDateInput)) {
          return false;
        }
      }
    }

    return true;
  });

  // Action Operations
  const handleView = (id: string) => {
    const tx = expenses.find((e) => e.id === id);
    if (tx) {
      setActiveViewTx(tx);
      setIsViewOpen(true);
    }
  };

  const handleEdit = (id: string) => {
    const tx = expenses.find((e) => e.id === id);
    if (tx) {
      const newCost = prompt(
        `Edit cost for ${tx.salon.name} - ${tx.macroCategory}:`,
        tx.cost.toString(),
      );
      if (newCost !== null) {
        const costNum = parseFloat(newCost);
        if (!isNaN(costNum)) {
          setExpenses((prev) =>
            prev.map((e) => (e.id === id ? { ...e, cost: costNum } : e)),
          );
        }
      }
    }
  };

  const handleAttachOpen = (id: string) => {
    setActiveTxId(id);
    setIsAttachOpen(true);
  };

  const handleAttachSave = (fileName: string) => {
    if (activeTxId) {
      setExpenses((prev) =>
        prev.map((e) =>
          e.id === activeTxId
            ? { ...e, hasAttachment: true, attachmentName: fileName }
            : e,
        ),
      );
    }
    setIsAttachOpen(false);
    setActiveTxId(null);
  };

  const handleViewAttachment = (id: string) => {
    const tx = expenses.find((e) => e.id === id);
    if (tx && tx.attachmentName) {
      setViewingAttachmentTx(tx);
    }
  };

  const handleDownloadAttachment = (id: string) => {
    const tx = expenses.find((e) => e.id === id);
    if (tx && tx.attachmentName) {
      alert(
        `[Attachment Download Started]\n\nDownloaded file: ${tx.attachmentName}`,
      );
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this expense?")) {
      setExpenses((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const handleAddSave = (expenseData: NewExpenseInput) => {
    if (expenseData.cost > 5000) {
      setPendingExpense(expenseData);
      setIsAddOpen(false);
      setIsExceededOpen(true);
    } else {
      saveNewExpense(expenseData);
      setIsAddOpen(false);
    }
  };

  const saveNewExpense = (data: NewExpenseInput) => {
    const newTx: ExpenseTransaction = {
      id: `exp-${Date.now()}`,
      date: data.date,
      salon: {
        name: data.payee || "Glamour Beauty",
        avatar: "/avatar/avatar.png",
      },
      macroCategory: data.macroCategory as ExpenseTransaction["macroCategory"],
      category: data.category,
      cost: data.cost,
      supplier: data.location || "Supplier Name",
      paymentMethod: data.paymentMethod as ExpenseTransaction["paymentMethod"],
      note: data.note || "Added via form",
      hasAttachment: data.hasAttachment,
      attachmentName: data.attachmentName,
    };
    setExpenses((prev) => [newTx, ...prev]);
  };

  const handleConfirmExceeded = () => {
    if (pendingExpense) {
      saveNewExpense(pendingExpense);
      setPendingExpense(null);
    }
    setIsExceededOpen(false);
  };

  if (viewingAttachmentTx) {
    return (
      <ExpenseAttachmentView
        attachmentTx={viewingAttachmentTx}
        onClose={() => setViewingAttachmentTx(null)}
        onDownload={handleDownloadAttachment}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Card containing Header and Filters */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <ExpenseHeader onAddExpense={() => setIsAddOpen(true)} />

        <ExpenseFilters
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedSalon={selectedSalon}
          setSelectedSalon={setSelectedSalon}
          selectedMacroCategory={selectedMacroCategory}
          setSelectedMacroCategory={setSelectedMacroCategory}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedSupplier={selectedSupplier}
          setSelectedSupplier={setSelectedSupplier}
          selectedPaymentMethod={selectedPaymentMethod}
          setSelectedPaymentMethod={setSelectedPaymentMethod}
        />
      </div>

      {/* Row 3: Search Bar and List/Grid View toggles */}
      <div className="flex items-center justify-between gap-4 bg-white p-5 rounded-xl shadow-sm">
        {/* Search */}
        <CustomSearch
          value={searchQuery}
          onChange={setSearchQuery}
          className="w-full max-w-[280px]"
        />

        {/* Toggle buttons */}
        <div className="flex items-center border border-slate-200 bg-white rounded-xl p-0.5 shadow-sm">
          <button
            onClick={() => setViewType("list")}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center ${
              viewType === "list"
                ? "bg-[#f0f2ff] text-[#5c60f5]"
                : "text-slate-400 hover:text-slate-600"
            }`}
            title="List view"
          >
            <List size={16} />
          </button>
          <button
            onClick={() => setViewType("grid")}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center ${
              viewType === "grid"
                ? "bg-[#f0f2ff] text-[#5c60f5]"
                : "text-slate-400 hover:text-slate-600"
            }`}
            title="Card grid view"
          >
            <LayoutGrid size={16} />
          </button>
        </div>
      </div>

      {/* Main View Container */}
      <div className="w-full">
        {filteredExpenses.length > 0 ? (
          viewType === "list" ? (
            <ExpenseList
              expenses={filteredExpenses}
              onView={handleView}
              onEdit={handleEdit}
              onAttach={handleAttachOpen}
              onViewAttachment={handleViewAttachment}
              onDownloadAttachment={handleDownloadAttachment}
              onDelete={handleDelete}
            />
          ) : (
            <ExpenseGrid
              expenses={filteredExpenses}
              onView={handleView}
              onEdit={handleEdit}
              onAttach={handleAttachOpen}
              onViewAttachment={handleViewAttachment}
              onDownloadAttachment={handleDownloadAttachment}
              onDelete={handleDelete}
            />
          )
        ) : (
          <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center text-slate-400 text-xs font-bold shadow-sm">
            No matching expenses found for the selected filter parameters.
          </div>
        )}
      </div>

      {/* Modals mount point */}
      <AddExpenseModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSave={handleAddSave}
      />

      {isExceededOpen && pendingExpense && (
        <BudgetExceededModal
          isOpen={isExceededOpen}
          macroCategory={pendingExpense.macroCategory}
          amountExceeded={`€${(pendingExpense.cost - 5000).toLocaleString()}`}
          onClose={() => {
            setIsExceededOpen(false);
            setPendingExpense(null);
          }}
          onConfirm={handleConfirmExceeded}
        />
      )}

      {isAttachOpen && (
        <AttachmentModal
          isOpen={isAttachOpen}
          attachmentName={null}
          onClose={() => {
            setIsAttachOpen(false);
            setActiveTxId(null);
          }}
          onAttach={handleAttachSave}
        />
      )}

      <ViewExpenseModal
        isOpen={isViewOpen}
        expense={activeViewTx}
        onClose={() => {
          setIsViewOpen(false);
          setActiveViewTx(null);
        }}
        onViewAttachment={() => {
          if (activeViewTx) {
            handleViewAttachment(activeViewTx.id);
            setIsViewOpen(false);
            setActiveViewTx(null);
          }
        }}
        onDownloadAttachment={() => {
          if (activeViewTx) {
            handleDownloadAttachment(activeViewTx.id);
          }
        }}
      />
    </div>
  );
}
