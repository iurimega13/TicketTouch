import { UserEntity } from "src/users/entities/user.entity"; // Importa a classe UserEntity do diretório de entidades de usuários

export class LoginPayload {
    username: string; // Define a propriedade registration do payload de login
    role: number; // Define a propriedade role do payload de login

    constructor (user: UserEntity) { // Construtor da classe LoginPayload que recebe um objeto do tipo UserEntity como parâmetro
        this.username = user.username; // Atribui o registro do usuário ao registro do payload de login, convertendo-o para string
        this.role = Number(user.role); // Converte a função do usuário para número e atribui ao papel do payload de login
    }
}
