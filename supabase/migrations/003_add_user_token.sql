-- Add unique token for passwordless student login via link
ALTER TABLE users ADD COLUMN IF NOT EXISTS token UUID UNIQUE NOT NULL DEFAULT gen_random_uuid();
