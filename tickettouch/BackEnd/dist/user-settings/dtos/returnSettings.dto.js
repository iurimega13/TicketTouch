"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnSettingsDto = void 0;
class ReturnSettingsDto {
    constructor(settings) {
        this.id = settings.id;
        this.user_id = settings.user;
        this.theme = settings.theme;
        this.notifications_settings = settings.notifications_settings;
        this.created_at = settings.created_at;
        this.updated_at = settings.updated_at;
    }
}
exports.ReturnSettingsDto = ReturnSettingsDto;
//# sourceMappingURL=returnSettings.dto.js.map