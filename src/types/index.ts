export interface Citizen {
  id: string;
  full_name: string;
  mykad_number: string;
  postcode: string;
  phone_number: string;
  email: string;
  address: string;
  employment_status: string;
  monthly_income: number;
  government_assistance: boolean;
  wallet_address: string;
  created_at: string;
  updated_at: string;
}

export const EMPLOYMENT_STATUS = [
  'Employed',
  'Unemployed',
  'Student',
  'Retired'
] as const;

export type EmploymentStatus = typeof EMPLOYMENT_STATUS[number];