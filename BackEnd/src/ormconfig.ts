import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; // Assumindo que você tem um AppModule que importa o ConfigModule

async function createDataSource(): Promise<DataSource> {
  const app = await NestFactory.createApplicationContext(AppModule);
  const configService = app.get(ConfigService);

  return new DataSource({
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: +configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migration/**/*{.ts,.js}'],
    synchronize: false,
  });
}

export const AppDataSourcePromise = createDataSource();
