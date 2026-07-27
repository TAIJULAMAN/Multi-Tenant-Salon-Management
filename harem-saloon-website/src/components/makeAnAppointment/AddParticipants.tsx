import { useState } from "react";
import { User, MoreVertical, Plus, Edit2, Trash2, X } from "lucide-react";

interface AddParticipantsProps {
  onBack: () => void;
  onContinue: () => void;
  participants: { id: number, name: string, canDelete: boolean }[];
  setParticipants: (participants: { id: number, name: string, canDelete: boolean }[]) => void;
}

export default function AddParticipants({ onBack, onContinue, participants, setParticipants }: AddParticipantsProps) {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingParticipant, setEditingParticipant] = useState<{id: number, name: string, canDelete: boolean} | null>(null);
  const [newName, setNewName] = useState("");

  const handleAddClick = () => {
    setEditingParticipant(null);
    setNewName("");
    setIsModalOpen(true);
  };

  const handleEditClick = (participant: any) => {
    setEditingParticipant(participant);
    setNewName(participant.name);
    setIsModalOpen(true);
    setActiveDropdown(null);
  };

  const handleDeleteClick = (id: number) => {
    setParticipants(participants.filter(p => p.id !== id));
    setActiveDropdown(null);
  };

  const handleSaveParticipant = () => {
    if (!newName.trim()) return;

    if (editingParticipant) {
      setParticipants(participants.map(p => 
        p.id === editingParticipant.id ? { ...p, name: newName } : p
      ));
    } else {
      const newId = participants.length > 0 ? Math.max(...participants.map(p => p.id)) + 1 : 1;
      setParticipants([...participants, { id: newId, name: newName, canDelete: true }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-3">
        {participants.map((participant) => (
          <div
            key={participant.id}
            className={`relative flex items-center justify-between p-4 rounded-2xl border ${
              participant.id === 1 ? "bg-gray-50 border-gray-100" : "bg-white border-gray-100 shadow-sm"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#Eef0ff] flex items-center justify-center text-[#635BFF]">
                <User className="w-5 h-5" />
              </div>
              <span className="font-bold text-[#1E293B] font-manrope">
                {participant.name}
              </span>
            </div>

            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === participant.id ? null : participant.id)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2"
              >
                <MoreVertical className="w-5 h-5" />
              </button>

              {activeDropdown === participant.id && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 py-2 z-10">
                  <button 
                    onClick={() => handleEditClick(participant)}
                    className="w-full text-left px-4 py-2.5 text-sm font-manrope text-gray-600 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                  >
                    <Edit2 className="w-4 h-4 text-[#635BFF]" /> 
                    <span className="font-medium">Edit Participant</span>
                  </button>
                  {participant.canDelete && (
                    <button 
                      onClick={() => handleDeleteClick(participant.id)}
                      className="w-full text-left px-4 py-2.5 text-sm font-manrope text-red-500 hover:bg-red-50 flex items-center gap-3 transition-colors mt-1"
                    >
                      <Trash2 className="w-4 h-4" /> 
                      <span className="font-medium">Delete Participant</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        <button 
          onClick={handleAddClick}
          className="flex items-center gap-2 text-[#635BFF] border border-[#635BFF] rounded-xl px-5 py-3 hover:bg-[#635BFF]/5 transition-colors font-manrope font-semibold text-sm mt-4"
        >
          <Plus className="w-4 h-4" />
          Add Participant
        </button>
      </div>

      <div className="mt-12 flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-gray-500 font-bold font-manrope text-sm hover:text-gray-700 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onContinue}
          className="bg-[#635BFF] text-white px-8 py-3.5 rounded-xl font-bold font-manrope text-sm hover:bg-[#534dfd] transition-all shadow-xl shadow-[#635BFF]/30"
        >
          Continue
        </button>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl flex flex-col p-6 relative animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-50"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-xl font-bold text-[#1E293B] font-manrope mb-6 pr-8">
              {editingParticipant ? "Edit Participant" : "Add Participant"}
            </h3>

            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-sm font-bold text-[#1E293B] font-manrope mb-2">
                  Participant Name
                </label>
                <input 
                  type="text" 
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#635BFF]/20 focus:border-[#635BFF] transition-all font-manrope"
                  placeholder="Enter participant's name"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveParticipant();
                  }}
                />
              </div>
            </div>

            <button 
              onClick={handleSaveParticipant}
              className="w-full bg-[#635BFF] text-white py-3.5 rounded-xl font-bold font-manrope text-sm hover:bg-[#534dfd] transition-all shadow-xl shadow-[#635BFF]/30"
            >
              Save Participant
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
