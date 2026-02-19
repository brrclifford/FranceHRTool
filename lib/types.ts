export interface Worker {
  id: string;
  oapass_id: string;
  first_name: string;
  last_name: string;
  email: string;
  start_date: string;
  store_name: string;
  sys_id: string;
  pay_rate: number | null;
  pay_type: string | null;
  job_title: string | null;
  job_specialisation_code: string | null;
  employee_group_name: string | null;
  is_full_time: boolean | null;
  contract_hours: number | null;
  payroll_user_id: string | null;
  status: "unenriched" | "enriched" | "submitted";
  last_submitted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface JobSpecialisation {
  id: string;
  code: string;
  title: string;
}

export interface EmployeeGroupName {
  id: string;
  name: string;
}

export interface SubmissionHistory {
  id: string;
  worker_id: string;
  pay_rate: number;
  pay_type: string;
  job_title: string;
  job_specialisation_code: string;
  employee_group_name: string;
  is_full_time: boolean;
  contract_hours: number;
  payroll_user_id: string;
  submitted_at: string;
}

export interface EnrichmentFormData {
  pay_rate: number;
  pay_type: string;
  job_title: string;
  job_specialisation_code: string;
  employee_group_name: string;
  is_full_time: boolean;
  contract_hours: number;
  payroll_user_id: string;
}
