export type AllergyColor = "yellow" | "purple" | "pink";

export interface ClientData {
  id: string;
  name: string;
  email: string;
  telephone: string;
  lastAppointment: string;
  allergy: {
    name: string;
    color: AllergyColor;
  };
  createdAt: string;
  avatarUrl: string;
  avatarBg: string;
}

const generateMockClients = (): ClientData[] => {
  const clients: ClientData[] = [];
  const colors: AllergyColor[] = ["yellow", "purple", "pink"];
  const bgs = ["bg-[#FCE7F3]", "bg-[#E2E8F0]", "bg-[#CCFBF1]", "bg-[#FEE2E2]", "bg-[#E0E7FF]"];
  
  for (let i = 1; i <= 25; i++) {
    clients.push({
      id: `client_${i}`,
      name: "Maria Rodriguez",
      email: "maria@beautywellness.com",
      telephone: "+39 345 678 9123",
      lastAppointment: "02/09/2025",
      allergy: {
        name: "Fragrances Allergie",
        color: colors[i % 3] as AllergyColor
      },
      createdAt: "08/08/2024",
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=Maria${i}&backgroundColor=transparent`,
      avatarBg: bgs[i % 5]
    });
  }
  return clients;
};

export const dummyClientsData = generateMockClients();
