import { cn } from "@/lib/utils/cn";

export type BadgeVariant =
  | "registered"
  | "waitlist-registered"
  | "available-subscription"
  | "available-single"
  | "waitlist-available"
  | "full"
  | "canceled"
  | "time-changed"
  | "cancel-closed";

const BADGE_CONFIG: Record<
  BadgeVariant,
  { label: string; className: string }
> = {
  registered: {
    label: "✓ נרשמת",
    className: "bg-sage-100 text-sage-600 border border-sage-200",
  },
  "waitlist-registered": {
    label: "✓ ברשימת המתנה",
    className: "bg-amber-50 text-amber-700 border border-amber-200",
  },
  "available-subscription": {
    label: "הרשמה עם מנוי",
    className: "bg-teal-50 text-teal-700 border border-teal-200",
  },
  "available-single": {
    label: "הרשמה חד-פעמית",
    className: "bg-lavender-100 text-lavender-600 border border-lavender-200",
  },
  "waitlist-available": {
    label: "הרשמה להמתנה",
    className: "bg-amber-50 text-amber-700 border border-amber-200",
  },
  full: {
    label: "השיעור מלא",
    className: "bg-orange-50 text-orange-700 border border-orange-200",
  },
  canceled: {
    label: "השיעור בוטל",
    className: "bg-red-50 text-red-600 border border-red-200",
  },
  "time-changed": {
    label: "שעה עודכנה",
    className: "bg-blue-50 text-blue-700 border border-blue-200",
  },
  "cancel-closed": {
    label: "לא ניתן לביטול",
    className: "bg-gray-100 text-gray-500 border border-gray-200",
  },
};

interface StatusBadgeProps {
  variant: BadgeVariant;
  className?: string;
}

export function StatusBadge({ variant, className }: StatusBadgeProps) {
  const config = BADGE_CONFIG[variant];
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
