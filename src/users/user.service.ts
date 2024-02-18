import { Injectable } from '@nestjs/common'; // Importa o decorator Injectable do NestJS
import { hash } from 'bcrypt'; // Importa a função hash do bcrypt para criptografar senhas
import { createUserDto } from './dtos/createUser.dto'; // Importa o DTO para criar um usuário
import { UserEntity } from './entities/user.entity'; // Importa a classe UserEntity
import { InjectRepository } from '@nestjs/typeorm'; // Importa o decorator InjectRepository do TypeORM para injeção de dependência
import { Repository } from 'typeorm'; // Importa a classe Repository do TypeORM para interagir com o banco de dados
import { NotFoundException } from '@nestjs/common'; // Importa a exceção NotFoundException do NestJS

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>, // Injeta o repositório para UserEntity
    ){}
   

    async createUser(createUserDto: createUserDto): Promise<UserEntity> {
        // Criptografa a senha usando bcrypt
        const saltOrRounds = 10; // Define o número de rounds para a criptografia
        const passwordHashed = await hash(createUserDto.password, saltOrRounds); // Criptografa a senha

        // Salva o usuário no banco de dados
        return this.userRepository.save({
            ...createUserDto,
            password: passwordHashed, // Armazena a senha criptografada
        });
    }

    async getAllUsers(): Promise<UserEntity[]> {
        // Retorna todos os usuários do banco de dados
        return this.userRepository.find();
    }

    async findById(id: number): Promise<UserEntity> {
        // Encontra um usuário pelo seu ID no banco de dados
        const user = await this.userRepository.findOne({ where: { id } });

        // Se o usuário não for encontrado, lança NotFoundException
        if (!user) {
            throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
        }

        return user;
    }

    async findByName(name: string): Promise<UserEntity> {
        // Encontra um usuário pelo seu nome no banco de dados
        const user = await this.userRepository.findOne({ where: { name } });

        // Se o usuário não for encontrado, lança NotFoundException
        if (!user) {
            throw new NotFoundException(`Usuário com nome ${name} não encontrado`);
        }

        return user;
    }

    async findByRegistration(registration: string): Promise<UserEntity> {
        // Encontra um usuário pelo seu registro no banco de dados
        const user = await this.userRepository.findOne({ where: { registration } });

        // Se o usuário não for encontrado, lança NotFoundException
        if (!user) {
            throw new NotFoundException(`Usuário com registro ${registration} não encontrado`);
        }

        return user;
    }

    async findByEmail(email: string): Promise<UserEntity> {
        // Encontra um usuário pelo seu email no banco de dados
        const user = await this.userRepository.findOne({ where: { email } });

        // Se o usuário não for encontrado, lança NotFoundException
        if (!user) {
            throw new NotFoundException(`Usuário com email ${email} não encontrado`);
        }

        return user;
    }

    async findByRole(role: string): Promise<UserEntity> {
        // Encontra um usuário pelo seu papel/função no banco de dados
        const user = await this.userRepository.findOne({ where: { role } });

        // Se o usuário não for encontrado, lança NotFoundException
        if (!user) {
            throw new NotFoundException(`Usuário com função ${role} não encontrado`);
        }

        return user;
    }

    async findByPhoneNumber(phone_number: string): Promise<UserEntity> {
        // Encontra um usuário pelo seu número de telefone no banco de dados
        const user = await this.userRepository.findOne({ where: { phone_number } });

        // Se o usuário não for encontrado, lança NotFoundException
        if (!user) {
            throw new NotFoundException(`Usuário com número de telefone ${phone_number} não encontrado`);
        }

        return user;
    }
    
}
