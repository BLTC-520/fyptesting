/*
  # Add unique constraint to wallet address

  1. Changes
    - Add unique constraint to wallet_address column in citizens table
    - This ensures no two citizens can have the same wallet address

  2. Security
    - No changes to RLS policies
*/

ALTER TABLE citizens
ADD CONSTRAINT citizens_wallet_address_key UNIQUE (wallet_address);