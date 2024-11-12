import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto'; // Importar o DTO de atualização
import { UserService } from './user.service';
import { ReturnUserDto } from './dtos/returnUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Rota para criar um usuário
  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUser: CreateUserDto): Promise<ReturnUserDto> {
    const userEntity = await this.userService.createUser(createUser);
    return new ReturnUserDto(userEntity);
  }

  // Rota para buscar todos os usuários sem paginação
  @Get('all')
  async getAllUsersWithoutPagination(): Promise<ReturnUserDto[]> {
    const users = await this.userService.getAllUsersWithoutPagination();
    return users.map(user => new ReturnUserDto(user));
  }

  // Rota para buscar todos os usuários com paginação
  @Get()
  async getAllUsersWithPagination(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
    @Query('filter') filter: string = '',
    @Query('sortBy') sortBy: string = 'name',
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
  ): Promise<{ data: ReturnUserDto[]; total: number }> {
    const { data, total } = await this.userService.getAllUsersWithPagination(
      page,
      limit,
      filter,
      sortBy,
      sortOrder,
    );
    const result = data.map(user => new ReturnUserDto(user));
    return { data: result, total };
  }

  // Rota para buscar um usuário por ID
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<ReturnUserDto> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return new ReturnUserDto(user);
  }

  @Get('unit/:unitId')
  async getUsersByUnit(@Param('unitId') unitId: string): Promise<ReturnUserDto[]> {
    const users = await this.userService.getUsersByUnit(unitId);
    return users.map(user => new ReturnUserDto(user));
  }

  // Rota para atualizar um usuário
  @UsePipes(ValidationPipe)
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<ReturnUserDto> {
    const updatedUser = await this.userService.updateUser(id, updateUserDto);
    return new ReturnUserDto(updatedUser);
  }

  // Rota para deletar um usuário
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<{ message: string }> {
    await this.userService.deleteUser(id);
    return { message: 'User deleted successfully' };
  }

  // Rota para resetar a senha do usuário
  @Post(':id/reset-password')
  async resetPassword(@Param('id') userId: string): Promise<{ newPassword: string }> {
    return this.userService.resetPassword(userId);
  }

  // Rota para mudar a senha do usuário
  @Post('change-password')
  async changePassword(
    @Body() body: { username: string; currentPassword: string; newPassword: string }
  ): Promise<void> {
    const { username, currentPassword, newPassword } = body;
    await this.userService.changePassword(username, currentPassword, newPassword);
  }
}