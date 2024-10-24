export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: string;
  phone_number: string;
  ramal: string;
  created_at: string;
  unit: { id: string; name: string } | null; 
  department: { id: string; name: string } | null; 
}

export interface Unit {
  id: string;
  name: string;
}

export interface Department {
  id: string;
  name: string;
  unit_id: string;
  unit: { id: string; name: string } | null; 
}

export interface Equipment {
  id: string;
  name: string;
  description: string;
  serial_number: string;
  is_shared: boolean;
  user: { id: string; name: string } | null; 
  unit: { id: string; name: string } | null; 
  department: { id: string; name: string } | null;
}

export interface AxiosError {
  response?: {
    status: number;
  };
}