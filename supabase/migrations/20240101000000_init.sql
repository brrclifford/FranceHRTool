-- Job Specialisations lookup table
CREATE TABLE job_specialisations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL
);

-- Employee Group Names lookup table
CREATE TABLE employee_group_names (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

-- Workers table
CREATE TABLE workers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  oapass_id TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  start_date DATE NOT NULL,
  store_name TEXT NOT NULL,
  sys_id TEXT NOT NULL,
  pay_rate NUMERIC,
  pay_type TEXT,
  job_title TEXT,
  job_specialisation_code TEXT,
  employee_group_name TEXT,
  is_full_time BOOLEAN,
  contract_hours NUMERIC,
  payroll_user_id TEXT,
  status TEXT NOT NULL DEFAULT 'unenriched' CHECK (status IN ('unenriched', 'enriched', 'submitted')),
  last_submitted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Submission History table
CREATE TABLE submission_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  worker_id UUID NOT NULL REFERENCES workers(id) ON DELETE CASCADE,
  pay_rate NUMERIC NOT NULL,
  pay_type TEXT NOT NULL,
  job_title TEXT NOT NULL,
  job_specialisation_code TEXT NOT NULL,
  employee_group_name TEXT NOT NULL,
  is_full_time BOOLEAN NOT NULL,
  contract_hours NUMERIC NOT NULL,
  payroll_user_id TEXT NOT NULL,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_workers_status ON workers(status);
CREATE INDEX idx_workers_oapass_id ON workers(oapass_id);
CREATE INDEX idx_workers_email ON workers(email);
CREATE INDEX idx_submission_history_worker_id ON submission_history(worker_id);
CREATE INDEX idx_submission_history_submitted_at ON submission_history(submitted_at);

-- Enable RLS on all tables
ALTER TABLE job_specialisations ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_group_names ENABLE ROW LEVEL SECURITY;
ALTER TABLE workers ENABLE ROW LEVEL SECURITY;
ALTER TABLE submission_history ENABLE ROW LEVEL SECURITY;

-- Permissive policies (no auth)
CREATE POLICY "Allow all on job_specialisations" ON job_specialisations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on employee_group_names" ON employee_group_names FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on workers" ON workers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on submission_history" ON submission_history FOR ALL USING (true) WITH CHECK (true);
