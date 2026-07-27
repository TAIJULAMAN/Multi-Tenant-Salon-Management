"use client";

import { useState } from "react";
import Image from "next/image";
import { Users, Trash2, ChevronDown, Plus, X, Search, Check, Scissors, Droplet, Brush, Sparkles, ChevronRight } from "lucide-react";
import { services, categories, team } from "@/components/service/scheduleData";

interface ReviewAppointmentProps {
  onBack: () => void;
  onContinue: () => void;
  selectedServices?: number[];
  setSelectedServices?: (services: number[]) => void;
  isGroup?: boolean;
  participants?: { id: number, name: string, canDelete: boolean }[];
}

export default function ReviewAppointment({ onBack, onContinue, selectedServices = [], setSelectedServices, isGroup, participants = [] }: ReviewAppointmentProps) {
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [isChangeMemberOpen, setIsChangeMemberOpen] = useState(false);

  const [activeServiceIdForMember, setActiveServiceIdForMember] = useState<number | null>(null);
  const [serviceMembers, setServiceMembers] = useState<Record<number, string>>({});
  const [modalSelectedMember, setModalSelectedMember] = useState<string>("Any Professional");
  const [memberSearchQuery, setMemberSearchQuery] = useState("");

  const [modalSearchQuery, setModalSearchQuery] = useState("");
  const [modalSelectedCategory, setModalSelectedCategory] = useState("Featured");

  const filteredModalServices = services.filter((service) => {
    const matchesCategory = modalSelectedCategory === "Featured" || service.category === modalSelectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(modalSearchQuery.toLowerCase()) ||
      (service.description ? service.description.toLowerCase().includes(modalSearchQuery.toLowerCase()) : false);
    return matchesCategory && matchesSearch;
  });

  const toggleService = (id: number) => {
    if (setSelectedServices) {
      setSelectedServices(
        selectedServices.includes(id)
          ? selectedServices.filter(s => s !== id)
          : [...selectedServices, id]
      );
    }
  };

  const selectedServicesData = services.filter(s => selectedServices.includes(s.id));
  const subtotal = selectedServicesData.reduce((acc, curr) => acc + curr.price, 0);

  const multiplier = isGroup ? Math.max(1, participants.length) : 1;
  const groupSubtotal = subtotal * multiplier;

  const discount = groupSubtotal > 0 ? (isGroup ? 99 * multiplier : 99) : 0;
  const total = Math.max(0, groupSubtotal - discount);

  const removeService = (id: number) => {
    if (setSelectedServices) {
      setSelectedServices(selectedServices.filter(sId => sId !== id));
    }
  };

  return (
    <>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Basic Informations */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-[#1E293B] font-manrope">Basic Informations</h3>
            <span className="font-bold text-[#1E293B] font-manrope">#000</span>
          </div>

          <div className="mb-6">
            <p className="text-xs text-gray-400 font-manrope mb-2 uppercase tracking-wider">Client{isGroup && "s"}</p>
            <div className={`grid gap-3 ${isGroup ? 'grid-cols-1' : 'grid-cols-1'}`}>
              {isGroup && participants.length > 0 ? (
                participants.map(p => (
                  <div key={p.id} className="bg-[#F8F9FD] rounded-xl p-3 flex items-center gap-3 w-full">
                    <div className="w-10 h-10 rounded-full overflow-hidden relative bg-[#E0E7FF] flex items-center justify-center text-[#635BFF]">
                      {p.id === 1 ? (
                        <Image
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
                          alt={p.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <Users className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-[#1E293B] font-manrope text-sm leading-tight truncate">{p.id === 1 ? "Maria Fernandez" : p.name}</p>
                      <p className="text-gray-400 font-manrope text-xs truncate">{p.id === 1 ? "maria@gmail.com" : "Participant"}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-[#F8F9FD] rounded-xl p-3 flex items-center gap-3 w-full">
                  <div className="w-10 h-10 rounded-full overflow-hidden relative bg-gray-200">
                    <Image
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
                      alt="Client"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-[#1E293B] font-manrope text-sm leading-tight">Maria Fernandez</p>
                    <p className="text-gray-400 font-manrope text-xs">maria@gmail.com</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-6">
            <div>
              <p className="text-[11px] text-gray-400 font-manrope mb-1">Date</p>
              <p className="font-bold text-[#1E293B] font-manrope text-sm">17/12/2025</p>
            </div>
            <div>
              <p className="text-[11px] text-gray-400 font-manrope mb-1">Start Time</p>
              <p className="font-bold text-[#1E293B] font-manrope text-sm">11:00</p>
            </div>
            <div>
              <p className="text-[11px] text-gray-400 font-manrope mb-1">Duration</p>
              <p className="font-bold text-[#1E293B] font-manrope text-sm">2h - 3h</p>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-[#1E293B] font-manrope mb-4">Note</h3>
          <textarea
            placeholder="Add a note"
            className="w-full min-h-[120px] rounded-xl border border-gray-200 p-4 font-manrope text-sm text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#635BFF]/20 focus:border-[#635BFF] resize-none"
          ></textarea>
        </div>

        {/* Review Appointment */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-[#1E293B] font-manrope mb-6">Review Appointment</h3>

          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 mb-4 pb-4 border-b border-gray-100 text-[11px] font-bold text-gray-400 font-manrope">
            <div className="col-span-3">Service</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-1">Price</div>
            <div className="col-span-2">Start Time</div>
            <div className="col-span-1">Duration</div>
            <div className="col-span-2">Team Member</div>
            <div className="col-span-1 text-right"></div>
          </div>

          {/* Table Row */}
          {isGroup ? (
            participants.map((participant, pIdx) => (
              <div key={`participant-${participant.id}`} className="mb-8 last:mb-0">
                <h4 className="font-bold text-[#1E293B] font-manrope text-sm mb-4 pb-2 border-b border-gray-100">{participant.name}</h4>
                {selectedServicesData.length > 0 ? selectedServicesData.map(service => (
                  <div key={`p${participant.id}-s${service.id}`} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center mb-6 pb-6 border-b border-gray-100 last:border-0 last:pb-0 last:mb-0">
                    <div className="col-span-3">
                      <p className="font-bold text-[#1E293B] font-manrope text-sm mb-1">{service.name}</p>
                      <p className="text-xs text-gray-400 font-manrope line-clamp-2">{service.description}</p>
                    </div>
                    <div className="col-span-2 md:block flex justify-between">
                      <span className="md:hidden text-xs text-gray-400 font-manrope">Date:</span>
                      <p className="font-manrope text-sm text-[#1E293B]">17/12/2025</p>
                    </div>
                    <div className="col-span-1 md:block flex justify-between">
                      <span className="md:hidden text-xs text-gray-400 font-manrope">Price:</span>
                      <p className="font-manrope text-sm text-[#1E293B]">€ {service.price}</p>
                    </div>
                    <div className="col-span-2 md:block flex justify-between">
                      <span className="md:hidden text-xs text-gray-400 font-manrope">Start Time:</span>
                      <p className="font-manrope text-sm text-[#1E293B]">11:00</p>
                    </div>
                    <div className="col-span-1 md:block flex justify-between">
                      <span className="md:hidden text-xs text-gray-400 font-manrope">Duration:</span>
                      <p className="font-manrope text-sm text-[#1E293B]">{service.duration}</p>
                    </div>
                    <div className="col-span-2">
                      <button
                        onClick={() => {
                          setActiveServiceIdForMember(service.id);
                          // For group, we technically should track per participant per service, but reusing existing logic for demo:
                          setModalSelectedMember(serviceMembers[service.id] || "Any Professional");
                          setIsChangeMemberOpen(true);
                        }}
                        className="flex items-center justify-between w-full bg-[#F4F3FF] hover:bg-[#EAE8FF] transition-colors rounded-xl px-3 py-2"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-[#E0E7FF] flex items-center justify-center overflow-hidden relative">
                            {serviceMembers[service.id] && serviceMembers[service.id] !== "Any Professional" ? (
                              <Image
                                src={team.find(t => t.name === serviceMembers[service.id])?.image || ""}
                                alt={serviceMembers[service.id]}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <Users className="w-3 h-3 text-[#635BFF]" />
                            )}
                          </div>
                          <span className="font-manrope font-semibold text-[11px] text-[#1E293B] truncate max-w-[80px]">
                            {serviceMembers[service.id] ? serviceMembers[service.id].replace('\n', ' ') : "Any Professional"}
                          </span>
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      </button>
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <button onClick={() => removeService(service.id)} className="text-red-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )) : (
                  <p className="text-[#64748B] font-manrope text-center py-4">No services selected.</p>
                )}
              </div>
            ))
          ) : (
            selectedServicesData.length > 0 ? selectedServicesData.map(service => (
              <div key={service.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center mb-6 pb-6 border-b border-gray-100">
                <div className="col-span-3">
                  <p className="font-bold text-[#1E293B] font-manrope text-sm mb-1">{service.name}</p>
                  <p className="text-xs text-gray-400 font-manrope line-clamp-2">{service.description}</p>
                </div>
                <div className="col-span-2 md:block flex justify-between">
                  <span className="md:hidden text-xs text-gray-400 font-manrope">Date:</span>
                  <p className="font-manrope text-sm text-[#1E293B]">17/12/2025</p>
                </div>
                <div className="col-span-1 md:block flex justify-between">
                  <span className="md:hidden text-xs text-gray-400 font-manrope">Price:</span>
                  <p className="font-manrope text-sm text-[#1E293B]">€ {service.price}</p>
                </div>
                <div className="col-span-2 md:block flex justify-between">
                  <span className="md:hidden text-xs text-gray-400 font-manrope">Start Time:</span>
                  <p className="font-manrope text-sm text-[#1E293B]">11:00</p>
                </div>
                <div className="col-span-1 md:block flex justify-between">
                  <span className="md:hidden text-xs text-gray-400 font-manrope">Duration:</span>
                  <p className="font-manrope text-sm text-[#1E293B]">{service.duration}</p>
                </div>
                <div className="col-span-2">
                  <button
                    onClick={() => {
                      setActiveServiceIdForMember(service.id);
                      setModalSelectedMember(serviceMembers[service.id] || "Any Professional");
                      setIsChangeMemberOpen(true);
                    }}
                    className="flex items-center justify-between w-full bg-[#F4F3FF] hover:bg-[#EAE8FF] transition-colors rounded-xl px-3 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#E0E7FF] flex items-center justify-center overflow-hidden relative">
                        {serviceMembers[service.id] && serviceMembers[service.id] !== "Any Professional" ? (
                          <Image
                            src={team.find(t => t.name === serviceMembers[service.id])?.image || ""}
                            alt={serviceMembers[service.id]}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <Users className="w-3 h-3 text-[#635BFF]" />
                        )}
                      </div>
                      <span className="font-manrope font-semibold text-[11px] text-[#1E293B] truncate max-w-[80px]">
                        {serviceMembers[service.id] ? serviceMembers[service.id].replace('\n', ' ') : "Any Professional"}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  </button>
                </div>
                <div className="col-span-1 flex justify-end">
                  <button onClick={() => removeService(service.id)} className="text-red-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )) : (
              <p className="text-[#64748B] font-manrope text-center py-4">No services selected.</p>
            )
          )}

          {/* Add Service Button */}
          <div className="mb-8">
            <button
              onClick={() => setIsAddServiceOpen(true)}
              className="flex items-center gap-2 text-[#635BFF] bg-[#F4F3FF] hover:bg-[#EAE8FF] transition-colors px-4 py-2.5 rounded-xl font-manrope font-bold text-xs"
            >
              <Plus className="w-4 h-4" />
              Add Service
            </button>
          </div>

          {/* Order Summary Box */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 w-full">
            <h4 className="font-bold text-[#1E293B] font-manrope mb-4">Order Summary</h4>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center text-sm font-manrope">
                <span className="text-gray-500">Tax</span>
                <span className="font-medium text-[#1E293B]">0</span>
              </div>
              <div className="flex justify-between items-center text-sm font-manrope">
                <span className="text-gray-500">Discount</span>
                <span className="font-medium text-[#10B981]">€ {discount}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <span className="font-bold text-[#1E293B] font-manrope text-lg">Total</span>
              <span className="font-bold text-[#1E293B] font-manrope text-xl">€ {total}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-4">
          <button
            onClick={onBack}
            className="px-6 py-3 rounded-xl border border-gray-200 font-bold font-manrope text-sm text-[#1E293B] hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            onClick={onContinue}
            className="px-8 py-3 rounded-xl bg-[#635BFF] text-white font-bold font-manrope text-sm hover:bg-[#534dfd] transition-all shadow-xl shadow-[#635BFF]/30"
          >
            Continue
          </button>
        </div>
      </div>

      {/* Add Service Modal Overlay */}
      {isAddServiceOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-[700px] max-h-[90vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">

            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 pb-4">
              <h2 className="text-xl font-bold text-[#1E293B] font-manrope">Add Service</h2>
              <button
                onClick={() => setIsAddServiceOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 flex flex-col gap-5 overflow-hidden flex-1 pb-6">

              {/* Categories */}
              <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setModalSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full font-manrope font-semibold text-xs whitespace-nowrap flex-shrink-0 transition-colors ${modalSelectedCategory === category
                        ? "bg-[#EEEDFF] text-[#635BFF]"
                        : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search"
                  value={modalSearchQuery}
                  onChange={(e) => setModalSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white font-manrope text-sm text-[#1E293B] placeholder-gray-400 focus:outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition-colors"
                />
              </div>

              {/* Service List */}
              <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">

                {filteredModalServices.length > 0 ? filteredModalServices.map(service => {
                  const isSelected = selectedServices.includes(service.id);
                  return (
                    <div
                      key={service.id}
                      onClick={() => toggleService(service.id)}
                      className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${isSelected
                          ? "border-2 border-[#635BFF] bg-[#F8F7FF]"
                          : "border-gray-200 hover:border-[#635BFF]/30 hover:bg-gray-50"
                        }`}
                    >
                      <div className={`flex-shrink-0 flex items-center justify-center w-5 h-5 rounded border ${isSelected ? "border-[#635BFF] bg-[#635BFF] text-white" : "border-gray-300"
                        }`}>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>

                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#E0E7FF] flex items-center justify-center text-[#635BFF] overflow-hidden relative">
                        <Image src={service.image} alt={service.name} fill className="object-cover" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-[#1E293B] font-manrope text-sm truncate">{service.name}</p>
                        <p className="text-xs text-gray-500 font-manrope truncate">{service.duration} {service.description && `• ${service.description}`}</p>
                      </div>

                      <div className="flex-shrink-0 flex items-center gap-3">
                        <span className="font-manrope font-bold text-[#635BFF]">€ {service.price}</span>
                        <span className="text-[10px] font-bold text-[#10B981] bg-[#10B981]/10 px-2 py-1 rounded-md whitespace-nowrap">{service.discount || "Save up to 10%"}</span>
                      </div>
                    </div>
                  );
                }) : (
                  <p className="text-center text-gray-400 font-manrope py-8 text-sm">No services found.</p>
                )}

              </div>

              {/* Modal Footer Actions */}
              <div className="flex justify-end pt-2 mt-2">
                <button
                  onClick={() => setIsAddServiceOpen(false)}
                  className="px-6 py-3 rounded-xl bg-[#635BFF] text-white font-bold font-manrope text-sm hover:bg-[#534dfd] transition-all shadow-lg shadow-[#635BFF]/20"
                >
                  Add Service
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Change Member Modal */}
      {isChangeMemberOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-[600px] shadow-2xl flex flex-col max-h-[90vh]">

            {/* Header */}
            <div className="flex items-center justify-between p-6 pb-4">
              <h3 className="font-bold text-[#1E293B] font-manrope text-lg">Change Member</h3>
              <button
                onClick={() => setIsChangeMemberOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 pt-2 flex-1 overflow-y-auto custom-scrollbar">

              {/* Search */}
              <div className="relative mb-6">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  value={memberSearchQuery}
                  onChange={(e) => setMemberSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 font-manrope text-sm focus:outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition-colors"
                />
              </div>

              {/* Select Professional */}
              <div>
                <h4 className="font-bold text-[#1E293B] font-manrope text-sm mb-4">Select Professional</h4>
                <div className="space-y-3">

                  {/* Any Professional */}
                  {("Any Professional".toLowerCase().includes(memberSearchQuery.toLowerCase())) && (
                    <div
                      onClick={() => setModalSelectedMember("Any Professional")}
                      className={`flex items-center justify-between p-4 rounded-2xl border transition-colors cursor-pointer group ${modalSelectedMember === "Any Professional" ? "border-[#635BFF] bg-[#F4F3FF]" : "border-gray-100 hover:border-[#635BFF]"
                        }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#EEEDFF] flex items-center justify-center relative">
                          {modalSelectedMember === "Any Professional" && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#635BFF] rounded-full flex items-center justify-center border-2 border-white">
                              <Check className="w-2.5 h-2.5 text-white" />
                            </div>
                          )}
                          <Users className="w-6 h-6 text-[#635BFF]" />
                        </div>
                        <span className="font-bold text-[#1E293B] font-manrope text-sm">Any Professional</span>
                      </div>
                    </div>
                  )}

                  {/* Team Members */}
                  {team.filter(t => t.name.toLowerCase().includes(memberSearchQuery.toLowerCase())).map((member, idx) => (
                    <div
                      key={idx}
                      onClick={() => setModalSelectedMember(member.name)}
                      className={`flex items-center justify-between p-4 rounded-2xl border transition-colors cursor-pointer group ${modalSelectedMember === member.name ? "border-[#635BFF] bg-[#F4F3FF]" : "border-gray-100 hover:border-[#635BFF]"
                        }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden relative bg-gray-200">
                          {modalSelectedMember === member.name && (
                            <div className="absolute top-0 right-0 z-10 w-4 h-4 bg-[#635BFF] rounded-bl-xl flex items-center justify-center">
                              <Check className="w-2.5 h-2.5 text-white" />
                            </div>
                          )}
                          <Image src={member.image} alt={member.name} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-[#1E293B] font-manrope text-sm">{member.name}</p>
                          <p className="text-xs text-gray-400 font-manrope">{member.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="p-6 pt-4 flex justify-end">
              <button
                onClick={() => {
                  if (activeServiceIdForMember !== null) {
                    setServiceMembers(prev => ({
                      ...prev,
                      [activeServiceIdForMember]: modalSelectedMember
                    }));
                  }
                  setIsChangeMemberOpen(false);
                }}
                className="px-6 py-2.5 bg-[#635BFF] hover:bg-[#534dfd] text-white font-bold font-manrope text-sm rounded-xl transition-colors shadow-lg shadow-[#635BFF]/20"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
