import {
  Body,
  Controller,
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

  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUser: CreateUserDto): Promise<ReturnUserDto> {
    const userEntity = await this.userService.createUser(createUser);
    return new ReturnUserDto(userEntity);
  }

  @Get('all')
  async getAllUsersWithoutPagination(): Promise<ReturnUserDto[]> {
    const users = await this.userService.getAllUsersWithoutPagination();
    return users.map(user => new ReturnUserDto(user));
  }

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