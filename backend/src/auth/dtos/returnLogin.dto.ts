import { ReturnUserDto } from "src/users/dtos/returnUser.dto"; // Importa a interface ReturnUserDto do diretório de DTOs de retorno de usuário

export interface ReturnLogin {
    accessToken: string;
    user: ReturnUserDto;
  }
