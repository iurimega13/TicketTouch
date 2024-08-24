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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../users/user.service");
const bcrypt_1 = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const returnUser_dto_1 = require("../users/dtos/returnUser.dto");
const loginPayload_dto_1 = require("./dtos/loginPayload.dto");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async login(LoginDto) {
        const user = await this.userService.findByRegistration(LoginDto.registration);
        if (!user) {
            throw new common_1.NotFoundException(`Usuário com registro ${LoginDto.registration} não encontrado`);
        }
        const isMatch = await (0, bcrypt_1.compare)(LoginDto.password, user.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Senha incorreta');
        }
        return {
            acessToken: this.jwtService.sign({ ...new loginPayload_dto_1.LoginPayload(user) }),
            user: new returnUser_dto_1.ReturnUserDto(user)
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map