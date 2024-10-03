// user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dtos/createUser.dto';
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

  async getAllUsers(
    page: number,
    field: string,
    term: string,
    username?: string,
    name?: string,
    email?: string,
    role?: string,
    phone_number?: string,
    ramal?: string,
    unit?: string,
    department?: string,
    created_at?: string,
  ): Promise<UserEntity[]> {
    const take = 10;
    const skip = (page - 1) * take;

    const queryBuilder = this.userRepository.createQueryBuilder('user');

    if (field && term) {
      queryBuilder.where(`user.${field} LIKE :term`, { term: `%${term}%` });
    }

    if (username) {
      queryBuilder.andWhere('user.username LIKE :username', { username: `%${username}%` });
    }

    if (name) {
      queryBuilder.andWhere('user.name LIKE :name', { name: `%${name}%` });
    }

    if (email) {
      queryBuilder.andWhere('user.email LIKE :email', { email: `%${email}%` });
    }

    if (role) {
      queryBuilder.andWhere('user.role LIKE :role', { role: `%${role}%` });
    }

    if (phone_number) {
      queryBuilder.andWhere('user.phone_number LIKE :phone_number', { phone_number: `%${phone_number}%` });
    }

    if (ramal) {
      queryBuilder.andWhere('user.ramal LIKE :ramal', { ramal: `%${ramal}%` });
    }

    if (unit) {
      queryBuilder.andWhere('user.unit.id = :unit', { unit });
    }

    if (department) {
      queryBuilder.andWhere('user.department.id = :department', { department });
    }

    if (created_at) {
      queryBuilder.andWhere('user.created_at = :created_at', { created_at });
    }

    const users = await queryBuilder.take(take).skip(skip).getMany();

    if (users.length === 0) {
      throw new NotFoundException('Nenhum usuário encontrado');
    }

    return users;
  }

  async findById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuário: ${id} não encontrado`);
    }
    return user;
  }
}