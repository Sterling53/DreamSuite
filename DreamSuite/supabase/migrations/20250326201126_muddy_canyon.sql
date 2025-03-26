/*
  # Create logs table for application monitoring

  1. New Tables
    - `logs`
      - `id` (uuid, primary key)
      - `level` (text, not null)
      - `message` (text, not null)
      - `context` (jsonb)
      - `timestamp` (timestamptz, not null)
      - `user_id` (uuid, references auth.users)

  2. Security
    - Enable RLS on `logs` table
    - Add policy for service role to insert logs
    - Add policy for authenticated users to read their own logs
*/

CREATE TABLE IF NOT EXISTS logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  level text NOT NULL CHECK (level IN ('info', 'warn', 'error')),
  message text NOT NULL,
  context jsonb,
  timestamp timestamptz NOT NULL DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

ALTER TABLE logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can insert logs"
  ON logs
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Users can read own logs"
  ON logs
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS logs_timestamp_idx ON logs (timestamp DESC);
CREATE INDEX IF NOT EXISTS logs_level_idx ON logs (level);
CREATE INDEX IF NOT EXISTS logs_user_id_idx ON logs (user_id);