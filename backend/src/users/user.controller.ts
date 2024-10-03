import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put, // Importar o decorator Put
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

  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUser: CreateUserDto): Promise<ReturnUserDto> {
    const userEntity = await this.userService.createUser(createUser);
    return new ReturnUserDto(userEntity);
  }

  @Get()
  async getAllUsers(
    @Query('page') page: number = 1,
    @Query('field') field: string = '',
    @Query('term') term: string = '',
    @Query('username') username?: string,
    @Query('name') name?: string,
    @Query('email') email?: string,
    @Query('role') role?: string,
    @Query('phone_number') phone_number?: string,
    @Query('ramal') ramal?: string,
    @Query('unit') unit?: string,
    @Query('department') department?: string,
    @Query('created_at') created_at?: string,
  ): Promise<ReturnUserDto[]> {
    const users = await this.userService.getAllUsers(
      page,
      field,
      term,
      username,
      name,
      email,
      role,
      phone_number,
      ramal,
      unit,
      department,
      created_at,
    );
    if (!users || users.length === 0) {
      throw new NotFoundException('Nenhum usuário encontrado');
    }
    return users.map((userEntity) => new ReturnUserDto(userEntity));
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<ReturnUserDto> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return new ReturnUserDto(user);
  }

  @UsePipes(ValidationPipe)
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<ReturnUserDto> {
    const updatedUser = await this.userService.updateUser(id, updateUserDto);
    return new ReturnUserDto(updatedUser);
  }
}