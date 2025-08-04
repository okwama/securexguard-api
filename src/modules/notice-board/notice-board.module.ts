import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticeBoardService } from './notice-board.service';
import { NoticeBoardController } from './notice-board.controller';
import { NoticeBoard } from '../../entities/notice-board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NoticeBoard])],
  controllers: [NoticeBoardController],
  providers: [NoticeBoardService],
  exports: [NoticeBoardService],
})
export class NoticeBoardModule {} 