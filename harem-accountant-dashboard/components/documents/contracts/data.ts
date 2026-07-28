export interface Contract {
  id: string;
  employee: {
    name: string;
    avatar: string;
  };
  salon: {
    name: string;
    logo: string;
  };
  type: "Full Time" | "Part Time" | "Vat collaboration" | "Stage";
  startDate: string;
  endDate: string;
  status: "Active" | "Inactive" | "Pending";
}

export const mockContracts: Contract[] = [
  {
    id: "1",
    employee: { name: "Maria Rodriguez", avatar: "https://i.pravatar.cc/150?u=maria1" },
    salon: { name: "Chic Hair & Beauty", logo: "https://ui-avatars.com/api/?name=Chic+Hair&background=8b5cf6&color=fff" },
    type: "Full Time",
    startDate: "Jan 14, 2024",
    endDate: "Dec 30, 2025",
    status: "Active"
  },
  {
    id: "2",
    employee: { name: "Maria Rodriguez", avatar: "https://i.pravatar.cc/150?u=maria2" },
    salon: { name: "Style Studio", logo: "https://ui-avatars.com/api/?name=Style+Studio&background=6366f1&color=fff" },
    type: "Part Time",
    startDate: "Jan 14, 2024",
    endDate: "Dec 30, 2025",
    status: "Inactive"
  },
  {
    id: "3",
    employee: { name: "Maria Rodriguez", avatar: "https://i.pravatar.cc/150?u=maria3" },
    salon: { name: "Style Studio", logo: "https://ui-avatars.com/api/?name=Style+Studio&background=6366f1&color=fff" },
    type: "Part Time",
    startDate: "Jan 14, 2024",
    endDate: "Dec 30, 2025",
    status: "Pending"
  },
  {
    id: "4",
    employee: { name: "Maria Rodriguez", avatar: "https://i.pravatar.cc/150?u=maria4" },
    salon: { name: "Chic Hair & Beauty", logo: "https://ui-avatars.com/api/?name=Chic+Hair&background=8b5cf6&color=fff" },
    type: "Vat collaboration",
    startDate: "Jan 14, 2024",
    endDate: "Dec 30, 2025",
    status: "Active"
  },
  {
    id: "5",
    employee: { name: "Maria Rodriguez", avatar: "https://i.pravatar.cc/150?u=maria5" },
    salon: { name: "Chic Hair & Beauty", logo: "https://ui-avatars.com/api/?name=Chic+Hair&background=8b5cf6&color=fff" },
    type: "Stage",
    startDate: "Jan 14, 2024",
    endDate: "Dec 30, 2025",
    status: "Active"
  },
  {
    id: "6",
    employee: { name: "Maria Rodriguez", avatar: "https://i.pravatar.cc/150?u=maria1" },
    salon: { name: "Chic Hair & Beauty", logo: "https://ui-avatars.com/api/?name=Chic+Hair&background=8b5cf6&color=fff" },
    type: "Full Time",
    startDate: "Feb 01, 2024",
    endDate: "Jan 31, 2026",
    status: "Active"
  }
];

export const metricData = {
  activeContracts: 18,
  expiringSoon: 3,
  expired: 2
};
