"use client";
import Link from "next/link";
import { ArtClass } from "@/lib/types";
import { useApp } from "@/lib/context/AppContext";
import { StatusBadge, BadgeVariant } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { getAvailableSpots } from "@/lib/utils/status";
import { cn } from "@/lib/utils/cn";

interface ClassCardProps {
  cls: ArtClass;
}

export function ClassCard({ cls }: ClassCardProps) {
  const {
    getRegStatus,
    register,
    openCancelModal,
    joinWaitlist,
    user,
  } = useApp();

  const regStatus = getRegStatus(cls.id);
  const spots = getAvailableSpots(cls);
  const isFull = spots === 0;
  const isCanceled = cls.status === "canceled";

  // Determine the primary status badge
  function getBadgeVariant(): BadgeVariant {
    if (isCanceled) return "canceled";
    if (regStatus === "registered") return "registered";
    if (regStatus === "waitlist") return "waitlist-registered";
    if (isFull) return "waitlist-available";
    // Not registered, spots available
    if (user.hasSubscription) return "available-subscription";
    if (cls.singleRegistrationEnabled) return "available-single";
    return "full"; // no valid registration path
  }

  const isRegistered = regStatus === "registered";
  const isWaitlist = regStatus === "waitlist";
  const canRegisterGroup = !isCanceled && regStatus === "none" && !isFull && (user.hasSubscription || cls.singleRegistrationEnabled);
  const canWaitlist = !isCanceled && regStatus === "none" && isFull;

  function handleRegister() {
    const type = user.hasSubscription ? "subscription" : "single";
    register(cls.id, type);
  }

  return (
    <div
      className={cn(
        "rounded-2xl border overflow-hidden transition-all",
        isRegistered && "border-rose-dust-200 bg-rose-dust-50",
        isWaitlist && "border-amber-100 bg-amber-50/30",
        isCanceled && "border-gray-100 bg-gray-50 opacity-70",
        !isRegistered && !isWaitlist && !isCanceled && "border-gray-200 bg-white"
      )}
    >
      <Link href={`/class/${cls.id}`} className="block">
        <div className="flex items-start gap-3 p-4">
          {/* Time column */}
          <div className="text-right shrink-0 pt-0.5">
            <p className={cn(
              "text-xl font-bold leading-none",
              isRegistered ? "text-rose-dust-500" : "text-charcoal"
            )}>
              {cls.startTime}
            </p>
            <p className="text-xs text-gray-400 mt-1">{cls.duration} דק׳</p>
          </div>

          {/* Divider */}
          <div className={cn(
            "w-px self-stretch mx-1 rounded-full",
            isRegistered ? "bg-rose-dust-200" : "bg-gray-200"
          )} />

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-charcoal leading-snug">{cls.title}</h3>

            {/* Badge */}
            <div className="mt-1.5">
              <StatusBadge variant={getBadgeVariant()} />
            </div>

            {/* Meta row */}
            <div className="flex items-center gap-3 mt-2">
              {/* Capacity */}
              {!isCanceled && (
                <div className="flex items-center gap-1 text-sm text-gray-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                  </svg>
                  <span>
                    {cls.registeredCount}/{cls.capacity}
                    {!isFull && spots <= 3 && (
                      <span className="text-orange-500 font-medium"> · נותרו {spots}</span>
                    )}
                  </span>
                </div>
              )}
              {/* Teacher */}
              <div className="flex items-center gap-1 text-sm text-gray-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                <span className="truncate">{cls.teacher.name}</span>
              </div>
            </div>

            {/* Full warning */}
            {isFull && !isCanceled && regStatus === "none" && (
              <p className="text-xs text-orange-600 font-medium mt-1">שיעור מלא</p>
            )}
          </div>
        </div>
      </Link>

      {/* Action buttons */}
      {!isCanceled && (
        <div className="px-4 pb-4">
          {isRegistered && (
            <Button
              variant="secondary"
              size="md"
              fullWidth
              onClick={(e) => { e.stopPropagation(); openCancelModal(cls.id); }}
            >
              ביטול הרשמה
            </Button>
          )}
          {canRegisterGroup && (
            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={(e) => { e.stopPropagation(); handleRegister(); }}
            >
              להירשם לשיעור
            </Button>
          )}
          {canWaitlist && !isWaitlist && (
            <Button
              variant="outline"
              size="md"
              fullWidth
              onClick={(e) => { e.stopPropagation(); joinWaitlist(cls.id); }}
            >
              להצטרף לרשימת המתנה
            </Button>
          )}
          {isWaitlist && (
            <p className="text-sm text-amber-700 text-center py-1">
              אם תתפנה מקום — נעדכן אותך מיד
            </p>
          )}
        </div>
      )}
    </div>
  );
}
