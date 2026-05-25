-- Allow 'event' as a class type
ALTER TABLE art_classes DROP CONSTRAINT IF EXISTS art_classes_type_check;
ALTER TABLE art_classes ADD CONSTRAINT art_classes_type_check
  CHECK (type IN ('group', 'private', 'event'));
