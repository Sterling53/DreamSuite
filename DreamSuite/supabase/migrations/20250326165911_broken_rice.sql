/*
  # Create dreams table and authentication setup

  1. New Tables
    - `dreams`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `title` (text)
      - `description` (text)
      - `date` (timestamp)
      - `emotions` (text array)
      - `tags` (text array)
      - `interpretation` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `sleep_quality` (integer)
      - `lucidity_level` (integer)
      - `dream_type` (text)
      - `recurring` (boolean)

  2. Security
    - Enable RLS on `dreams` table
    - Add policies for authenticated users to:
      - Read their own dreams
      - Create new dreams
      - Update their own dreams
      - Delete their own dreams
*/

CREATE TABLE IF NOT EXISTS dreams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  date timestamptz NOT NULL,
  emotions text[] DEFAULT '{}',
  tags text[] DEFAULT '{}',
  interpretation text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  sleep_quality integer CHECK (sleep_quality BETWEEN 1 AND 10),
  lucidity_level integer CHECK (lucidity_level BETWEEN 1 AND 5),
  dream_type text CHECK (dream_type IN ('normal', 'lucid', 'nightmare', 'recurring', 'prophetic')),
  recurring boolean DEFAULT false
);

ALTER TABLE dreams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own dreams"
  ON dreams
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create dreams"
  ON dreams
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own dreams"
  ON dreams
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own dreams"
  ON dreams
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_dreams_updated_at
  BEFORE UPDATE
  ON dreams
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();