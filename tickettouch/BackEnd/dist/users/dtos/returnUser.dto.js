"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnUserDto = void 0;
class ReturnUserDto {
    constructor(user) {
        this.id = user.id;
        this.registration = user.registration;
        this.name = user.name;
        this.email = user.email;
        this.role = user.role;
        this.phone_number = user.phone_number;
        this.unit = user.unit;
        this.department = user.department;
        this.created_at = user.created_at;
    }
}
exports.ReturnUserDto = ReturnUserDto;
//# sourceMappingURL=returnUser.dto.js.map