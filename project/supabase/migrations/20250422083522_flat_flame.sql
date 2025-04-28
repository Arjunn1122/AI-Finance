/*
  # Add Insert Policy for Users Table
  
  1. Changes
    - Add new RLS policy to allow insertion of user data during signup
    - Policy ensures user can only insert their own data with matching auth.uid()
  
  2. Security
    - Maintains data integrity by ensuring users can only create their own profile
    - Preserves existing select policy
*/

CREATE POLICY "Users can insert own data"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);