"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSourcePromise = void 0;
const config_1 = require("@nestjs/config");
const typeorm_1 = require("typeorm");
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
async function createDataSource() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    return new typeorm_1.DataSource({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        migrations: ['dist/migration/**/*{.ts,.js}'],
        synchronize: false,
    });
}
exports.AppDataSourcePromise = createDataSource();
//# sourceMappingURL=ormconfig.js.map