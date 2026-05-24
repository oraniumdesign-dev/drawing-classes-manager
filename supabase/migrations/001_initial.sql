-- =============================================
-- Schema for Studio Neta drawing classes app
-- =============================================

-- Teachers
CREATE TABLE IF NOT EXISTS teachers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  image_url TEXT
);

-- Users (no auth — hardcoded user for now)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  first_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  has_subscription BOOLEAN NOT NULL DEFAULT false
);

-- Art classes
CREATE TABLE IF NOT EXISTS art_classes (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('group', 'private')),
  date DATE NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  duration INTEGER NOT NULL,
  teacher_id TEXT NOT NULL REFERENCES teachers(id),
  capacity INTEGER NOT NULL,
  registered_count INTEGER NOT NULL DEFAULT 0,
  waitlist_count INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'time-changed')),
  previous_start_time TEXT,
  cancellation_deadline_hours INTEGER NOT NULL DEFAULT 24,
  registration_types TEXT[] NOT NULL,
  single_registration_enabled BOOLEAN NOT NULL DEFAULT true,
  description TEXT,
  image_url TEXT
);

-- Registrations
CREATE TABLE IF NOT EXISTS registrations (
  id TEXT PRIMARY KEY DEFAULT encode(gen_random_bytes(12), 'hex'),
  user_id TEXT NOT NULL REFERENCES users(id),
  class_id TEXT NOT NULL REFERENCES art_classes(id),
  type TEXT NOT NULL CHECK (type IN ('subscription', 'single')),
  status TEXT NOT NULL DEFAULT 'registered' CHECK (status IN ('registered', 'waitlist', 'canceled')),
  registered_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Prevent duplicate active registrations per user per class
CREATE UNIQUE INDEX IF NOT EXISTS registrations_active_unique
  ON registrations(user_id, class_id)
  WHERE status != 'canceled';

-- =============================================
-- Trigger: keep registered_count / waitlist_count in sync
-- =============================================

CREATE OR REPLACE FUNCTION sync_registration_counts()
RETURNS TRIGGER AS $$
DECLARE
  target_class_id TEXT;
BEGIN
  target_class_id := COALESCE(NEW.class_id, OLD.class_id);

  UPDATE art_classes
  SET
    registered_count = (
      SELECT COUNT(*) FROM registrations
      WHERE class_id = target_class_id AND status = 'registered'
    ),
    waitlist_count = (
      SELECT COUNT(*) FROM registrations
      WHERE class_id = target_class_id AND status = 'waitlist'
    )
  WHERE id = target_class_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS after_registration_change ON registrations;
CREATE TRIGGER after_registration_change
  AFTER INSERT OR UPDATE OR DELETE ON registrations
  FOR EACH ROW EXECUTE FUNCTION sync_registration_counts();

-- =============================================
-- Seed data
-- =============================================

INSERT INTO teachers (id, name) VALUES
  ('teacher-1', 'נטע הראל רימון')
ON CONFLICT (id) DO NOTHING;

INSERT INTO users (id, name, first_name, phone, has_subscription) VALUES
  ('user-1', 'מרים כהן', 'מרים', '050-1234567', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO art_classes (id, title, type, date, start_time, end_time, duration, teacher_id, capacity, registered_count, waitlist_count, status, previous_start_time, cancellation_deadline_hours, registration_types, single_registration_enabled, description) VALUES
  ('cls-1', 'ציור בצבעי מים', 'group', '2026-05-17', '10:00', '11:30', 90, 'teacher-1', 8, 4, 0, 'active', NULL, 24, ARRAY['subscription','single'], true, 'שיעור ציור בצבעי מים לכל הרמות. נעסוק בטכניקות בסיסיות של שכבות צבע, שטיפות ויצירת טקסטורות.'),
  ('cls-2', 'ציור אקריליק', 'group', '2026-05-17', '18:00', '19:30', 90, 'teacher-1', 8, 8, 2, 'active', NULL, 24, ARRAY['subscription'], false, 'ציור אקריליק — צבע נועז, תוצאות מרהיבות. נלמד ערבוב צבעים, בניית שכבות ויצירת עומק בציור.'),
  ('cls-3', 'שיעור אישי', 'private', '2026-05-17', '11:00', '12:00', 60, 'teacher-1', 1, 0, 0, 'active', NULL, 48, ARRAY['subscription','single'], true, NULL),
  ('cls-4', 'רישום למתחילות', 'group', '2026-05-18', '09:00', '10:15', 75, 'teacher-1', 6, 6, 1, 'active', NULL, 24, ARRAY['subscription','single'], true, 'שיעור רישום לנשים שמתחילות את דרכן ביצירה. אין צורך בניסיון קודם — רק התרגשות ורצון ללמוד.'),
  ('cls-5', 'ציור חופשי מודרך', 'group', '2026-05-18', '19:00', '20:30', 90, 'teacher-1', 10, 3, 0, 'active', NULL, 24, ARRAY['subscription','single'], true, 'שיעור חופשי עם הדרכה — כל אחת מביאה את הפרויקט שלה ונטע מלווה ומייעצת.'),
  ('cls-6', 'סדנת טבע דומם', 'group', '2026-05-19', '10:00', '12:00', 120, 'teacher-1', 8, 5, 0, 'active', NULL, 24, ARRAY['subscription','single'], true, 'סדנת ציור מיוחדת — נצייר סידור פרחים ופירות מהחיים. מוגשת כיבוד קל. אווירה נעימה ומרגיעה.'),
  ('cls-7', 'שיעור אישי', 'private', '2026-05-19', '14:00', '15:00', 60, 'teacher-1', 1, 1, 0, 'active', NULL, 48, ARRAY['subscription','single'], true, NULL),
  ('cls-8', 'ציור בצבעי מים', 'group', '2026-05-20', '18:00', '19:30', 90, 'teacher-1', 8, 2, 0, 'active', NULL, 24, ARRAY['subscription','single'], true, NULL),
  ('cls-9', 'ציור אקריליק', 'group', '2026-05-20', '10:00', '11:30', 90, 'teacher-1', 8, 3, 0, 'canceled', NULL, 24, ARRAY['subscription'], false, 'השיעור בוטל על ידי המורה.'),
  ('cls-10', 'ציור חופשי מודרך', 'group', '2026-05-21', '09:00', '10:30', 90, 'teacher-1', 8, 8, 3, 'active', NULL, 24, ARRAY['subscription'], false, NULL),
  ('cls-11', 'שיעור אישי', 'private', '2026-05-21', '16:00', '17:00', 60, 'teacher-1', 1, 0, 0, 'active', NULL, 48, ARRAY['subscription','single'], true, NULL),
  ('cls-12', 'ציור בצבעי מים', 'group', '2026-05-24', '10:00', '11:30', 90, 'teacher-1', 8, 6, 0, 'time-changed', '09:00', 24, ARRAY['subscription','single'], true, NULL),
  ('cls-13', 'סדנת טבע דומם', 'group', '2026-05-25', '10:00', '12:00', 120, 'teacher-1', 8, 2, 0, 'active', NULL, 24, ARRAY['subscription','single'], true, NULL),
  ('cls-14', 'רישום למתחילות', 'group', '2026-05-25', '17:00', '18:15', 75, 'teacher-1', 6, 1, 0, 'active', NULL, 24, ARRAY['subscription','single'], true, NULL)
ON CONFLICT (id) DO NOTHING;

-- Seed registrations (trigger will NOT fire for these — counts already set above)
INSERT INTO registrations (id, user_id, class_id, type, status, registered_at) VALUES
  ('reg-1', 'user-1', 'cls-6',  'subscription', 'registered', '2026-05-14T10:00:00Z'),
  ('reg-2', 'user-1', 'cls-12', 'subscription', 'registered', '2026-05-13T14:00:00Z'),
  ('reg-3', 'user-1', 'cls-10', 'subscription', 'waitlist',   '2026-05-15T09:00:00Z')
ON CONFLICT DO NOTHING;
