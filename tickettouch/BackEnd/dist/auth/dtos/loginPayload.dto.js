"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginPayload = void 0;
class LoginPayload {
    constructor(user) {
        this.registration = String(user.registration);
        this.role = user.role;
    }
}
exports.LoginPayload = LoginPayload;
//# sourceMappingURL=loginPayload.dto.js.map