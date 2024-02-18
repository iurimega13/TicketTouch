import { IsString } from 'class-validator'; // Importa o decorator IsString do class-validator

export class LoginDto {
   // @IsString() Valida se o valor é uma string
    registration: string; // Define o campo de registro como uma string

    @IsString() // Valida se o valor é uma string
    password: string; // Define o campo de senha como uma string
}
