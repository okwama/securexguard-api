import { Repository } from 'typeorm';
import { NoticeBoard } from '../../entities/notice-board.entity';
import { CreateNoticeBoardDto } from './dto/create-notice-board.dto';
import { UpdateNoticeBoardDto } from './dto/update-notice-board.dto';
export declare class NoticeBoardService {
    private readonly noticeBoardRepository;
    constructor(noticeBoardRepository: Repository<NoticeBoard>);
    create(createNoticeBoardDto: CreateNoticeBoardDto): Promise<NoticeBoard>;
    findAll(): Promise<NoticeBoard[]>;
    findOne(id: number): Promise<NoticeBoard>;
    update(id: number, updateNoticeBoardDto: UpdateNoticeBoardDto): Promise<NoticeBoard>;
    remove(id: number): Promise<void>;
}
