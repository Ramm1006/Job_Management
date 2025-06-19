export interface Job {
  _id: string;  // Add this line for MongoDB's ID
  id?: string;  // Make the old id optional
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  salary: string;
  type: 'full-time' | 'part-time' | 'contract';
  postedDate: string;
}

export interface SearchFilters {
  query?: string;
  type?: string;
  location?: string;
}

export interface AuthState {
  token: string | null;
  role: 'admin' | 'user' | null;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData extends LoginData {
  role?: 'admin' | 'user';
}