"use client";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { BottomNav } from "./BottomNav";
import { RegistrationTypeModal } from "@/components/modals/RegistrationTypeModal";
import { CancelConfirmModal } from "@/components/modals/CancelConfirmModal";
import { SuccessModal } from "@/components/modals/SuccessModal";
import { useApp } from "@/lib/context/AppContext";

const NO_HEADER_ROUTES = ["/schedule", "/class/", "/terms", "/admin"];
const NO_NAV_ROUTES = ["/admin"];

export function AppShell({ children }: { children: ReactNode }) {
  const { showRegistrationTypeModal, cancelTargetId, successInfo } = useApp();
  const pathname = usePathname();

  const showHeader = !NO_HEADER_ROUTES.some((r) => pathname.startsWith(r));
  const showNav = !NO_NAV_ROUTES.some((r) => pathname.startsWith(r));

  return (
    <div className="min-h-screen bg-cream font-heebo">
      {showHeader && <Header />}
      <main className={`max-w-md mx-auto ${showNav ? "pb-24" : "pb-0"}`}>
        {children}
      </main>
      {showNav && <BottomNav />}

      {showRegistrationTypeModal && <RegistrationTypeModal />}
      {cancelTargetId && <CancelConfirmModal classId={cancelTargetId} />}
      {successInfo && <SuccessModal />}
    </div>
  );
}
