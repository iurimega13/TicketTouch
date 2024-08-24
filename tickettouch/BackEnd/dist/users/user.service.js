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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt_1 = require("bcrypt");
const user_entity_1 = require("./entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const common_2 = require("@nestjs/common");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createUser(createUserDto) {
        console.log(createUserDto);
        try {
            const saltOrRounds = 10;
            const passwordHashed = await (0, bcrypt_1.hash)(createUserDto.password, saltOrRounds);
            const now = new Date();
            const user = {
                ...createUserDto,
                password: passwordHashed,
                created_at: now,
            };
            return await this.userRepository.save(user);
        }
        catch (error) {
            if (error.code === '23505') {
                throw new common_1.ConflictException('Registro duplicado');
            }
            else {
                throw error;
            }
        }
    }
    async getAllUsers() {
        return this.userRepository.find();
    }
    async findById(id) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_2.NotFoundException(`Usuário com ID ${id} não encontrado`);
        }
        return user;
    }
    async findByName(name) {
        const user = await this.userRepository.findOne({ where: { name } });
        if (!user) {
            throw new common_2.NotFoundException(`Usuário com nome ${name} não encontrado`);
        }
        return user;
    }
    async findByRegistration(registration) {
        const user = await this.userRepository.findOne({ where: { registration: Number(registration) } });
        if (!user) {
            throw new common_2.NotFoundException(`Usuário com registro ${registration} não encontrado`);
        }
        return user;
    }
    async findByEmail(email) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new common_2.NotFoundException(`Usuário com email ${email} não encontrado`);
        }
        return user;
    }
    async findByRole(role) {
        const user = await this.userRepository.findOne({ where: { role } });
        if (!user) {
            throw new common_2.NotFoundException(`Usuário com função ${role} não encontrado`);
        }
        return user;
    }
    async findByPhoneNumber(phone_number) {
        const user = await this.userRepository.findOne({ where: { phone_number } });
        if (!user) {
            throw new common_2.NotFoundException(`Usuário com número de telefone ${phone_number} não encontrado`);
        }
        return user;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map