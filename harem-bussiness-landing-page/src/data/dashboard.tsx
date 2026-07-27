import { Calendar, Users, UserCheck } from "lucide-react";
import React from "react";

export const statCardsDemoData = [
  {
    id: 1,
    title: "Monthly Sales",
    value: "€ 23,850",
    change: "+12.5% from last month",
    icon: <span className="font-bold text-lg">€</span>,
    iconBgColor: "bg-gradient-to-br from-[#7B74FF] to-[#635BFF]",
    iconShadowColor: "shadow-[#635BFF]/30",
    cardStyle: "bg-gradient-to-br from-[#635BFF]/10 to-white",
  },
  {
    id: 2,
    title: "Appointments",
    value: "23",
    change: "+18.5% from last month",
    icon: <Calendar className="w-5 h-5" />,
    iconBgColor: "bg-gradient-to-br from-[#FBBF24] to-[#F8C209]",
    iconShadowColor: "shadow-[#F8C209]/30",
    cardStyle: "bg-gradient-to-br from-[#FBBF24]/10 to-white",
  },
  {
    id: 3,
    title: "Clients",
    value: "44",
    change: "+10% from last month",
    icon: <Users className="w-5 h-5" />,
    iconBgColor: "bg-gradient-to-br from-[#2DD4BF] to-[#16CDC7]",
    iconShadowColor: "shadow-[#16CDC7]/30",
    cardStyle: "bg-gradient-to-br from-[#2DD4BF]/10 to-white",
  },
];
