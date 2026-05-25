"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";
import type { ArtClass } from "../types";

function isConfigured() {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

export async function addClassAction(cls: ArtClass): Promise<void> {
  if (!isConfigured()) return;

  const supabase = createClient();
  const { error } = await supabase.from("art_classes").insert({
    id: cls.id,
    title: cls.title,
    type: cls.type,
    date: cls.date,
    start_time: cls.startTime,
    end_time: cls.endTime,
    duration: cls.duration,
    teacher_id: cls.teacher.id,
    capacity: cls.capacity,
    registered_count: 0,
    waitlist_count: 0,
    status: cls.status,
    previous_start_time: cls.previousStartTime ?? null,
    cancellation_deadline_hours: cls.cancellationDeadlineHours,
    registration_types: cls.registrationTypes,
    single_registration_enabled: cls.singleRegistrationEnabled,
    description: cls.description ?? null,
    image_url: cls.imageUrl ?? null,
  });

  if (error) {
    console.error("[action] addClassAction:", error);
    throw new Error("הוספת השיעור נכשלה");
  }

  revalidatePath("/", "layout");
}

export async function editClassAction(
  classId: string,
  updates: Partial<ArtClass>
): Promise<void> {
  if (!isConfigured()) return;

  const supabase = createClient();

  const dbUpdates: Record<string, unknown> = {};
  if (updates.title !== undefined) dbUpdates.title = updates.title;
  if (updates.type !== undefined) dbUpdates.type = updates.type;
  if (updates.date !== undefined) dbUpdates.date = updates.date;
  if (updates.startTime !== undefined) dbUpdates.start_time = updates.startTime;
  if (updates.endTime !== undefined) dbUpdates.end_time = updates.endTime;
  if (updates.duration !== undefined) dbUpdates.duration = updates.duration;
  if (updates.capacity !== undefined) dbUpdates.capacity = updates.capacity;
  if (updates.status !== undefined) dbUpdates.status = updates.status;
  if (updates.previousStartTime !== undefined)
    dbUpdates.previous_start_time = updates.previousStartTime;
  if (updates.cancellationDeadlineHours !== undefined)
    dbUpdates.cancellation_deadline_hours = updates.cancellationDeadlineHours;
  if (updates.registrationTypes !== undefined)
    dbUpdates.registration_types = updates.registrationTypes;
  if (updates.singleRegistrationEnabled !== undefined)
    dbUpdates.single_registration_enabled = updates.singleRegistrationEnabled;
  if (updates.description !== undefined)
    dbUpdates.description = updates.description ?? null;
  if (updates.imageUrl !== undefined)
    dbUpdates.image_url = updates.imageUrl ?? null;

  const { error } = await supabase
    .from("art_classes")
    .update(dbUpdates)
    .eq("id", classId);

  if (error) {
    console.error("[action] editClassAction:", error);
    throw new Error("עדכון השיעור נכשל");
  }

  revalidatePath("/", "layout");
}

export async function cancelClassAction(classId: string): Promise<void> {
  if (!isConfigured()) return;

  const supabase = createClient();
  const { error } = await supabase
    .from("art_classes")
    .update({ status: "canceled" })
    .eq("id", classId);

  if (error) {
    console.error("[action] cancelClassAction:", error);
    throw new Error("ביטול השיעור נכשל");
  }

  revalidatePath("/", "layout");
}
