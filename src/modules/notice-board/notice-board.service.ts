import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NoticeBoard } from '../../entities/notice-board.entity';
import { CreateNoticeBoardDto } from './dto/create-notice-board.dto';
import { UpdateNoticeBoardDto } from './dto/update-notice-board.dto';

@Injectable()
export class NoticeBoardService {
  constructor(
    @InjectRepository(NoticeBoard)
    private readonly noticeBoardRepository: Repository<NoticeBoard>,
  ) {}

  async create(createNoticeBoardDto: CreateNoticeBoardDto): Promise<NoticeBoard> {
    const notice = this.noticeBoardRepository.create(createNoticeBoardDto);
    return this.noticeBoardRepository.save(notice);
  }

  async findAll(): Promise<NoticeBoard[]> {
    return this.noticeBoardRepository.find({
      where: { isActive: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<NoticeBoard> {
    const notice = await this.noticeBoardRepository.findOne({
      where: { id, isActive: true },
    });
    
    if (!notice) {
      throw new NotFoundException(`Notice with ID ${id} not found`);
    }
    
    return notice;
  }

  async update(id: number, updateNoticeBoardDto: UpdateNoticeBoardDto): Promise<NoticeBoard> {
    const notice = await this.findOne(id);
    Object.assign(notice, updateNoticeBoardDto);
    return this.noticeBoardRepository.save(notice);
  }

  async remove(id: number): Promise<void> {
    const notice = await this.findOne(id);
    notice.isActive = false;
    await this.noticeBoardRepository.save(notice);
  }
} 