import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto'; // Importar o DTO de atualização
import { UnitEntity } from '../units/entities/unit.entity';
import { DepartmentEntity } from '../departments/entities/department.entity';
import { UserSettingsService } from '../user-settings/user-settings.service';
import { CreateSettingsDto } from '../user-settings/dtos/createSettings.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UnitEntity) private readonly unitRepository: Repository<UnitEntity>,
    @InjectRepository(DepartmentEntity) private readonly departmentRepository: Repository<DepartmentEntity>,
    private readonly userSettingsService: UserSettingsService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { unit, department, password, ...userData } = createUserDto;

    const unitEntity = await this.unitRepository.findOne({ where: { id: unit } });
    const departmentEntity = await this.departmentRepository.findOne({ where: { id: department } });

    if (!unitEntity || !departmentEntity) {
      throw new Error('Invalid unit or department ID');
    }

    const hashedPassword = await hash(password, 10);

    const user = this.userRepository.create({
      ...userData,
      password: hashedPassword,
      unit: unitEntity,
      department: departmentEntity,
    });

    const savedUser = await this.userRepository.save(user);

    const defaultSettings: CreateSettingsDto = {
      user_id: savedUser.id,
      theme: 'dark',
      notifications_settings: true,
    };

    await this.userSettingsService.createSettings(savedUser.id, defaultSettings);

    return savedUser;
  }

  async getAllUsers(page: number): Promise<UserEntity[]> {
    const take = 10;
    const skip = (page - 1) * take;
  
    const queryBuilder = this.userRepository.createQueryBuilder('user');
  
    const users = await queryBuilder.take(take).skip(skip).getMany();
  
    if (users.length === 0) {
      throw new NotFoundException('Nenhum usuário encontrado');
    }
  
    return users;
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.findById(id);
    await this.userRepository.remove(user);
  }

  
  async findById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuário: ${id} não encontrado`);
    }
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException(`Usuário: ${id} não encontrado`);
    }

    const { unit, department, ...updateData } = updateUserDto;

    if (unit) {
      const unitEntity = await this.unitRepository.findOne({ where: { id: unit } });
      if (!unitEntity) {
        throw new NotFoundException(`Unidade: ${unit} não encontrada`);
      }
      user.unit = unitEntity;
    }

    if (department) {
      const departmentEntity = await this.departmentRepository.findOne({ where: { id: department } });
      if (!departmentEntity) {
        throw new NotFoundException(`Departamento: ${department} não encontrado`);
      }
      user.department = departmentEntity;
    }

    Object.assign(user, updateData);

    return this.userRepository.save(user);
  }

  async findByUsername(username: string): Promise<UserEntity> {
    // Encontra um usuário pelo seu registro no banco de dados
    const user = await this.userRepository.findOne({ where: { username } });

    // Se o usuário não for encontrado, lança NotFoundException
    if (!user) {
        throw new NotFoundException(`Usuário: ${username} não encontrado`);
    }

    // Retorna o usuário encontrado
    return user;
  }
}