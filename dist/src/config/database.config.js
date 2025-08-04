"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatabaseConfig = void 0;
const getDatabaseConfig = (configService) => ({
    type: 'mysql',
    host: configService.get('DB_HOST', '102.130.125.52'),
    port: configService.get('DB_PORT', 3306),
    username: configService.get('DB_USERNAME', 'impulsep_root'),
    password: configService.get('DB_PASSWORD', '@bo9511221.qwerty'),
    database: configService.get('DB_DATABASE', 'impulsep_securex'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false,
    logging: false,
    ssl: false,
    charset: 'utf8mb4',
    timezone: '+03:00',
});
exports.getDatabaseConfig = getDatabaseConfig;
//# sourceMappingURL=database.config.js.map