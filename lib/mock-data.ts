import type { ArtClass, Teacher, User, Registration } from "./types";

export const TEACHER: Teacher = {
  id: "teacher-1",
  name: "נטע הראל רימון",
};

export const CURRENT_USER: User = {
  id: "user-1",
  name: "מרים כהן",
  firstName: "מרים",
  phone: "050-1234567",
  hasSubscription: true,
  token: "00000000-0000-0000-0000-000000000001",
};

export const MOCK_CLASSES: ArtClass[] = [];

export const MOCK_REGISTRATIONS: Registration[] = [];
