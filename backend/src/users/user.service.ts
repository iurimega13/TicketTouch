import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial, QueryFailedError } from 'typeorm';
import { compare, hash } from 'bcrypt';
import { UserEntity } from './entities/user.entity';
import { UnitEntity } from '../units/entities/unit.entity';
import { DepartmentEntity } from '../departments/entities/department.entity';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { UserSettingsService } from '../user-settings/user-settings.service';
import { CreateSettingsDto } from '../user-settings/dtos/createSettings.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UnitEntity)
    private readonly unitRepository: Repository<UnitEntity>,
    @InjectRepository(DepartmentEntity)
    private readonly departmentRepository: Repository<DepartmentEntity>,
    private readonly userSettingsService: UserSettingsService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      const { unit, department, password, ...userData } = createUserDto;

      const unitEntity = await this.unitRepository.findOne({
        where: { id: unit },
      });
      const departmentEntity = await this.departmentRepository.findOne({
        where: { id: department },
      });

      if (!unitEntity || !departmentEntity) {
        throw new NotFoundException('Unidade ou departamento inválido');
      }

      const hashedPassword = await hash(password, 10);

      const user = this.userRepository.create({
        ...userData,
        password: hashedPassword,
        unit: unitEntity,
        department: departmentEntity,
      } as DeepPartial<UserEntity>);

      const savedUser = await this.userRepository.save(user);

      const defaultSettings: CreateSettingsDto = {
        user_id: savedUser.id,
        theme: 'dark',
        notifications_settings: true,
      };

      await this.userSettingsService.createSettings(
        savedUser.id,
        defaultSettings,
      );

      return savedUser;
    } catch (error) {
      throw new BadRequestException('Erro ao criar usuário');
    }
  }

  async getAllUsersWithPagination(
    page: number,
    limit: number,
    filter: string,
    sortBy: string,
    sortOrder: 'ASC' | 'DESC',
  ): Promise<{ data: UserEntity[]; total: number }> {
    try {
      const skip = (page - 1) * limit;

      const queryBuilder = this.userRepository.createQueryBuilder('user');

      if (filter) {
        queryBuilder.where('user.name LIKE :filter', { filter: `%${filter}%` });
      }

      queryBuilder.orderBy(`user.${sortBy}`, sortOrder).skip(skip).take(limit);

      const [users, total] = await queryBuilder.getManyAndCount();
      return { data: users, total };
    } catch (error) {
      throw new Error(
        `Erro ao buscar usuários com paginação: ${error.message}`,
      );
    }
  }

  async getAllUsersWithoutPagination(): Promise<UserEntity[]> {
    try {
      const users = await this.userRepository.find();
      return users;
    } catch (error) {
      throw new Error('Erro ao buscar todos os usuários');
    }
  }

  async getUsersByUnit(unitId: string): Promise<UserEntity[]> {
    try {
      const users = await this.userRepository.find({
        where: [
          { role: 'Analyst', unit: { id: unitId } },
          { role: 'admin', unit: { id: unitId } }
        ],
        relations: ['unit', 'department'],
      });
      return users;
    } catch (error) {
      throw new Error('Erro ao buscar usuários por unidade');
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      const user = await this.findById(id);
      await this.userRepository.remove(user);
    } catch (error) {
      throw new BadRequestException('Erro ao deletar usuário');
    }
  }

  async findById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['unit', 'department'],
    });
    if (!user) {
      throw new NotFoundException(`Usuário: ${id} não encontrado`);
    }
    return user;
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    try {
      const user = await this.findById(id);
      if (!user) {
        throw new NotFoundException(`Usuário: ${id} não encontrado`);
      }

      const { unit, department, password, ...updateData } = updateUserDto;

      if (unit) {
        const unitEntity = await this.unitRepository.findOne({
          where: { id: unit },
        });
        if (!unitEntity) {
          throw new NotFoundException(`Unidade: ${unit} não encontrada`);
        }
        user.unit = unitEntity;
      }

      if (department) {
        const departmentEntity = await this.departmentRepository.findOne({
          where: { id: department },
        });
        if (!departmentEntity) {
          throw new NotFoundException(
            `Departamento: ${department} não encontrado`,
          );
        }
        user.department = departmentEntity;
      }

      if (password) {
        user.password = await hash(password, 10);
      }

      Object.assign(user, updateData);

      return this.userRepository.save(user);
    } catch (error) {
      throw new BadRequestException('Erro ao atualizar usuário');
    }
  }

  async findByUsername(username: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: ['unit', 'department'],
    });
    if (!user) {
      throw new NotFoundException(`Usuário: ${username} não encontrado`);
    }
    return user;
  }

  async resetPassword(userId: string): Promise<{ newPassword: string }> {
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${userId} não encontrado`);
    }

    const newPassword = uuidv4().slice(0, 8); 
    const hashedPassword = await hash(newPassword, 10); 

    user.password = hashedPassword; 
    await this.userRepository.save(user);

    return { newPassword }; 
  }

  // Função para alterar a senha do usuário
  async changePassword(
    username: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<void> {
    const user = await this.findByUsername(username);

    // Verificar se a senha atual está correta
    const isPasswordValid = await compare(currentPassword, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Senha atual incorreta.');
    }

    // Criptografar e salvar a nova senha
    user.password = await hash(newPassword, 10);
    await this.userRepository.save(user);
  }
}
