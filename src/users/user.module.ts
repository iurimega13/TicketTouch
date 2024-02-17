import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
    }),
    TypeOrmModule.forRoot({
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      password: `mysecretpassword`,
      port: parseInt(process.env.DB_PORT),
      username: `postgres`,
      type: 'postgres',
    }),
    UserModule,
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
