import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { NoticeBoardService } from './notice-board.service';
import { CreateNoticeBoardDto } from './dto/create-notice-board.dto';
import { UpdateNoticeBoardDto } from './dto/update-notice-board.dto';
import { NoticeBoard } from '../../entities/notice-board.entity';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('notice-board')
@Controller('notice-board')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class NoticeBoardController {
  constructor(private readonly noticeBoardService: NoticeBoardService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new notice' })
  @ApiResponse({ status: 201, description: 'Notice created successfully', type: NoticeBoard })
  create(@Body() createNoticeBoardDto: CreateNoticeBoardDto): Promise<NoticeBoard> {
    return this.noticeBoardService.create(createNoticeBoardDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active notices' })
  @ApiResponse({ status: 200, description: 'Notices retrieved successfully', type: [NoticeBoard] })
  findAll(): Promise<NoticeBoard[]> {
    return this.noticeBoardService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific notice by ID' })
  @ApiParam({ name: 'id', description: 'Notice ID' })
  @ApiResponse({ status: 200, description: 'Notice retrieved successfully', type: NoticeBoard })
  @ApiResponse({ status: 404, description: 'Notice not found' })
  findOne(@Param('id') id: string): Promise<NoticeBoard> {
    return this.noticeBoardService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a notice' })
  @ApiParam({ name: 'id', description: 'Notice ID' })
  @ApiResponse({ status: 200, description: 'Notice updated successfully', type: NoticeBoard })
  @ApiResponse({ status: 404, description: 'Notice not found' })
  update(@Param('id') id: string, @Body() updateNoticeBoardDto: UpdateNoticeBoardDto): Promise<NoticeBoard> {
    return this.noticeBoardService.update(+id, updateNoticeBoardDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a notice (soft delete)' })
  @ApiParam({ name: 'id', description: 'Notice ID' })
  @ApiResponse({ status: 200, description: 'Notice deleted successfully' })
  @ApiResponse({ status: 404, description: 'Notice not found' })
  remove(@Param('id') id: string): Promise<void> {
    return this.noticeBoardService.remove(+id);
  }
} 