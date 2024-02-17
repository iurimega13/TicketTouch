import { Body, Controller, Get, Post } from '@nestjs/common';
import { createUserDto } from './dtos/createUser.dto'; // Import the missing module or class
@Controller('users')
export class UsersController {

    @Post()
    async createUsers(
        @Body() createUser: createUserDto
        ) { 
        return {
            message: 'User created successfully',
            ...createUser,
            password: '**********'
        };
    }
}
