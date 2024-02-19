import { ReturnUserDto } from "src/users/dtos/returnUser.dto"; // Importa a interface ReturnUserDto do diretório de DTOs de retorno de usuário

export interface ReturnLogin { // Define a interface ReturnLogin
    user: ReturnUserDto; // Define uma propriedade user que é do tipo ReturnUserDto
    acessToken: string; // Define uma propriedade accessToken que é do tipo string
}
