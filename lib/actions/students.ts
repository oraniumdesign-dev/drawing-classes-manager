"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { User } from "@/lib/types";

export interface CreateStudentInput {
  name: string;
  firstName: string;
  phone: string;
  hasSubscription: boolean;
}

export async function createStudent(input: CreateStudentInput): Promise<User> {
  const supabase = createClient();
  const id = `user-${crypto.randomUUID()}`;

  const { data, error } = await supabase
    .from("users")
    .insert({
      id,
      name: input.name,
      first_name: input.firstName,
      phone: input.phone,
      has_subscription: input.hasSubscription,
    })
    .select("*")
    .single();

  if (error || !data) throw new Error(error?.message ?? "שגיאה ביצירת תלמידה");

  revalidatePath("/admin/students");

  return {
    id: data.id,
    name: data.name,
    firstName: data.first_name,
    phone: data.phone,
    hasSubscription: data.has_subscription,
    token: data.token as string,
  };
}
