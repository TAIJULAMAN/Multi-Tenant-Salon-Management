"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Upload,
  Search,
  MoreVertical,
  Download,
  Globe,
  Trash2,
  Play,
  Pause,
  Volume2,
  Maximize,
  Check,
} from "lucide-react";
import { CustomSelect } from "../../../common/CustomSelect";

interface MediaItem {
  id: string;
  name: string;
  type: "Photo" | "Video";
  status: "Published" | "Not published";
  usage: "Used" | "Unused";
  uploadedBy: string;
  uploadedAt: string;
  previewUrl?: string;
}

const INITIAL_MEDIA_ITEMS: MediaItem[] = [
  {
    id: "media-1",
    name: "FileName.jpeg",
    type: "Photo",
    status: "Published",
    usage: "Used",
    uploadedBy: "Maria",
    uploadedAt: "08/08/2025 5:06 PM",
  },
  {
    id: "media-2",
    name: "FileName.jpeg",
    type: "Video",
    status: "Not published",
    usage: "Unused",
    uploadedBy: "Maria",
    uploadedAt: "08/08/2025 5:06 PM",
  },
];

export function MediaManagement() {
  const [mediaFiles, setMediaFiles] =
    useState<MediaItem[]>(INITIAL_MEDIA_ITEMS);
  const [activeMediaType, setActiveMediaType] = useState("All Type");
  const [activeUsage, setActiveUsage] = useState("All Media");
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [videoProgress, setVideoProgress] = useState<Record<string, number>>({});
  const [isHoveringSelectAll, setIsHoveringSelectAll] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "info";
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Filter media files
  const filteredMedia = mediaFiles.filter((item) => {
    // Type filter
    if (activeMediaType === "Photo" && item.type !== "Photo") return false;
    if (activeMediaType === "Video" && item.type !== "Video") return false;

    // Usage filter
    if (activeUsage === "Used" && item.usage !== "Used") return false;
    if (activeUsage === "Unused" && item.usage !== "Unused") return false;

    // Search query filter
    if (searchQuery.trim() !== "") {
      return item.name.toLowerCase().includes(searchQuery.toLowerCase());
    }

    return true;
  });

  const isAllSelected =
    filteredMedia.length > 0 && selectedIds.length === filteredMedia.length;



  // Click outside to close actions menu
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenMenuId(null);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSelectAllToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredMedia.map((item) => item.id));
    }
  };

  const handleSelectCard = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    e.stopPropagation();
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleTogglePlayVideo = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const videoEl = document.getElementById(`video-${id}`) as HTMLVideoElement | null;
    if (playingVideoId === id) {
      setPlayingVideoId(null);
      if (videoEl) videoEl.pause();
    } else {
      if (playingVideoId) {
        const prevVideoEl = document.getElementById(`video-${playingVideoId}`) as HTMLVideoElement | null;
        if (prevVideoEl) prevVideoEl.pause();
      }
      setPlayingVideoId(id);
      if (videoEl) {
        videoEl.play().catch(err => console.log("Play failed", err));
      }
      showToast("Playing video preview", "info");
    }
  };

  const handleTimeUpdate = (id: string, e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    const progress = (video.currentTime / video.duration) * 100;
    setVideoProgress(prev => ({ ...prev, [id]: progress }));
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newItems: MediaItem[] = Array.from(files).map((file, idx) => {
      const isVideo = file.type.startsWith("video/");
      const localUrl = URL.createObjectURL(file);

      return {
        id: `media-${Date.now()}-${idx}`,
        name: file.name,
        type: isVideo ? "Video" as const : "Photo" as const,
        status: "Not published" as const,
        usage: "Unused" as const,
        uploadedBy: "Maria",
        uploadedAt: new Date()
          .toLocaleString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
          .replace(",", ""),
        previewUrl: localUrl
      };
    });

    setMediaFiles(prev => [...newItems, ...prev]);
    showToast(`Successfully uploaded ${newItems.length} file(s)`);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDeleteItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const itemToDelete = mediaFiles.find((item) => item.id === id);
    setMediaFiles(mediaFiles.filter((item) => item.id !== id));
    setSelectedIds(selectedIds.filter((checkedId) => checkedId !== id));
    setOpenMenuId(null);
    if (itemToDelete) {
      showToast(`Deleted ${itemToDelete.name}`);
    }
  };

  const handleUseItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMediaFiles(
      mediaFiles.map((item) => {
        if (item.id === id) {
          showToast(`Selected ${item.name} for publishing`);
          return { ...item, status: "Published", usage: "Used" as const };
        }
        return item;
      }),
    );
    setOpenMenuId(null);
  };

  const handleDownloadItem = (item: MediaItem, e: React.MouseEvent) => {
    e.stopPropagation();
    showToast(`Started download for ${item.name}`);
    setOpenMenuId(null);
  };

  const handleMassDelete = () => {
    setMediaFiles(mediaFiles.filter((item) => !selectedIds.includes(item.id)));
    showToast(`Successfully deleted ${selectedIds.length} media files`);
    setSelectedIds([]);
  };

  const handleMassUse = () => {
    setMediaFiles(
      mediaFiles.map((item) => {
        if (selectedIds.includes(item.id)) {
          return { ...item, status: "Published", usage: "Used" as const };
        }
        return item;
      }),
    );
    showToast(`Selected ${selectedIds.length} media files for publishing`);
    setSelectedIds([]);
  };

  return (
    <div className="flex flex-col relative pb-8 font-manrope">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-lg border shadow-lg backdrop-blur-md animate-in fade-in slide-in-from-top-3 duration-200 ${toast.type === "success"
              ? "bg-[#F0FDFA]/95 border-[#CCFBF1] text-[#0D9488]"
              : "bg-[#EFF6FF]/95 border-[#DBEAFE] text-[#1D4ED8]"
            }`}
        >
          <div className="w-2 h-2 rounded-full bg-current animate-ping" />
          <span className="text-xs font-bold">{toast.message}</span>
        </div>
      )}

      {/* Top Header Card containing Filters & Search */}
      <div className="bg-white rounded-lg mb-5 px-5 py-2 flex flex-col md:flex-row justify-between items-center">
        <div className="px-6">
          <h1 className="text-[16px] sm:text-xl font-bold text-[#1E293B]">
            Media
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row md:flex-row sm:items-center md:items-center gap-5 w-full sm:w-auto">
          <div className="relative w-full lg:w-64">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-[#E2E8F0] rounded-lg text-[13px] text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#635BFF] focus:border-[#635BFF] transition-all bg-white"
            />
          </div>
          <CustomSelect
            value={activeMediaType}
            onChange={setActiveMediaType}
            options={["All Type", "Photo", "Video"]}
            className="w-full"
            buttonClassName="w-full justify-between sm:justify-start"
          />
          <CustomSelect
            value={activeUsage}
            onChange={setActiveUsage}
            options={["All Media", "Used", "Unused"]}
            className="w-full"
            buttonClassName="w-full justify-between sm:justify-start"
          />
        </div>
      </div>

      {/* Hidden file input for functional uploads */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
        accept="image/*,video/*"
        className="hidden"
      />

      <button
        onClick={handleUploadClick}
        className="w-full sm:w-44 h-28 bg-[#635BFF] hover:bg-[#5249F5] rounded-xl flex flex-col items-start justify-between p-5 text-white transition-all shadow-md shadow-[#635BFF]/10 mb-6 cursor-pointer group"
      >
        <Upload className="w-6 h-6 transition-transform group-hover:-translate-y-0.5" />
        <span className="font-bold text-[16px] tracking-wide">Upload</span>
      </button>

      {/* Media Items Panel Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
        {/* Count / Select All / Mass actions header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-[#F1F5F9] mb-6 gap-4">
          <div
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={handleSelectAllToggle}
            onMouseEnter={() => setIsHoveringSelectAll(true)}
            onMouseLeave={() => setIsHoveringSelectAll(false)}
          >
            <div
              className={`w-5 h-5 rounded-md flex items-center justify-center cursor-pointer transition-all border flex-shrink-0 ${selectedIds.length > 0
                  ? isAllSelected
                    ? "bg-[#635BFF] border-[#635BFF] text-white"
                    : "bg-[#FF5A79] border-[#FF5A79] text-white"
                  : "bg-white border-[#CBD5E1] text-transparent hover:border-[#94A3B8]"
                }`}
            >
              {selectedIds.length > 0 && (
                isAllSelected ? (
                  <Check className="w-3 h-3 stroke-[3.5] text-white" />
                ) : (
                  <div className="w-2 h-0.5 bg-white rounded-full" />
                )
              )}
            </div>
            <span
              className={`text-[13px] sm:text-[14px] font-bold transition-colors ${isAllSelected
                  ? "text-[#635BFF]"
                  : isHoveringSelectAll
                    ? "text-[#635BFF]"
                    : "text-[#1E293B]"
                }`}
            >
              {selectedIds.length > 0
                ? isAllSelected
                  ? "Unselect All Medias"
                  : "Select All Medias"
                : isHoveringSelectAll
                  ? "Select All Medias"
                  : `${filteredMedia.length} medias`}
            </span>
          </div>

          {/* Mass Actions */}
          {selectedIds.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleMassDelete}
                className="px-4 py-2 bg-[#FFF1F2] hover:bg-[#FFE4E6] text-[#F43F5E] text-[12px] font-bold rounded-lg border border-[#FFE4E6] transition-all cursor-pointer"
              >
                Mass Deletion
              </button>
              <button
                onClick={handleMassUse}
                className="px-4 py-2 bg-[#06B6D4] hover:bg-[#0891B2] text-white text-[12px] font-bold rounded-lg shadow-sm shadow-[#06B6D4]/10 transition-all cursor-pointer"
              >
                Use Media
              </button>
            </div>
          )}
        </div>

        {/* Media Grid */}
        {filteredMedia.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredMedia.map((item) => (
              <div
                key={item.id}
                className={`bg-white border rounded-xl p-5 relative transition-all ${selectedIds.includes(item.id)
                    ? "border-[#635BFF] shadow-md shadow-[#635BFF]/5"
                    : "border-[#E2E8F0] hover:shadow-sm"
                  }`}
              >
                {/* Card Header Row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        if (selectedIds.includes(item.id)) {
                          setSelectedIds(selectedIds.filter((id) => id !== item.id));
                        } else {
                          setSelectedIds([...selectedIds, item.id]);
                        }
                      }}
                      className={`w-5 h-5 rounded-md flex items-center justify-center cursor-pointer transition-all border flex-shrink-0 ${selectedIds.includes(item.id)
                          ? "bg-[#635BFF] border-[#635BFF] text-white"
                          : "bg-white border-[#CBD5E1] text-transparent hover:border-[#94A3B8]"
                        }`}
                    >
                      {selectedIds.includes(item.id) && (
                        <Check className="w-3 h-3 stroke-[3.5] text-white" />
                      )}
                    </div>
                    <span className="text-[14px] font-bold text-[#1E293B]">
                      {item.name}
                    </span>
                  </div>

                  {/* Actions Dropdown */}
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(openMenuId === item.id ? null : item.id);
                      }}
                      className="p-1 rounded-md text-[#94A3B8] hover:text-[#1E293B] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {openMenuId === item.id && (
                      <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-[#E2E8F0] rounded-lg shadow-lg overflow-hidden z-30 animate-in fade-in slide-in-from-top-1 duration-100">
                        <button
                          onClick={(e) => handleDownloadItem(item, e)}
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-[12px] font-bold text-[#64748B] hover:text-[#1E293B] hover:bg-[#F8FAFC] transition-colors text-left cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          Download
                        </button>
                        <button
                          onClick={(e) => handleUseItem(item.id, e)}
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-[12px] font-bold text-[#64748B] hover:text-[#1E293B] hover:bg-[#F8FAFC] transition-colors text-left border-t border-[#F1F5F9] cursor-pointer"
                        >
                          <Globe className="w-3.5 h-3.5" />
                          Use media
                        </button>
                        <button
                          onClick={(e) => handleDeleteItem(item.id, e)}
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-[12px] font-bold text-[#F43F5E] hover:bg-[#FFF1F2] transition-colors text-left border-t border-[#F1F5F9] cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Media Image/Video Canvas */}
                <div className="h-[220px] w-full rounded-lg overflow-hidden mb-4 relative bg-[#F8FAFC] select-none">
                  {item.type === "Photo" ? (
                    item.previewUrl ? (
                      <img
                        src={item.previewUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#A5B4FC] via-[#C084FC] to-[#F472B6] relative overflow-hidden flex items-center justify-center">
                        <div
                          className="w-28 h-28 rounded-full bg-gradient-to-tr from-[#E0E7FF] to-[#C7D2FE] opacity-80 absolute top-[15%] left-[20%] blur-[0.5px] shadow-lg animate-pulse"
                          style={{ animationDuration: "6s" }}
                        />
                        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#F472B6] to-[#F9A8D4] opacity-90 absolute top-[25%] left-[48%] blur-[0.5px] shadow-md" />
                        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#EEF2FF] to-[#E0E7FF] opacity-60 absolute bottom-[20%] right-[15%] blur-[0.5px]" />
                      </div>
                    )
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#0EA5E9] via-[#8B5CF6] to-[#EC4899] relative overflow-hidden flex items-center justify-center">
                      {item.previewUrl ? (
                        <video
                          id={`video-${item.id}`}
                          src={item.previewUrl}
                          className="w-full h-full object-cover absolute inset-0"
                          loop
                          muted
                          playsInline
                          onTimeUpdate={(e) => handleTimeUpdate(item.id, e)}
                        />
                      ) : (
                        <>
                          {/* Floating details inside video background */}
                          <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-[#38BDF8] to-[#818CF8] opacity-60 absolute top-[10%] left-[10%] blur-[1px]" />
                          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#F472B6] to-[#FDA4AF] opacity-50 absolute bottom-[15%] right-[10%] blur-[1px]" />
                        </>
                      )}

                      {/* Play/Pause Button overlay */}
                      <button
                        onClick={(e) => handleTogglePlayVideo(item.id, e)}
                        className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg z-10"
                      >
                        {playingVideoId === item.id ? (
                          <Pause className="w-5 h-5 fill-white" />
                        ) : (
                          <Play className="w-5 h-5 fill-white ml-0.5" />
                        )}
                      </button>

                      {/* Video Player bottom controls */}
                      <div className="absolute bottom-0 inset-x-0 bg-black/45 backdrop-blur-sm px-4 py-3 flex items-center justify-between text-white text-[12px] z-10 select-none">
                        <button
                          onClick={(e) => handleTogglePlayVideo(item.id, e)}
                          className="hover:text-slate-200 transition-colors cursor-pointer flex items-center"
                        >
                          {playingVideoId === item.id ? (
                            <Pause className="w-3.5 h-3.5 fill-white" />
                          ) : (
                            <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                          )}
                        </button>

                        {/* Timeline Progress Bar */}
                        <div className="flex-1 mx-3 h-1 bg-white/30 rounded-full relative overflow-hidden">
                          <div
                            className="h-full bg-[#635BFF] rounded-full transition-all duration-[300ms] ease-linear"
                            style={{
                              width: item.previewUrl
                                ? `${videoProgress[item.id] || 0}%`
                                : playingVideoId === item.id ? "100%" : "30%",
                            }}
                          />
                        </div>

                        <div className="flex items-center gap-3">
                          <Volume2 className="w-3.5 h-3.5 text-white hover:text-slate-200 transition-colors cursor-pointer" />
                          <Maximize className="w-3.5 h-3.5 text-white hover:text-slate-200 transition-colors cursor-pointer" />
                          <MoreVertical className="w-3.5 h-3.5 text-white hover:text-slate-200 transition-colors cursor-pointer" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="border border-[#0D9488] text-[#0D9488] bg-[#F0FDFA] px-2.5 py-0.5 rounded-full flex items-center justify-center">
                      Uploaded by: {item.uploadedBy}
                    </span>
                    {item.status === "Published" ? (
                      <span className="bg-[#DCFCE7] text-[#15803D] px-2.5 py-0.5 rounded-full flex items-center justify-center">
                        Published
                      </span>
                    ) : (
                      <span className="bg-[#FEF9C3] text-[#A16207] px-2.5 py-0.5 rounded-full flex items-center justify-center">
                        Not published
                      </span>
                    )}
                  </div>
                  <span className="text-[#94A3B8] font-medium">
                    Uploaded at {item.uploadedAt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-[#94A3B8] font-medium text-[13px] gap-2">
            <span>No media files found matching the criteria.</span>
            <button
              onClick={() => {
                setActiveMediaType("All Type");
                setActiveUsage("All Media");
                setSearchQuery("");
              }}
              className="text-[#635BFF] hover:underline font-bold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
