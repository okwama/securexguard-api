"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJwtConfig = void 0;
const getJwtConfig = (configService) => ({
    secret: configService.get('JWT_SECRET', 'your-super-secret-jwt-key-change-in-production'),
    signOptions: {
        expiresIn: configService.get('JWT_EXPIRES_IN', '5h'),
    },
});
exports.getJwtConfig = getJwtConfig;
//# sourceMappingURL=jwt.config.js.map