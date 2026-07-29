export interface StaffMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  isSuspended?: boolean;
}

export let mockMembers: StaffMember[] = [
  {
    id: "1",
    name: "Leslie Alexander",
    role: "Senior Stylist",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "2",
    name: "Jane Cooper",
    role: "Senior Stylist",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "3",
    name: "Cameron Williamson",
    role: "Junior Stylist",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "4",
    name: "Eleanor Pena",
    role: "Senior Stylist",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "5",
    name: "Guy Hawkins",
    role: "Junior Stylist",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "6",
    name: "Kristin Watson",
    role: "Senior Stylist",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "7",
    name: "Courtney Henry",
    role: "Junior Stylist",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "8",
    name: "Albert Flores",
    role: "Senior Stylist",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&q=80",
  },
];

const listeners = new Set<() => void>();

export const staffStore = {
  getMembers() {
    return mockMembers;
  },
  addMember(member: Omit<StaffMember, "id">) {
    const newMember = {
      ...member,
      id: String(mockMembers.length + 1),
    };
    mockMembers = [...mockMembers, newMember];
    listeners.forEach((l) => l());
    return newMember;
  },
  toggleSuspend(id: string) {
    mockMembers = mockMembers.map((m) =>
      m.id === id ? { ...m, isSuspended: !m.isSuspended } : m
    );
    listeners.forEach((l) => l());
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};
