import { UserEntity } from "../entities/user.entity";

export class ReturnUserDto {
  id: string;
  username: string;
  name: string;
  email: string;
  role: string;
  phone_number: string;
  ramal: string;
  unit: { id: string; name: string } | null;
  department: { id: string; name: string } | null;
  created_at: Date;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.username = user.username;
    this.name = user.name;
    this.email = user.email;
    this.role = user.role;
    this.phone_number = user.phone_number;
    this.ramal = user.ramal;
    this.unit = user.unit ? { id: user.unit.id, name: user.unit.name } : null;
    this.department = user.department ? { id: user.department.id, name: user.department.name } : null;
    this.created_at = user.created_at;
  }
}