"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNoticeBoardDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_notice_board_dto_1 = require("./create-notice-board.dto");
class UpdateNoticeBoardDto extends (0, swagger_1.PartialType)(create_notice_board_dto_1.CreateNoticeBoardDto) {
}
exports.UpdateNoticeBoardDto = UpdateNoticeBoardDto;
//# sourceMappingURL=update-notice-board.dto.js.map