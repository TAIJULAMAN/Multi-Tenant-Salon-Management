import Header from "@/components/saloonOwner/common/Header";
import Sidebar from "@/components/saloonOwner/common/Sidebar";
import { SidebarProvider } from "@/components/saloonOwner/common/SidebarContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-[100dvh] bg-[#F3F4F7] font-manrope">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
