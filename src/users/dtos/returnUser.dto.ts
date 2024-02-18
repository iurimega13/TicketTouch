import { UserEntity } from "../entities/user.entity";

export class ReturnUserDto {
    id: number;
    name: string;
    email: string;
    role: string;
    phone_number: string;
    registration: string;

    constructor(user: UserEntity) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.role = user.role;
        this.phone_number = user.phone_number;
        this.registration = user.registration;
    }
}