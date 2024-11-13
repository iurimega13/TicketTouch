import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static'; // Importa o ServeStaticModule para servir arquivos estáticos
import { join } from 'path'; // Importa join para configurar caminhos
import * as fs from 'fs'; // Importa o fs para manipular o sistema de arquivos

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { TicketsModule } from './tickets/tickets.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipmentsModule } from './equipments/equipments.module';
import { AuthModule } from './auth/auth.module';
import { TicketChangesModule } from './ticket-changes/ticket-changes.module';
import { SlasModule } from './slas/slas.module';
import { FaqsModule } from './faqs/faqs.module';
import { DepartmentsModule } from './departments/departments.module';
import { UnitsModule } from './units/units.module';
import { UserSettingsModule } from './user-settings/user-settings.module';
import { UserFeedbackModule } from './user-feedback/user-feedback.module';

@Module({
  imports: [
    // Configuração do ambiente e banco de dados
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['../.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        database: configService.get('DATABASE_NAME'),
        host: configService.get('DATABASE_HOST'),
        password: configService.get('DATABASE_PASSWORD'),
        port: Number(configService.get('DATABASE_PORT')),
        username: configService.get('DATABASE_USER'),
        synchronize: false,
        entities: ['dist/**/*.entity{.ts,.js}'],
      }),
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads/tickets'),
      serveRoot: '/uploads/tickets',
    }),

    UserModule,
    TicketsModule,
    NotificationsModule,
    AuthModule,
    TicketChangesModule,
    SlasModule,
    FaqsModule,
    EquipmentsModule,
    UnitsModule,
    DepartmentsModule,
    UserSettingsModule,
    UserFeedbackModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  constructor() {
  }
}
