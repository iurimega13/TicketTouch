export interface User {
    id: string;
    username: string;
    role: string;
    setor: string;
    unidade: string;
  }

export interface TicketData {
  title: string;
  description: string;
  priority: string;
  status: string;
  category_id?: string;
  sla_id?: string;
  user_id?: string;
  analyst_id?: string;
  unit_id?: string;
}