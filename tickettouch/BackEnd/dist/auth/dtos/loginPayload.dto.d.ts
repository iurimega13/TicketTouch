import { UserEntity } from "src/users/entities/user.entity";
export declare class LoginPayload {
    registration: string;
    role: string;
    constructor(user: UserEntity);
}
