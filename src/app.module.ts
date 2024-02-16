import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AdminsModule } from './admins/admins.module';

@Module({
  imports: [UsersModule, AdminsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
