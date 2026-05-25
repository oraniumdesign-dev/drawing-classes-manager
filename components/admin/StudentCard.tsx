"use client";
import { useState } from "react";
import type { User } from "@/lib/types";

interface Props {
  user: User;
}

export function StudentCard({ user }: Props) {
  const [copied, setCopied] = useState(false);

  const appUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://drawing-classes-manager.vercel.app";

  const link = `${appUrl}/?t=${user.token}`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: select the text
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
      <div className="p-4">
        {/* Name + subscription badge */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-base font-bold text-charcoal">{user.name}</p>
            <p className="text-sm text-gray-500 mt-0.5">{user.phone}</p>
          </div>
          <span
            className={
              user.hasSubscription
                ? "text-xs font-semibold px-2.5 py-1 rounded-full bg-sage-100 text-sage-600 shrink-0"
                : "text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 shrink-0"
            }
          >
            {user.hasSubscription ? "מנויה" : "שיעורים בודדים"}
          </span>
        </div>

        {/* Link row */}
        <div className="mt-3 flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
          <p className="flex-1 text-xs text-gray-500 truncate font-mono" dir="ltr">
            {link}
          </p>
          <button
            onClick={handleCopy}
            className="shrink-0 flex items-center gap-1 text-xs font-semibold text-rose-dust-500 hover:text-rose-dust-600 active:scale-95 transition-all"
          >
            {copied ? (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                הועתק
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                </svg>
                העתק
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
