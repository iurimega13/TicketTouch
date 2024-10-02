import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dtos/createUser.dto';
import { UnitEntity } from '../units/entities/unit.entity';
import { DepartmentEntity } from '../departments/entities/department.entity';
import { UserSettingsService } from '../user-settings/user-settings.service';
import { CreateSettingsDto } from '../user-settings/dtos/createSettings.dto';
import { hash } from 'bcrypt'; // Importa a função hash do bcrypt

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UnitEntity) private readonly unitRepository: Repository<UnitEntity>,
    @InjectRepository(DepartmentEntity) private readonly departmentRepository: Repository<DepartmentEntity>,
    private readonly userSettingsService: UserSettingsService, // Injeta o serviço de user settings
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { unit, department, password, ...userData } = createUserDto;

    const unitEntity = await this.unitRepository.findOne({ where: { id: unit } });
    const departmentEntity = await this.departmentRepository.findOne({ where: { id: department } });

    if (!unitEntity || !departmentEntity) {
      throw new Error('Invalid unit or department ID');
    }

    // Criptografar a senha
    const hashedPassword = await hash(password, 10);

    // Criar o usuário
    const user = this.userRepository.create({
      ...userData,
      password: hashedPassword, // Salva a senha criptografada
      unit: unitEntity,
      department: departmentEntity,
    });

    const savedUser = await this.userRepository.save(user);

    // Criar as configurações padrão do usuário
    const defaultSettings: CreateSettingsDto = {
      user_id: savedUser.id,   // Usando o ID do usuário recém-criado
      theme: 'dark',           // Exemplo de configuração padrão
      notifications_settings: true, // Exemplo de configuração padrão
    };

    // Chamar o serviço para criar configurações
    await this.userSettingsService.createSettings(savedUser.id, defaultSettings);

    return savedUser;
  }

  async getAllUsers(page: number, field: string, term: string): Promise<UserEntity[]> {
    const take = 10; // Defina quantos usuários você quer por página
    const skip = (page - 1) * take;
  
    const queryBuilder = this.userRepository.createQueryBuilder('user');
  
    // Verifique se os campos estão definidos
    if (field && term) {
      queryBuilder.where(`user.${field} LIKE :term`, { term: `%${term}%` });
    }
  
    return await queryBuilder.take(take).skip(skip).getMany();
  }

  async findById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuário: ${id} não encontrado`);
    }
    return user;
  }

  async findByUsername(username: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException(`Usuário: ${username} não encontrado`);
    }
    return user;
  }
}