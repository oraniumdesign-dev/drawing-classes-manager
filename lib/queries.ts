import { createClient } from "./supabase/server";
import type { ArtClass, Registration, User } from "./types";
import { MOCK_CLASSES, MOCK_REGISTRATIONS, CURRENT_USER } from "./mock-data";

function isConfigured() {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

export async function getClasses(): Promise<ArtClass[]> {
  if (!isConfigured()) return MOCK_CLASSES;

  const supabase = createClient();
  const { data, error } = await supabase
    .from("art_classes")
    .select("*, teacher:teachers(*)")
    .order("date", { ascending: true })
    .order("start_time", { ascending: true });

  if (error || !data) {
    console.error("[queries] getClasses:", error);
    return MOCK_CLASSES;
  }

  return data.map(mapClass);
}

export async function getRegistrations(userId: string): Promise<Registration[]> {
  if (!isConfigured()) return MOCK_REGISTRATIONS;

  const supabase = createClient();
  const { data, error } = await supabase
    .from("registrations")
    .select("*")
    .eq("user_id", userId)
    .neq("status", "canceled");

  if (error || !data) {
    console.error("[queries] getRegistrations:", error);
    return MOCK_REGISTRATIONS;
  }

  return data.map(mapRegistration);
}

export async function getCurrentUser(): Promise<User> {
  if (!isConfigured()) return CURRENT_USER;

  const supabase = createClient();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", "user-1")
    .single();

  if (error || !data) return CURRENT_USER;

  return mapUser(data);
}

export async function getUsers(): Promise<User[]> {
  if (!isConfigured()) return [CURRENT_USER];

  const supabase = createClient();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .order("name", { ascending: true });

  if (error || !data) return [CURRENT_USER];

  return data.map(mapUser);
}

// ── Mappers ──────────────────────────────────────────────

type DbRow = Record<string, unknown>;

function mapUser(row: DbRow): User {
  return {
    id: row.id as string,
    name: row.name as string,
    firstName: row.first_name as string,
    phone: row.phone as string,
    hasSubscription: row.has_subscription as boolean,
    token: (row.token as string) ?? "",
  };
}

function mapClass(row: DbRow): ArtClass {
  const teacher = row.teacher as DbRow;
  return {
    id: row.id as string,
    title: row.title as string,
    type: row.type as "group" | "private",
    date: (row.date as string).slice(0, 10),
    startTime: row.start_time as string,
    endTime: row.end_time as string,
    duration: row.duration as number,
    teacher: {
      id: teacher.id as string,
      name: teacher.name as string,
      imageUrl: teacher.image_url as string | undefined,
    },
    capacity: row.capacity as number,
    registeredCount: row.registered_count as number,
    waitlistCount: row.waitlist_count as number,
    status: row.status as "active" | "canceled" | "time-changed",
    previousStartTime: row.previous_start_time as string | undefined,
    cancellationDeadlineHours: row.cancellation_deadline_hours as number,
    registrationTypes: row.registration_types as ("subscription" | "single")[],
    singleRegistrationEnabled: row.single_registration_enabled as boolean,
    description: row.description as string | undefined,
    imageUrl: row.image_url as string | undefined,
  };
}

function mapRegistration(row: DbRow): Registration {
  return {
    id: row.id as string,
    userId: row.user_id as string,
    classId: row.class_id as string,
    type: row.type as "subscription" | "single",
    status: row.status as "registered" | "waitlist" | "canceled",
    registeredAt: row.registered_at as string,
  };
}
