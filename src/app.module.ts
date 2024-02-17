import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { AdminsModule } from './admins/admins.module';
import { TechniciansModule } from './users/technicians.module';
import { TicketsModule } from './tickets/tickets.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
    }),
    TypeOrmModule.forRoot({
      database: `tickettouch`,
      host: `localhost`,
      password: `mysecretpassword`,
      port: 5432,
      username: `postgres`,
      type: 'postgres',
      synchronize: false,
      entities: ['dist/**/*.entity{.ts,.js}'],
    }),
    UserModule, AdminsModule, TechniciansModule, TicketsModule, NotificationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
