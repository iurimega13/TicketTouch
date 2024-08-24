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
exports.FaqEntity = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
let FaqEntity = class FaqEntity {
};
exports.FaqEntity = FaqEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], FaqEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(10, 1000),
    __metadata("design:type", String)
], FaqEntity.prototype, "question", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.Length)(10, 1000),
    __metadata("design:type", String)
], FaqEntity.prototype, "answer", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], FaqEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], FaqEntity.prototype, "updated_at", void 0);
exports.FaqEntity = FaqEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'faqs' })
], FaqEntity);
//# sourceMappingURL=faq.entity.js.map