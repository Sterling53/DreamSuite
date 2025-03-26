/*
  # Fix logs table RLS policies

  1. Changes
    - Update RLS policies to handle unauthenticated logs
    - Allow null user_id for system logs
    - Add policy for service role to read all logs

  2. Security
    - Maintain existing security model
    - Add flexibility for system-level logging
*/

-- Allow logs with null user_id (system logs)
DROP POLICY IF EXISTS "Users can insert own logs" ON logs;
CREATE POLICY "Users can insert logs"
  ON logs
  FOR INSERT
  TO authenticated
  WITH CHECK (
    user_id IS NULL OR  -- Allow system logs
    auth.uid() = user_id -- Allow user's own logs
  );

-- Update read policy to allow reading system logs
DROP POLICY IF EXISTS "Users can read own logs" ON logs;
CREATE POLICY "Users can read logs"
  ON logs
  FOR SELECT
  TO authenticated
  USING (
    user_id IS NULL OR  -- Allow reading system logs
    auth.uid() = user_id -- Allow reading own logs
  );

-- Allow service role to read all logs
CREATE POLICY "Service role can read all logs"
  ON logs
  FOR SELECT
  TO service_role
  USING (true);