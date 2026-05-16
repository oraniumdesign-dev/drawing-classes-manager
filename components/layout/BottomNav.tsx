"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/lib/context/AppContext";
import { cn } from "@/lib/utils/cn";

export function BottomNav() {
  const pathname = usePathname();
  const { openRegistrationTypeModal } = useApp();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-30 bg-white border-t border-gray-200 safe-area-pb">
      <div className="flex items-center justify-around px-2 py-2 max-w-md mx-auto">
        {/* הרשמה — triggers modal */}
        <button
          onClick={openRegistrationTypeModal}
          className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl active:bg-gray-50"
          aria-label="הרשמה חדשה"
        >
          <div className="w-10 h-10 rounded-full bg-rose-dust-400 flex items-center justify-center shadow-sm">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
          <span className="text-xs font-medium text-rose-dust-500">הרשמה</span>
        </button>

        {/* השיעורים שלי */}
        <Link
          href="/my-classes"
          className={cn(
            "flex flex-col items-center gap-1 px-4 py-2 rounded-xl active:bg-gray-50",
            pathname === "/my-classes" ? "text-rose-dust-500" : "text-gray-400"
          )}
          aria-label="השיעורים שלי"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={pathname === "/my-classes" ? 2.2 : 1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
            />
          </svg>
          <span className="text-xs font-medium">השיעורים שלי</span>
        </Link>

        {/* בית */}
        <Link
          href="/"
          className={cn(
            "flex flex-col items-center gap-1 px-4 py-2 rounded-xl active:bg-gray-50",
            pathname === "/" ? "text-rose-dust-500" : "text-gray-400"
          )}
          aria-label="בית"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={pathname === "/" ? 2.2 : 1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          <span className="text-xs font-medium">בית</span>
        </Link>
      </div>
    </nav>
  );
}
