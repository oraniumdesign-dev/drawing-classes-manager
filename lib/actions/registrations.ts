"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";

// Hardcoded until Supabase Auth is added
const USER_ID = "user-1";

function isConfigured() {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

export async function registerForClass(
  classId: string,
  type: string
): Promise<void> {
  if (!isConfigured()) return;

  const supabase = createClient();
  const { error } = await supabase.from("registrations").insert({
    user_id: USER_ID,
    class_id: classId,
    type,
    status: "registered",
  });

  if (error) {
    console.error("[action] registerForClass:", error);
    throw new Error("הרישום נכשל");
  }

  revalidatePath("/", "layout");
}

export async function cancelRegistration(classId: string): Promise<void> {
  if (!isConfigured()) return;

  const supabase = createClient();
  const { error } = await supabase
    .from("registrations")
    .update({ status: "canceled" })
    .eq("user_id", USER_ID)
    .eq("class_id", classId)
    .eq("status", "registered");

  if (error) {
    console.error("[action] cancelRegistration:", error);
    throw new Error("ביטול ההרשמה נכשל");
  }

  revalidatePath("/", "layout");
}

export async function joinWaitlist(classId: string): Promise<void> {
  if (!isConfigured()) return;

  const supabase = createClient();
  const { error } = await supabase.from("registrations").insert({
    user_id: USER_ID,
    class_id: classId,
    type: "subscription",
    status: "waitlist",
  });

  if (error) {
    console.error("[action] joinWaitlist:", error);
    throw new Error("הצטרפות לרשימת ההמתנה נכשלה");
  }

  revalidatePath("/", "layout");
}
