export interface User {
  id: string;
  username: string;
  role: string;
  setor: string;
  unidade: string;
}

export interface TicketData {
  key: string;
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  created_at: string;
  updated_at: string;
  sla_id: string;
  user: string;
  unit: string;
  category_name?: string;
  technician?: User;
  department?: string;
  type?: string;
  assignee?: string;
  changes?: Change[];
}


export interface Change {
  field: string;
  value: string;
  date?: string;
  username?: string;
}