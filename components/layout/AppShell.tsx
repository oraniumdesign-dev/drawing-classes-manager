"use client";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { BottomNav } from "./BottomNav";
import { RegistrationTypeModal } from "@/components/modals/RegistrationTypeModal";
import { CancelConfirmModal } from "@/components/modals/CancelConfirmModal";
import { SuccessModal } from "@/components/modals/SuccessModal";
import { useApp } from "@/lib/context/AppContext";

// These pages manage their own header
const NO_HEADER_ROUTES = ["/schedule", "/class/"];

export function AppShell({ children }: { children: ReactNode }) {
  const { showRegistrationTypeModal, cancelTargetId, successInfo } = useApp();
  const pathname = usePathname();

  const showHeader = !NO_HEADER_ROUTES.some((r) => pathname.startsWith(r));

  return (
    <div className="min-h-screen bg-cream font-heebo">
      {showHeader && <Header />}
      <main className={`max-w-md mx-auto ${showHeader ? "pb-24" : "pb-0"}`}>
        {children}
      </main>
      <BottomNav />

      {showRegistrationTypeModal && <RegistrationTypeModal />}
      {cancelTargetId && <CancelConfirmModal classId={cancelTargetId} />}
      {successInfo && <SuccessModal />}
    </div>
  );
}
