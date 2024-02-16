import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {

    @Get()
    async getUsers() {
        return JSON.stringify({ test: 'Get all users' });
    }
}
