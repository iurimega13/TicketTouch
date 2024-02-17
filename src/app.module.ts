import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { AdminsModule } from './admins/admins.module';
import { TechniciansModule } from './technicians/technicians.module';
import { TicketsModule } from './tickets/tickets.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [UserModule, AdminsModule, TechniciansModule, TicketsModule, NotificationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
