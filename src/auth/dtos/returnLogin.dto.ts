import { ReturnUserDto } from "src/users/dtos/returnUser.dto";

export interface ReturnLogin{
    user: ReturnUserDto;
    acessToken: string;
}