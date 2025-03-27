/*
  # Create citizens table for PADU demo

  1. New Tables
    - `citizens`
      - `id` (uuid, primary key)
      - `full_name` (text)
      - `mykad_number` (text, unique)
      - `postcode` (text)
      - `phone_number` (text)
      - `email` (text)
      - `address` (text)
      - `employment_status` (text)
      - `monthly_income` (numeric)
      - `government_assistance` (boolean)
      - `wallet_address` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `citizens` table
    - Add policies for authenticated users to read all data
    - Add policies for public users to insert their own data
*/

CREATE TABLE citizens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  mykad_number text UNIQUE NOT NULL,
  postcode text NOT NULL,
  phone_number text NOT NULL,
  email text NOT NULL,
  address text NOT NULL,
  employment_status text NOT NULL,
  monthly_income numeric NOT NULL,
  government_assistance boolean NOT NULL DEFAULT false,
  wallet_address text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE citizens ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert data (for citizen registration)
CREATE POLICY "Allow public to insert citizens"
  ON citizens
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow authenticated users (government officials) to view all data
CREATE POLICY "Allow authenticated users to view citizens"
  ON citizens
  FOR SELECT
  TO authenticated
  USING (true);