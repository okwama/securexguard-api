"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLeaveDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_leave_dto_1 = require("./create-leave.dto");
class UpdateLeaveDto extends (0, swagger_1.PartialType)(create_leave_dto_1.CreateLeaveDto) {
}
exports.UpdateLeaveDto = UpdateLeaveDto;
//# sourceMappingURL=update-leave.dto.js.map