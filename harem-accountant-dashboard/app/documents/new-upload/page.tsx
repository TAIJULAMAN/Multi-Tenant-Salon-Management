"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, Home, X, Search, UploadCloud, ChevronDown, Trash2, FolderInput, MoreVertical, Grid, List, Download } from "lucide-react";
import Image from "next/image";

import SuccessModal from "@/components/documents/employee-notices/SuccessModal";
import UploadActions from "@/components/documents/new-upload/UploadActions";
import SuggestedFolders from "@/components/documents/new-upload/SuggestedFolders";
import SuggestedFiles from "@/components/documents/new-upload/SuggestedFiles";
import FileDropdown from "@/components/documents/new-upload/FileDropdown";

interface FolderItem {
  id: string;
  name: string;
  createdBy: string;
}

interface FileItem {
  id: string;
  name: string;
  type: string;
  createdBy: string;
}

export default function NewUploadPage() {
  // Folder State
  const [folders, setFolders] = useState<FolderItem[]>([
    { id: "f1", name: "Employees", createdBy: "Maria Rodriguez" },
    { id: "f2", name: "Accountant", createdBy: "Maria Rodriguez" },
    { id: "f3", name: "Name", createdBy: "Maria Rodriguez" },
    { id: "f4", name: "Name", createdBy: "Maria Rodriguez" },
  ]);

  // Path navigation array representing active folder hierarchy
  const [currentPath, setCurrentPath] = useState<FolderItem[]>([]);

  // Selected file ids for the file selection view page
  const [selectedFileIds, setSelectedFileIds] = useState<string[]>([]);

  // Subfolder Files state inside Salaries / Maria Rodriguez folder (9 items of August Salary)
  const [subfolderFiles, setSubfolderFiles] = useState<FileItem[]>([
    { id: "subfi1", name: "August Salary", type: "PDF", createdBy: "Maria Rodriguez" },
    { id: "subfi2", name: "August Salary", type: "PDF", createdBy: "Maria Rodriguez" },
    { id: "subfi3", name: "August Salary", type: "PDF", createdBy: "Maria Rodriguez" },
    { id: "subfi4", name: "August Salary", type: "PDF", createdBy: "Maria Rodriguez" },
    { id: "subfi5", name: "August Salary", type: "PDF", createdBy: "Maria Rodriguez" },
    { id: "subfi6", name: "August Salary", type: "PDF", createdBy: "Maria Rodriguez" },
    { id: "subfi7", name: "August Salary", type: "PDF", createdBy: "Maria Rodriguez" },
    { id: "subfi8", name: "August Salary", type: "PDF", createdBy: "Maria Rodriguez" },
    { id: "subfi9", name: "August Salary", type: "PDF", createdBy: "Maria Rodriguez" },
  ]);

  // Folder suggestions inside an employee folder (e.g. Maria Rodriguez)
  const [mariaRodriguezFolders, setMariaRodriguezFolders] = useState<FolderItem[]>([
    { id: "mr-1", name: "Salaries", createdBy: "Maria Rodriguez" },
    { id: "mr-2", name: "Taxes", createdBy: "Maria Rodriguez" },
    { id: "mr-3", name: "Contracts", createdBy: "Maria Rodriguez" },
  ]);

  // Subfolders list for Employee view page
  const [employeeSubfolders, setEmployeeSubfolders] = useState<FolderItem[]>([
    { id: "sub-1", name: "Maria Rodriguez", createdBy: "Maria Rodriguez" },
    { id: "sub-2", name: "Maria Rodriguez", createdBy: "Maria Rodriguez" },
    { id: "sub-3", name: "Maria Rodriguez", createdBy: "Maria Rodriguez" },
    { id: "sub-4", name: "Maria Rodriguez", createdBy: "Maria Rodriguez" },
    { id: "sub-5", name: "Maria Rodriguez", createdBy: "Maria Rodriguez" },
    { id: "sub-6", name: "Maria Rodriguez", createdBy: "Maria Rodriguez" },
    { id: "sub-7", name: "Maria Rodriguez", createdBy: "Maria Rodriguez" },
    { id: "sub-8", name: "Maria Rodriguez", createdBy: "Maria Rodriguez" },
    { id: "sub-9", name: "Maria Rodriguez", createdBy: "Maria Rodriguez" },
    { id: "sub-10", name: "Maria Rodriguez", createdBy: "Maria Rodriguez" },
    { id: "sub-11", name: "Maria Rodriguez", createdBy: "Maria Rodriguez" },
    { id: "sub-12", name: "Maria Rodriguez", createdBy: "Maria Rodriguez" },
    { id: "sub-13", name: "Maria Rodriguez", createdBy: "Maria Rodriguez" },
    { id: "sub-14", name: "Maria Rodriguez", createdBy: "Maria Rodriguez" },
    { id: "sub-15", name: "Maria Rodriguez", createdBy: "Maria Rodriguez" },
    { id: "sub-16", name: "Maria Rodriguez", createdBy: "Maria Rodriguez" },
  ]);

  // File State
  const [files, setFiles] = useState<FileItem[]>([
    {
      id: "fi1",
      name: "August Salary",
      type: "PDF",
      createdBy: "Maria Rodriguez",
    },
    { id: "fi2", name: "Sanction", type: "PDF", createdBy: "Maria Rodriguez" },
    {
      id: "fi3",
      name: "March Salary",
      type: "PDF",
      createdBy: "Maria Rodriguez",
    },
    {
      id: "fi4",
      name: "May Salary",
      type: "PDF",
      createdBy: "Maria Rodriguez",
    },
    { id: "fi5", name: "Sanction", type: "PDF", createdBy: "Maria Rodriguez" },
    { id: "fi6", name: "Sanction", type: "PDF", createdBy: "Maria Rodriguez" },
    { id: "fi7", name: "Sanction", type: "PDF", createdBy: "Maria Rodriguez" },
    { id: "fi8", name: "Sanction", type: "PDF", createdBy: "Maria Rodriguez" },
  ]);

  // UI States
  const [isGridView, setIsGridView] = useState(true);
  const [isFolderGridView, setIsFolderGridView] = useState(true);
  const [activeMenu, setActiveMenu] = useState<{
    id: string;
    type: "folder" | "file";
  } | null>(null);

  // Modals & Action States
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successTitle, setSuccessTitle] = useState("Success!");
  const [successMessage, setSuccessMessage] = useState("");

  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [renameTarget, setRenameTarget] = useState<{
    id: string;
    type: "folder" | "file";
    currentName: string;
  } | null>(null);
  const [renameValue, setRenameValue] = useState("");

  // Additional Premium Modals
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const [permissionTarget, setPermissionTarget] = useState<{
    id: string;
    type: "folder" | "file";
    name: string;
  } | null>(null);
  const [activeRoleSelect, setActiveRoleSelect] = useState<string | null>(null);

  // Move Modal State
  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
  const [moveTarget, setMoveTarget] = useState<{
    id: string;
    type: "folder" | "file";
    name: string;
  } | null>(null);
  const [moveSearchQuery, setMoveSearchQuery] = useState("");

  interface PermissionMember {
    id: string;
    name: string;
    email: string;
    role: "View Only" | "Edit Content" | "Add Folder" | "Add Files";
    avatarEmoji: string;
    avatarBg: string;
  }

  const [permissionMembers, setPermissionMembers] = useState<
    PermissionMember[]
  >([
    {
      id: "1",
      name: "Maria Rodriguez",
      email: "maria@beautywellness.com",
      role: "View Only",
      avatarEmoji: "👩‍🎤",
      avatarBg: "bg-pink-100 border-pink-200 text-pink-700",
    },
    {
      id: "2",
      name: "Maria Rodriguez",
      email: "maria@beautywellness.com",
      role: "Edit Content",
      avatarEmoji: "👩",
      avatarBg: "bg-orange-100 border-orange-200 text-orange-700",
    },
    {
      id: "3",
      name: "Maria Rodriguez",
      email: "maria@beautywellness.com",
      role: "Add Folder",
      avatarEmoji: "🧑‍🏫",
      avatarBg: "bg-teal-100 border-teal-200 text-teal-700",
    },
    {
      id: "4",
      name: "Maria Rodriguez",
      email: "maria@beautywellness.com",
      role: "Add Folder",
      avatarEmoji: "👦",
      avatarBg: "bg-red-100 border-red-200 text-red-700",
    },
  ]);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Outside click listener for dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setActiveMenu(null);
      }
      setActiveRoleSelect(null);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Upload Handlers
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFile = e.target.files[0];
      const nameWithoutExtension =
        newFile.name.substring(0, newFile.name.lastIndexOf(".")) ||
        newFile.name;
      const ext = newFile.name.split(".").pop()?.toUpperCase() || "PDF";
      const newItem = {
        id: `uploaded-${Date.now()}`,
        name: nameWithoutExtension,
        type: ext,
        createdBy: "Maria Rodriguez",
      };
      if (currentPath.length >= 2) {
        setSubfolderFiles((prev) => [newItem, ...prev]);
      } else {
        setFiles((prev) => [newItem, ...prev]);
      }
      setIsUploadModalOpen(false);
      setSuccessTitle("Upload Successful!");
      setSuccessMessage(
        `File "${newFile.name}" has been uploaded successfully.`,
      );
      setIsSuccessOpen(true);
    }
  };

  // Checkbox selection helpers
  const handleToggleFileSelection = (id: string) => {
    setSelectedFileIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleHeaderCheckboxClick = () => {
    if (selectedFileIds.length === subfolderFiles.length) {
      setSelectedFileIds([]);
    } else {
      setSelectedFileIds(subfolderFiles.map((f) => f.id));
    }
  };

  const handleDeleteSelectedFiles = () => {
    setSubfolderFiles((prev) => prev.filter((f) => !selectedFileIds.includes(f.id)));
    setSelectedFileIds([]);
    setSuccessTitle("Deleted!");
    setSuccessMessage("Selected items have been deleted successfully.");
    setIsSuccessOpen(true);
  };

  const handleDownloadSelectedFiles = () => {
    setSelectedFileIds([]);
    setSuccessTitle("Download Started!");
    setSuccessMessage("The download for selected items has initiated successfully.");
    setIsSuccessOpen(true);
  };

  const handleMoveSelectedFiles = () => {
    setMoveTarget({ id: "multiple", type: "file", name: `${selectedFileIds.length} selected files` });
    setIsMoveModalOpen(true);
  };

  // Create Folder Handler
  const handleCreateFolderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFolderName.trim()) {
      const newItem = {
        id: `folder-${Date.now()}`,
        name: newFolderName.trim(),
        createdBy: "Maria Rodriguez",
      };
      if (currentPath.length === 1) {
        setEmployeeSubfolders((prev) => [...prev, newItem]);
      } else if (currentPath.length === 2) {
        setMariaRodriguezFolders((prev) => [...prev, newItem]);
      } else {
        setFolders((prev) => [...prev, newItem]);
      }
      setNewFolderName("");
      setIsCreateFolderOpen(false);
      setSuccessTitle("Folder Created!");
      setSuccessMessage("Your new folder has been successfully created.");
      setIsSuccessOpen(true);
    }
  };

  // Rename Handler
  const handleRenameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (renameTarget && renameValue.trim()) {
      if (renameTarget.type === "folder") {
        if (currentPath.length === 1) {
          setEmployeeSubfolders((prev) =>
            prev.map((f) =>
              f.id === renameTarget.id ? { ...f, name: renameValue.trim() } : f
            )
          );
        } else if (currentPath.length === 2) {
          setMariaRodriguezFolders((prev) =>
            prev.map((f) =>
              f.id === renameTarget.id ? { ...f, name: renameValue.trim() } : f
            )
          );
        } else {
          setFolders((prev) =>
            prev.map((f) =>
              f.id === renameTarget.id ? { ...f, name: renameValue.trim() } : f
            )
          );
        }
      } else {
        if (currentPath.length >= 2) {
          setSubfolderFiles((prev) =>
            prev.map((fi) =>
              fi.id === renameTarget.id
                ? { ...fi, name: renameValue.trim() }
                : fi
            )
          );
        } else {
          setFiles((prev) =>
            prev.map((fi) =>
              fi.id === renameTarget.id
                ? { ...fi, name: renameValue.trim() }
                : fi
            )
          );
        }
      }
      setIsRenameOpen(false);
      setRenameTarget(null);
      setRenameValue("");
      setSuccessTitle("Renamed!");
      setSuccessMessage("The item has been renamed successfully.");
      setIsSuccessOpen(true);
    }
  };

  // Rename trigger
  const handleRenameClick = (
    id: string,
    type: "folder" | "file",
    currentName: string,
  ) => {
    setRenameTarget({ id, type, currentName });
    setRenameValue(currentName);
    setIsRenameOpen(true);
    setActiveMenu(null);
  };

  // Delete Handler
  const handleDeleteClick = (id: string, type: "folder" | "file") => {
    if (type === "folder") {
      if (currentPath.length === 1) {
        setEmployeeSubfolders((prev) => prev.filter((f) => f.id !== id));
      } else if (currentPath.length === 2) {
        setMariaRodriguezFolders((prev) => prev.filter((f) => f.id !== id));
      } else {
        setFolders((prev) => prev.filter((f) => f.id !== id));
      }
    } else {
      if (currentPath.length >= 2) {
        setSubfolderFiles((prev) => prev.filter((fi) => fi.id !== id));
      } else {
        setFiles((prev) => prev.filter((fi) => fi.id !== id));
      }
    }
    setActiveMenu(null);
    setSuccessTitle("Deleted!");
    setSuccessMessage("The item has been deleted successfully.");
    setIsSuccessOpen(true);
  };

  // Mock Actions
  const handleMockDownload = (name: string, type: "folder" | "file") => {
    setActiveMenu(null);
    const content = `Mock document details for ${type} "${name}".`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${name.toLowerCase().replace(/\s+/g, "_")}.${type === "folder" ? "zip" : "pdf"}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setSuccessTitle("Download Started!");
    setSuccessMessage(`The download for ${name} has initiated successfully.`);
    setIsSuccessOpen(true);
  };

  const handleActionNotify = (action: string, itemName: string) => {
    setActiveMenu(null);
    if (action === "Manage Permission") {
      setPermissionTarget({ id: "mock", type: "folder", name: itemName });
      setIsPermissionModalOpen(true);
    } else if (action === "Move") {
      setMoveTarget({ id: "mock", type: "folder", name: itemName });
      setIsMoveModalOpen(true);
    } else {
      setSuccessTitle(action);
      setSuccessMessage(`Action "${action}" triggered for "${itemName}".`);
      setIsSuccessOpen(true);
    }
  };

  return (
    <main className="flex-1 overflow-y-auto bg-[#f8fafc] p-6 lg:p-8 space-y-6">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
      />
      {/* Header Container - Full width, white */}
      {currentPath.length > 0 ? (
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm px-8 py-4 flex justify-between items-center animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPath((prev) => prev.slice(0, -1))}
              className="p-2 hover:bg-slate-50 rounded-lg text-slate-500 transition-colors cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>
            <h1 className="text-lg font-bold text-slate-800 tracking-tight">
              {currentPath[currentPath.length - 1].name}
            </h1>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold">
            <Home size={14} className="text-slate-400" />
            <span className="text-slate-300">/</span>
            <span className="bg-[#eef2ff] text-[#5c59f0] px-3 py-1.5 rounded-full text-[11px] font-bold">
              {currentPath.length >= 3 ? "Files" : "New Upload"}
            </span>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm px-8 py-6">
          <h1 className="text-lg font-bold text-slate-800 tracking-tight">
            New Document Upload
          </h1>
        </div>
      )}

      {/* Upload actions block */}
      {currentPath.length < 3 ? (
        <UploadActions
          onUploadClick={() => setIsUploadModalOpen(true)}
          onCreateFolderClick={() => setIsCreateFolderOpen(true)}
        />
      ) : (
        /* Upload Button layout from Screenshot 1 */
        <div className="flex justify-start">
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="flex flex-col items-center justify-center gap-2 w-28 h-24 bg-[#5c59f0] hover:bg-[#4744db] text-white rounded-2xl shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <UploadCloud size={24} />
            <span className="text-xs font-bold">Upload</span>
          </button>
        </div>
      )}

      {/* Directory Router */}
      {currentPath.length === 0 && (
        <>
          <SuggestedFolders
            folders={folders}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            dropdownRef={dropdownRef}
            handleRenameClick={handleRenameClick}
            handleMockDownload={handleMockDownload}
            handleActionNotify={handleActionNotify}
            handleDeleteClick={handleDeleteClick}
            onFolderClick={(folder) => setCurrentPath([folder])}
            isGridView={isFolderGridView}
            setIsGridView={setIsFolderGridView}
          />
          <SuggestedFiles
            files={files}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            dropdownRef={dropdownRef}
            isGridView={isGridView}
            setIsGridView={setIsGridView}
            handleRenameClick={handleRenameClick}
            handleMockDownload={handleMockDownload}
            handleActionNotify={handleActionNotify}
            handleDeleteClick={handleDeleteClick}
          />
        </>
      )}

      {currentPath.length === 1 && (
        <SuggestedFolders
          folders={employeeSubfolders}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          dropdownRef={dropdownRef}
          handleRenameClick={handleRenameClick}
          handleMockDownload={handleMockDownload}
          handleActionNotify={handleActionNotify}
          handleDeleteClick={handleDeleteClick}
          onFolderClick={(folder) => setCurrentPath([...currentPath, folder])}
          isGridView={isFolderGridView}
          setIsGridView={setIsFolderGridView}
          showViewMore={false}
        />
      )}

      {currentPath.length === 2 && (
        <SuggestedFolders
          folders={mariaRodriguezFolders}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          dropdownRef={dropdownRef}
          handleRenameClick={handleRenameClick}
          handleMockDownload={handleMockDownload}
          handleActionNotify={handleActionNotify}
          handleDeleteClick={handleDeleteClick}
          onFolderClick={(folder) => setCurrentPath([...currentPath, folder])}
          isGridView={isFolderGridView}
          setIsGridView={setIsFolderGridView}
          showViewMore={false}
        />
      )}

      {currentPath.length >= 3 && (
        <div className="bg-white rounded-xl border border-slate-100 p-8 shadow-sm space-y-6 animate-in fade-in duration-200">
          {/* Selection / Action Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              {/* Header Checkbox */}
              <button
                onClick={handleHeaderCheckboxClick}
                className="text-[#5c59f0] hover:text-[#4744db] transition-colors cursor-pointer"
              >
                {selectedFileIds.length === subfolderFiles.length ? (
                  <div className="w-5 h-5 bg-[#5c59f0] border border-[#5c59f0] rounded flex items-center justify-center text-white text-xs font-bold">
                    ✓
                  </div>
                ) : selectedFileIds.length > 0 ? (
                  <div className="w-5 h-5 bg-[#ff5b5b] border border-[#ff5b5b] rounded flex items-center justify-center text-white text-[16px] font-extrabold leading-none">
                    -
                  </div>
                ) : (
                  <div className="w-5 h-5 border-2 border-slate-300 rounded bg-white hover:border-[#5c59f0]" />
                )}
              </button>
              <span className="text-sm font-bold text-slate-800">
                {selectedFileIds.length === subfolderFiles.length
                  ? "Unselect All Salons"
                  : selectedFileIds.length > 0
                  ? "Select All Files"
                  : "Files"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Selection Actions */}
              {selectedFileIds.length > 0 && (
                <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-4 duration-200">
                  <button
                    onClick={handleDeleteSelectedFiles}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#fff1f2] hover:bg-[#ffe4e6] text-[#f43f5e] text-xs font-bold rounded-xl transition-all active:scale-95 cursor-pointer"
                  >
                    <Trash2 size={14} />
                    <span>Delete</span>
                  </button>
                  <button
                    onClick={handleDownloadSelectedFiles}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#eef2ff] hover:bg-[#e0e7ff] text-[#5c59f0] text-xs font-bold rounded-xl transition-all active:scale-95 cursor-pointer"
                  >
                    <Download size={14} />
                    <span>Download</span>
                  </button>
                  <button
                    onClick={handleMoveSelectedFiles}
                    className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold rounded-xl transition-all active:scale-95 cursor-pointer border border-slate-200"
                  >
                    <FolderInput size={14} />
                    <span>Move</span>
                  </button>
                </div>
              )}

              {/* Layout Toggle */}
              <div className="flex border border-slate-100 rounded-xl overflow-hidden bg-white p-1">
                <button
                  onClick={() => setIsGridView(false)}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    !isGridView
                      ? "bg-slate-100 text-slate-700"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <List size={16} />
                </button>
                <button
                  onClick={() => setIsGridView(true)}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    isGridView
                      ? "bg-slate-100 text-slate-700"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <Grid size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Files Display */}
          {isGridView ? (
            /* Grid View */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {subfolderFiles.map((file) => (
                <div
                  key={file.id}
                  onClick={() => handleToggleFileSelection(file.id)}
                  className={`bg-[#f8fafc] border rounded-[24px] p-5 flex flex-col items-center relative group hover:shadow-md transition-all duration-200 cursor-pointer ${
                    selectedFileIds.includes(file.id)
                      ? "border-[#5c59f0] ring-1 ring-[#5c59f0]/20 bg-[#5c59f0]/5"
                      : "border-slate-100/50"
                  }`}
                >
                  {/* Checkbox (visible on hover or when selected) */}
                  <div
                    className={`absolute top-4 left-4 z-10 transition-opacity duration-200 ${
                      selectedFileIds.length > 0 || selectedFileIds.includes(file.id)
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      checked={selectedFileIds.includes(file.id)}
                      onChange={() => handleToggleFileSelection(file.id)}
                      className="w-4 h-4 rounded border-slate-300 text-[#5c59f0] focus:ring-[#5c59f0] cursor-pointer"
                    />
                  </div>

                  {/* Inner White Card for Preview */}
                  <div className="w-full bg-white rounded-2xl py-8 flex items-center justify-center border border-slate-100/50 shadow-[0_2px_8px_rgba(0,0,0,0.015)] overflow-hidden">
                    <div className="relative w-16 h-20 flex flex-col items-center justify-between border border-rose-100 bg-[#fff5f5] rounded-lg p-2 group-hover:scale-110 transition-transform duration-200 shadow-sm">
                      <span className="text-[28px] text-rose-500">📄</span>
                      <span className="text-[9px] font-bold bg-[#ff4a4a] text-white px-1.5 py-0.5 rounded uppercase tracking-wide">
                        PDF
                      </span>
                    </div>
                  </div>

                  <div className="w-full mt-4 flex justify-between items-start relative px-1">
                    <div className="flex flex-col truncate w-[80%] text-left">
                      <span className="text-sm font-bold text-slate-800 truncate">
                        {file.name}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400 mt-1">
                        PDF • 20 MB • Created by {file.createdBy}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenu(
                          activeMenu?.id === file.id
                            ? null
                            : { id: file.id, type: "file" }
                        );
                      }}
                      className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <MoreVertical size={16} />
                    </button>
                  </div>

                  {activeMenu?.id === file.id && activeMenu?.type === "file" && (
                    <div ref={dropdownRef} className="absolute right-0 z-30">
                      <FileDropdown
                        onRename={() =>
                          handleRenameClick(file.id, "file", file.name)
                        }
                        onDownload={() => handleMockDownload(file.name, "file")}
                        onMove={() => handleActionNotify("Move", file.name)}
                        onPublish={() =>
                          handleActionNotify(
                            "Publish social media post",
                            file.name
                          )
                        }
                        onManagePermission={() =>
                          handleActionNotify("Manage Permission", file.name)
                        }
                        onDelete={() => handleDeleteClick(file.id, "file")}
                        alignLeft={true}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="space-y-3">
              {subfolderFiles.map((file) => (
                <div
                  key={file.id}
                  onClick={() => handleToggleFileSelection(file.id)}
                  className={`bg-white border rounded-2xl p-4 flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-md transition-all duration-200 cursor-pointer ${
                    selectedFileIds.includes(file.id)
                      ? "border-[#5c59f0] bg-[#5c59f0]/5"
                      : "border-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    {/* Checkbox (visible if selection mode active or hovered) */}
                    <div
                      className={`transition-opacity duration-200 ${
                        selectedFileIds.length > 0 || selectedFileIds.includes(file.id)
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        checked={selectedFileIds.includes(file.id)}
                        onChange={() => handleToggleFileSelection(file.id)}
                        className="w-5 h-5 rounded border-slate-300 text-[#5c59f0] focus:ring-[#5c59f0] cursor-pointer mr-2"
                      />
                    </div>

                    {/* File Icon */}
                    <div className="relative w-12 h-12 bg-[#fff1f2] border border-rose-100 rounded-xl flex flex-col items-center justify-center shadow-sm">
                      <span className="text-[18px]">📄</span>
                      <span className="absolute bottom-1 text-[7px] font-bold bg-[#ff4a4a] text-white px-1 rounded uppercase scale-90">
                        PDF
                      </span>
                    </div>

                    {/* Info */}
                    <div className="flex flex-col text-left">
                      <span className="text-sm font-bold text-slate-800">
                        {file.name}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400 mt-1">
                        PDF • 20 MB • Created by {file.createdBy}
                      </span>
                    </div>
                  </div>

                  <div className="relative" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenu(
                          activeMenu?.id === file.id
                            ? null
                            : { id: file.id, type: "file" }
                        );
                      }}
                      className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition-all cursor-pointer inline-block"
                    >
                      <MoreVertical size={16} />
                    </button>

                    {activeMenu?.id === file.id && activeMenu?.type === "file" && (
                      <div ref={dropdownRef} className="absolute right-0 z-30">
                        <FileDropdown
                          onRename={() =>
                            handleRenameClick(file.id, "file", file.name)
                          }
                          onDownload={() => handleMockDownload(file.name, "file")}
                          onMove={() => handleActionNotify("Move", file.name)}
                          onPublish={() =>
                            handleActionNotify(
                              "Publish social media post",
                              file.name
                            )
                          }
                          onManagePermission={() =>
                            handleActionNotify("Manage Permission", file.name)
                          }
                          onDelete={() => handleDeleteClick(file.id, "file")}
                          alignLeft={true}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {/* CREATE FOLDER MODAL */}
      {isCreateFolderOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div
            onClick={() => setIsCreateFolderOpen(false)}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />

          <div className="relative w-full max-w-sm bg-white border border-slate-100 rounded-3xl p-8 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-slate-800 mb-2">
              Create New Folder
            </h3>
            <p className="text-xs text-slate-400 font-medium mb-6">
              Enter a name for the new folder.
            </p>

            <form onSubmit={handleCreateFolderSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="Enter name"
                  className="w-full bg-white border border-slate-200 focus:border-[#5c59f0] rounded-lg px-4 py-3 text-sm font-medium text-slate-700 outline-none transition-colors"
                  required
                />
              </div>

              <div className="flex items-center justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#5c59f0] hover:bg-[#4744db] text-white text-sm font-bold rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RENAME MODAL */}
      {isRenameOpen && renameTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div
            onClick={() => setIsRenameOpen(false)}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />

          <div className="relative w-full max-w-md bg-white border border-slate-100 rounded-3xl p-8 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-slate-800">
                Rename Item
              </h3>
              <button
                onClick={() => setIsRenameOpen(false)}
                className="p-1 hover:bg-slate-50 text-slate-400 hover:text-slate-600 rounded-full transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleRenameSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2">
                  New Name *
                </label>
                <input
                  type="text"
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.target.value)}
                  placeholder="New name"
                  className="w-full bg-white border border-slate-200 focus:border-[#5c59f0] rounded-lg px-4 py-3 text-sm font-medium text-slate-700 outline-none transition-colors"
                  required
                />
              </div>

              <div className="flex items-center justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#5c59f0] hover:bg-[#4744db] text-white text-sm font-bold rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* UPLOAD FILES MODAL */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div
            onClick={() => setIsUploadModalOpen(false)}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />

          <div className="relative w-full max-w-lg bg-white border border-slate-100 rounded-3xl p-8 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-slate-800">
                Upload Files
              </h3>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1 hover:bg-slate-50 text-slate-400 hover:text-slate-600 rounded-full transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Dropzone */}
            <div
              onClick={handleUploadClick}
              className="border-2 border-dashed border-[#5c59f0]/30 hover:border-[#5c59f0] rounded-[24px] bg-[#f8fafc] hover:bg-[#eef2ff]/30 py-12 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-200 group"
            >
              <div className="p-4 bg-[#eef2ff] text-[#5c59f0] rounded-2xl group-hover:scale-105 transition-transform duration-200">
                <UploadCloud size={32} strokeWidth={2} />
              </div>
              <span className="text-sm font-semibold text-[#5c59f0]">
                Drop here or click to browse
              </span>
            </div>

            {/* Save Button */}
            <div className="flex items-center justify-end pt-6 mt-6 border-t border-slate-100">
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="px-6 py-2.5 bg-[#5c59f0] hover:bg-[#4744db] text-white text-sm font-bold rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MANAGE PERMISSIONS MODAL */}
      {isPermissionModalOpen && permissionTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div
            onClick={() => {
              setIsPermissionModalOpen(false);
              setActiveRoleSelect(null);
            }}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />

          <div className="relative w-full max-w-lg bg-white border border-slate-100 rounded-3xl p-8 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200 flex flex-col gap-6 text-left">
            {/* Header */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">
                Manage Permissions
              </h3>
              <button
                onClick={() => {
                  setIsPermissionModalOpen(false);
                  setActiveRoleSelect(null);
                }}
                className="p-1 hover:bg-slate-50 text-slate-400 hover:text-slate-600 rounded-full transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Add Member Search Input */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-600">
                Add Member *
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search a member"
                  className="w-full bg-white border border-slate-200 focus:border-[#5c59f0] rounded-xl pl-4 pr-10 py-3 text-sm font-medium text-slate-700 outline-none transition-colors"
                />
                <Search size={16} className="absolute right-4 text-slate-400" />
              </div>
            </div>

            {/* People with Access */}
            <div className="space-y-4 flex-1">
              <h4 className="text-xs font-semibold text-slate-600">
                People with Access
              </h4>
              <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
                {permissionMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full ${member.avatarBg} flex items-center justify-center text-lg shadow-sm border`}
                      >
                        {member.avatarEmoji}
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-sm font-bold text-slate-800 leading-tight">
                          {member.name}
                        </span>
                        <span className="text-[11px] font-medium text-slate-400 leading-normal">
                          {member.email}
                        </span>
                      </div>
                    </div>

                    {/* Role Dropdown */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveRoleSelect(
                            activeRoleSelect === member.id ? null : member.id,
                          );
                        }}
                        className="flex items-center justify-between gap-2 px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 bg-white hover:bg-slate-50 transition-colors cursor-pointer w-32"
                      >
                        <span>{member.role}</span>
                        <ChevronDown size={14} className="text-slate-400" />
                      </button>

                      {activeRoleSelect === member.id && (
                        <div className="absolute right-0 top-11 w-44 bg-white border border-slate-100 rounded-2xl shadow-xl z-30 py-1.5 animate-in fade-in zoom-in-95 duration-100">
                          {["View Only", "Add Files", "Edit Content"].map(
                            (roleOption) => (
                              <button
                                key={roleOption}
                                type="button"
                                onClick={() => {
                                  setPermissionMembers((prev) =>
                                    prev.map((m) =>
                                      m.id === member.id
                                        ? { ...m, role: roleOption as "View Only" | "Edit Content" | "Add Folder" | "Add Files" }
                                        : m,
                                    ),
                                  );
                                  setActiveRoleSelect(null);
                                }}
                                className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                              >
                                {roleOption}
                              </button>
                            ),
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <div className="flex items-center justify-end pt-4 mt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  setIsPermissionModalOpen(false);
                  setActiveRoleSelect(null);
                  setSuccessTitle("Permissions Updated!");
                  setSuccessMessage(
                    `Permissions for "${permissionTarget.name}" have been saved successfully.`,
                  );
                  setIsSuccessOpen(true);
                }}
                className="px-6 py-2.5 bg-[#5c59f0] hover:bg-[#4744db] text-white text-sm font-bold rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MOVE FOLDER MODAL */}
      {isMoveModalOpen && moveTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div
            onClick={() => setIsMoveModalOpen(false)}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />

          <div className="relative w-full max-w-lg bg-white border border-slate-100 rounded-3xl p-8 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200 flex flex-col gap-6 text-left">
            {/* Header */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">
                Move Folder
              </h3>
              <button
                onClick={() => setIsMoveModalOpen(false)}
                className="p-1 hover:bg-slate-50 text-slate-400 hover:text-slate-600 rounded-full transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Search Input */}
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search a folder"
                value={moveSearchQuery}
                onChange={(e) => setMoveSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-[#5c59f0] rounded-xl pl-4 pr-10 py-3 text-sm font-medium text-slate-700 outline-none transition-colors"
              />
              <Search size={16} className="absolute right-4 text-slate-400" />
            </div>

            {/* Suggestions */}
            <div className="space-y-4 flex-1">
              <h4 className="text-xs font-semibold text-slate-600">
                Suggestions
              </h4>
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {["Employess", "Employess", "Employess", "Employess"]
                  .filter((name) =>
                    name.toLowerCase().includes(moveSearchQuery.toLowerCase())
                  )
                  .map((folderName, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 py-2 px-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors"
                    >
                      <div className="p-2.5 bg-[#eef2ff] text-[#5c59f0] rounded-xl flex items-center justify-center">
                        <Image
                          src="/folder.svg"
                          alt="Folder Icon"
                          width={20}
                          height={16}
                          className="w-5 h-4 object-contain"
                        />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-sm font-semibold text-slate-800 leading-tight">
                          {folderName}
                        </span>
                        <span className="text-[11px] font-medium text-slate-400 mt-0.5">
                          Created by Maria Rodriguez
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Save Button */}
            <div className="flex items-center justify-end pt-4 mt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  setIsMoveModalOpen(false);
                  setMoveSearchQuery("");
                  setSuccessTitle("Move Completed!");
                  setSuccessMessage(
                    `"${moveTarget.name}" has been successfully moved to the destination folder.`
                  );
                  setIsSuccessOpen(true);
                }}
                className="px-6 py-2.5 bg-[#5c59f0] hover:bg-[#4744db] text-white text-sm font-bold rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        title={successTitle}
        message={successMessage}
      />
    </main>
  );
}
