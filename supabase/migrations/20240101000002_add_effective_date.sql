-- Add effective_date column to workers table
ALTER TABLE workers ADD COLUMN effective_date DATE;

-- Add effective_date column to submission_history table
ALTER TABLE submission_history ADD COLUMN effective_date DATE;
