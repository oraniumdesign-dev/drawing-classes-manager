"use client";
import { useEffect, useRef } from "react";
import { formatShortDay, getDateStrip, todayStr } from "@/lib/utils/dates";
import { cn } from "@/lib/utils/cn";

interface DateStripProps {
  selected: string;
  onSelect: (date: string) => void;
  availableDates?: Set<string>;
}

export function DateStrip({ selected, onSelect, availableDates }: DateStripProps) {
  const today = todayStr();
  const dates = getDateStrip(new Date(), 21);
  const stripRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLButtonElement>(null);

  // Scroll selected into view on mount
  useEffect(() => {
    selectedRef.current?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [selected]);

  // Format month/year for header (based on selected date)
  const [y, m] = selected.split("-").map(Number);
  const MONTHS = ["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"];
  const monthLabel = `${MONTHS[m - 1]} ${y}`;

  return (
    <div className="bg-white border-b border-gray-100">
      {/* Month row */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex gap-2">
          <button className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center" aria-label="לוח שנה">
            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
          </button>
        </div>
        <span className="text-base font-semibold text-charcoal">{monthLabel}</span>
      </div>

      {/* Date scroll strip */}
      <div
        ref={stripRef}
        className="flex overflow-x-auto gap-1 px-3 pb-3 scrollbar-hide"
        style={{ direction: "rtl" }}
      >
        {dates.map((date) => {
          const isSelected = date === selected;
          const isToday = date === today;
          const hasClasses = availableDates ? availableDates.has(date) : true;
          const dayNum = Number(date.slice(8));
          const dayName = formatShortDay(date);

          return (
            <button
              key={date}
              ref={isSelected ? selectedRef : undefined}
              onClick={() => onSelect(date)}
              className={cn(
                "flex-shrink-0 flex flex-col items-center justify-center w-[52px] h-[64px] rounded-2xl transition-all duration-150 active:scale-95",
                isSelected
                  ? "bg-charcoal text-white shadow-md"
                  : isToday
                  ? "bg-rose-dust-100 text-charcoal"
                  : hasClasses
                  ? "bg-lavender-100 text-charcoal hover:bg-lavender-200"
                  : "bg-gray-50 text-gray-300"
              )}
            >
              <span
                className={cn(
                  "text-xl font-bold leading-none",
                  !isSelected && !hasClasses && "text-gray-300"
                )}
              >
                {dayNum}
              </span>
              <span
                className={cn(
                  "text-xs mt-1",
                  isSelected ? "text-white/80" : "text-gray-400"
                )}
              >
                {dayName}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
