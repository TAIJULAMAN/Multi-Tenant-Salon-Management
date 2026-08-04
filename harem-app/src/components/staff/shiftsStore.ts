export interface Shift {
  id: string;
  memberName: string;
  memberRole: string;
  avatar: string;
  dateStr: string; // Format: YYYY-MM-DD
  startTime: string; // Format: HH:MM
  endTime: string; // Format: HH:MM
  weeklyTotal: string;
  isRecurring?: boolean;
  repeatWeeks?: number;
  selectedDays?: string[]; // e.g. ["Mon", "Tue"]
}

let mockShifts: Shift[] = [
  {
    id: "s1",
    memberName: "Maria Rodriguez",
    memberRole: "Staff",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80",
    dateStr: "2024-08-11", // Monday
    startTime: "10:00",
    endTime: "19:00",
    weeklyTotal: "52h",
  },
  {
    id: "s2",
    memberName: "Alex Miller",
    memberRole: "Staff",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
    dateStr: "2024-08-11", // Monday
    startTime: "10:00",
    endTime: "19:00",
    weeklyTotal: "40h",
  },
  {
    id: "s3",
    memberName: "Maria Rodriguez",
    memberRole: "Staff",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80",
    dateStr: "2024-08-12", // Tuesday
    startTime: "10:00",
    endTime: "19:00",
    weeklyTotal: "52h",
  },
  {
    id: "s4",
    memberName: "Jordan Smith",
    memberRole: "Staff",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
    dateStr: "2024-08-14", // Thursday
    startTime: "10:00",
    endTime: "19:00",
    weeklyTotal: "35h",
  },
];

const listeners = new Set<() => void>();

export const shiftsStore = {
  getShifts() {
    return mockShifts;
  },
  addShift(shift: Omit<Shift, "id">) {
    const newShift = {
      ...shift,
      id: String(Date.now() + Math.random()),
    };
    mockShifts = [...mockShifts, newShift];
    listeners.forEach((l) => l());
    return newShift;
  },
  updateShift(updated: Shift) {
    mockShifts = mockShifts.map((s) => (s.id === updated.id ? updated : s));
    listeners.forEach((l) => l());
  },
  deleteShift(id: string) {
    mockShifts = mockShifts.filter((s) => s.id !== id);
    listeners.forEach((l) => l());
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};
