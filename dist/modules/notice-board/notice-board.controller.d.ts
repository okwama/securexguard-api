import { NoticeBoardService } from './notice-board.service';
import { CreateNoticeBoardDto } from './dto/create-notice-board.dto';
import { UpdateNoticeBoardDto } from './dto/update-notice-board.dto';
import { NoticeBoard } from '../../entities/notice-board.entity';
export declare class NoticeBoardController {
    private readonly noticeBoardService;
    constructor(noticeBoardService: NoticeBoardService);
    create(createNoticeBoardDto: CreateNoticeBoardDto): Promise<NoticeBoard>;
    findAll(): Promise<NoticeBoard[]>;
    findOne(id: string): Promise<NoticeBoard>;
    update(id: string, updateNoticeBoardDto: UpdateNoticeBoardDto): Promise<NoticeBoard>;
    remove(id: string): Promise<void>;
}
