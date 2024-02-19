import { UserEntity } from "src/users/entities/user.entity"; // Importa a classe UserEntity do diretório de entidades de usuários

export class LoginPayload {
    registration: string; // Define a propriedade registration do payload de login
    role: string; // Define a propriedade role do payload de login

    constructor (user: UserEntity) { // Construtor da classe LoginPayload que recebe um objeto do tipo UserEntity como parâmetro
        this.registration = user.registration; // Atribui o registro do usuário ao registro do payload de login
        this.role = user.role; // Atribui a função do usuário ao papel do payload de login
    }
}
