import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { JourneyPlansModule } from './modules/journey-plans/journey-plans.module';
import { PremisesModule } from './modules/premises/premises.module';
import { UploadModule } from './modules/upload/upload.module';
import { GuardsModule } from './modules/guards/guards.module';
import { ReportsModule } from './modules/reports/reports.module';
import { NoticeBoardModule } from './modules/notice-board/notice-board.module';
import { LeaveModule } from './modules/leave/leave.module';
import { getDatabaseConfig } from './config/database.config';

// Import all entities
import { Staff } from './entities/staff.entity';
import { Premises } from './entities/premises.entity';
import { Sos } from './entities/sos.entity';
import { Zone } from './entities/zone.entity';
import { Region } from './entities/region.entity';
import { Country } from './entities/country.entity';
import { JourneyPlan } from './entities/journey-plan.entity';
import { Guard } from './entities/guard.entity';
import { Report } from './entities/report.entity';
import { GuardReport } from './entities/guard-report.entity';
import { PremiseReport } from './entities/premise-report.entity';
import { NoticeBoard } from './entities/notice-board.entity';
import { Leave } from './entities/leave.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => getDatabaseConfig(configService),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    AuthModule,
    JourneyPlansModule,
    PremisesModule,
    UploadModule,
    GuardsModule,
    ReportsModule,
    NoticeBoardModule,
    LeaveModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
