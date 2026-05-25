import Link from "next/link";
import { getUsers } from "@/lib/queries";
import { StudentCard } from "@/components/admin/StudentCard";
import { AddStudentFab } from "@/components/admin/AddStudentFab";

export default async function StudentsPage() {
  const users = await getUsers();

  return (
    <div className="min-h-screen bg-cream font-heebo" dir="rtl">

      {/* Sticky header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between px-4 pt-4 pb-4">
            <Link
              href="/admin"
              className="flex items-center gap-1.5 text-gray-500 active:text-gray-700"
              aria-label="חזרה לניהול שיעורים"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
              </svg>
              <span className="text-sm font-medium">שיעורים</span>
            </Link>
            <h1 className="text-lg font-bold text-charcoal">תלמידות</h1>
            <div className="w-16" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 pt-4 pb-32">
        {users.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-200 py-10 text-center">
            <p className="text-sm text-gray-400">עדיין אין תלמידות</p>
          </div>
        ) : (
          <div className="space-y-3">
            {users.map((user) => (
              <StudentCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </div>

      <AddStudentFab />
    </div>
  );
}
