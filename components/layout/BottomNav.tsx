"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/lib/context/AppContext";
import { cn } from "@/lib/utils/cn";

export function BottomNav() {
  const pathname = usePathname();
  const { openRegistrationTypeModal } = useApp();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed bottom-0 inset-x-0 z-30 bg-white border-t border-gray-200 safe-area-pb">
      <div className="flex items-center justify-around px-1 py-2 max-w-md mx-auto">

        {/* הרשמה */}
        <button
          onClick={openRegistrationTypeModal}
          className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl active:bg-gray-50"
          aria-label="הרשמה חדשה"
        >
          <div className="w-9 h-9 rounded-full bg-rose-dust-400 flex items-center justify-center shadow-sm">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          <span className="text-xs font-medium text-rose-dust-500">הרשמה</span>
        </button>

        {/* השיעורים שלי */}
        <Link
          href="/my-classes"
          className={cn(
            "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl active:bg-gray-50",
            isActive("/my-classes") ? "text-rose-dust-500" : "text-gray-400"
          )}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isActive("/my-classes") ? 2.2 : 1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
          </svg>
          <span className="text-xs font-medium">השיעורים שלי</span>
        </Link>

        {/* התראות */}
        <Link
          href="/notifications"
          className={cn(
            "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl active:bg-gray-50 relative",
            isActive("/notifications") ? "text-rose-dust-500" : "text-gray-400"
          )}
        >
          <div className="relative">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isActive("/notifications") ? 2.2 : 1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>
            {/* Badge */}
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-dust-400 rounded-full text-white text-xs flex items-center justify-center font-bold">2</span>
          </div>
          <span className="text-xs font-medium">התראות</span>
        </Link>

        {/* בית */}
        <Link
          href="/"
          className={cn(
            "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl active:bg-gray-50",
            isActive("/") ? "text-rose-dust-500" : "text-gray-400"
          )}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isActive("/") ? 2.2 : 1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          <span className="text-xs font-medium">בית</span>
        </Link>

      </div>
    </nav>
  );
}
