"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnDepartamentDto = void 0;
class ReturnDepartamentDto {
    constructor(departament) {
        this.id = departament.id;
        this.name = departament.name;
        this.unit_id = departament.unit.id;
        this.created_at = departament.created_at;
    }
}
exports.ReturnDepartamentDto = ReturnDepartamentDto;
//# sourceMappingURL=returnDepartament.dto.js.map