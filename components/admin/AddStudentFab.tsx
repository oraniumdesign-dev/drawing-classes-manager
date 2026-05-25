"use client";
import { useState } from "react";
import { AddStudentModal } from "./modals/AddStudentModal";

export function AddStudentFab() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-rose-dust-400 text-white px-6 py-3.5 rounded-full shadow-lg flex items-center gap-2 text-base font-semibold active:scale-95 transition-transform z-10"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        הוספת תלמידה
      </button>

      {open && <AddStudentModal onClose={() => setOpen(false)} />}
    </>
  );
}
