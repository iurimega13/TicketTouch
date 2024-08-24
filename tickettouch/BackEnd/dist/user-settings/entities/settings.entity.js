"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsEntity = void 0;
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
let SettingsEntity = class SettingsEntity {
};
exports.SettingsEntity = SettingsEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SettingsEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], SettingsEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'notifications_settings', nullable: false }),
    __metadata("design:type", String)
], SettingsEntity.prototype, "notifications_settings", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'theme', nullable: false }),
    __metadata("design:type", String)
], SettingsEntity.prototype, "theme", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', nullable: false }),
    __metadata("design:type", Date)
], SettingsEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', nullable: false }),
    __metadata("design:type", Date)
], SettingsEntity.prototype, "updated_at", void 0);
exports.SettingsEntity = SettingsEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'settings' })
], SettingsEntity);
//# sourceMappingURL=settings.entity.js.map