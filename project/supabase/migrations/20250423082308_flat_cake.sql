/*
  # Initial Schema Setup for TrackIt Finance App

  1. New Tables
    - users
      - id (uuid, primary key)
      - email (text, unique)
      - full_name (text)
      - age (integer)
      - country (text)
      - phone (text)
      - created_at (timestamp)

    - expenses
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - amount (decimal)
      - category (text)
      - description (text)
      - date (date)
      - created_at (timestamp)

    - bills
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - name (text)
      - amount (decimal)
      - due_date (date)
      - autopay (boolean)
      - status (text)
      - created_at (timestamp)

    - investments
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - name (text)
      - amount (decimal)
      - type (text)
      - return_rate (decimal)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  age integer,
  country text,
  phone text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own data"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Expenses table
CREATE TABLE IF NOT EXISTS expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  amount decimal NOT NULL,
  category text NOT NULL,
  description text,
  date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own expenses"
  ON expenses
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Bills table
CREATE TABLE IF NOT EXISTS bills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  name text NOT NULL,
  amount decimal NOT NULL,
  due_date date NOT NULL,
  autopay boolean DEFAULT false,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own bills"
  ON bills
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Investments table
CREATE TABLE IF NOT EXISTS investments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  name text NOT NULL,
  amount decimal NOT NULL,
  type text NOT NULL,
  return_rate decimal DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE investments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own investments"
  ON investments
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);