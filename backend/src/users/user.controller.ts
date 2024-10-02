import { Body, Controller, Get, NotFoundException, Param, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { ReturnUserDto } from './dtos/returnUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUser);
  }

  @Get()
async getAllUsers(
  @Query('page') page: number = 1, // Defina um valor padrão para a página
  @Query('field') field: string = '',
  @Query('term') term: string = '',
): Promise<ReturnUserDto[]> {
  const users = await this.userService.getAllUsers(page, field, term);
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
}