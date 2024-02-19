import { UserEntity } from "src/users/entities/user.entity";

export class LoginPayload {
    registration: string;
    role: string;

    constructor (user: UserEntity) {
        this.registration = user.registration;
        this.role = user.role;
    }
}