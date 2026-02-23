-- Drop existing RLS policies
DROP POLICY IF EXISTS "Allow all on job_specialisations" ON job_specialisations;
DROP POLICY IF EXISTS "Allow all on employee_group_names" ON employee_group_names;
DROP POLICY IF EXISTS "Allow all on workers" ON workers;
DROP POLICY IF EXISTS "Allow all on submission_history" ON submission_history;

-- Disable RLS on all tables
ALTER TABLE job_specialisations DISABLE ROW LEVEL SECURITY;
ALTER TABLE employee_group_names DISABLE ROW LEVEL SECURITY;
ALTER TABLE workers DISABLE ROW LEVEL SECURITY;
ALTER TABLE submission_history DISABLE ROW LEVEL SECURITY;
