"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./users/user.module");
const tickets_module_1 = require("./tickets/tickets.module");
const notifications_module_1 = require("./notifications/notifications.module");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const equipments_module_1 = require("./equipments/equipments.module");
const auth_module_1 = require("./auth/auth.module");
const ticket_categories_module_1 = require("./ticket-categories/ticket-categories.module");
const attachments_module_1 = require("./attachments/attachments.module");
const ticket_changes_module_1 = require("./ticket-changes/ticket-changes.module");
const slas_module_1 = require("./slas/slas.module");
const faqs_module_1 = require("./faqs/faqs.module");
const departaments_module_1 = require("./departaments/departaments.module");
const units_module_1 = require("./units/units.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: ['../.env'],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
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
            user_module_1.UserModule, tickets_module_1.TicketsModule, notifications_module_1.NotificationsModule, auth_module_1.AuthModule, ticket_categories_module_1.TicketCategoriesModule, attachments_module_1.AttachmentsModule, ticket_changes_module_1.TicketChangesModule, slas_module_1.SlasModule, faqs_module_1.FaqsModule, equipments_module_1.EquipmentsModule, units_module_1.UnitsModule, departaments_module_1.DepartamentsModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map