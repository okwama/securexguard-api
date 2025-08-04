import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { JourneyPlan, RoutePlanStatus } from '../../entities/journey-plan.entity';
import { Premises } from '../../entities/premises.entity';
import { Staff } from '../../entities/staff.entity';
import { CreateJourneyPlanDto, CheckInDto, CheckOutDto } from './dto/create-journey-plan.dto';
import { PaginationDto, PaginatedResponseDto } from '../../common/dto/pagination.dto';

@Injectable()
export class JourneyPlansService {
  constructor(
    @InjectRepository(JourneyPlan)
    private journeyPlanRepository: Repository<JourneyPlan>,
    @InjectRepository(Premises)
    private premisesRepository: Repository<Premises>,
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
  ) {}

  async create(createJourneyPlanDto: CreateJourneyPlanDto, supervisorId: number): Promise<JourneyPlan> {
    console.log(`🔵 CREATE JP REQUEST - Supervisor ID: ${supervisorId}`);
    console.log(`🔵 CREATE JP PAYLOAD:`, {
      premiseId: createJourneyPlanDto.premiseId,
      routeId: createJourneyPlanDto.routeId,
    });

    const premises = await this.premisesRepository.findOne({
      where: { id: createJourneyPlanDto.premiseId }
    });

    if (!premises) {
      console.log(`❌ CREATE JP ERROR - Premises not found with ID: ${createJourneyPlanDto.premiseId}`);
      throw new NotFoundException('Premises not found');
    }

    const journeyPlan = this.journeyPlanRepository.create({
      supervisorId,
      premiseId: createJourneyPlanDto.premiseId,
      routeId: createJourneyPlanDto.routeId,
      status: RoutePlanStatus.PENDING,
      createdAt: new Date(), // Explicitly set createdAt since database field is NOT NULL
    });

    const savedJourneyPlan = await this.journeyPlanRepository.save(journeyPlan);
    
    console.log(`✅ CREATE JP SUCCESS - Journey Plan created:`, {
      id: savedJourneyPlan.id,
      supervisorId: savedJourneyPlan.supervisorId,
      premiseId: savedJourneyPlan.premiseId,
      status: savedJourneyPlan.status,
      createdAt: savedJourneyPlan.createdAt,
    });

    return savedJourneyPlan;
  }

  async getStaffJourneyPlans(supervisorId: number): Promise<JourneyPlan[]> {
    return this.journeyPlanRepository.find({
      where: { supervisorId },
      relations: ['premise'],
      order: { id: 'DESC' },
    });
  }

  async getAllJourneyPlans(paginationDto: PaginationDto): Promise<PaginatedResponseDto<JourneyPlan>> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const [journeyPlans, total] = await this.journeyPlanRepository.findAndCount({
      relations: ['supervisor', 'premise'],
      order: { id: 'DESC' },
      skip,
      take: limit,
    });

    return new PaginatedResponseDto(journeyPlans, total, page, limit);
  }

  async validateQrCode(qrCode: string, supervisorId: number): Promise<any> {
    // For now, we'll use premises ID as QR code since there's no QR code field in premises table
    const premises = await this.premisesRepository.findOne({
      where: { id: parseInt(qrCode) }
    });

    if (!premises) {
      throw new NotFoundException('Invalid QR code');
    }

    const journeyPlans = await this.journeyPlanRepository.find({
      where: {
        premiseId: premises.id,
        supervisorId,
        status: RoutePlanStatus.PENDING,
      },
    });

    return {
      success: true,
      premises,
      journeyPlans,
    };
  }

  async checkIn(journeyPlanId: number, checkInDto: CheckInDto, supervisorId: number): Promise<JourneyPlan> {
    console.log(`🔵 CHECKIN REQUEST - Journey Plan ID: ${journeyPlanId}, Supervisor ID: ${supervisorId}`);
    console.log(`🔵 CHECKIN PAYLOAD:`, {
      qrCode: checkInDto.qrCode,
      latitude: checkInDto.latitude,
      longitude: checkInDto.longitude,
    });

    const journeyPlan = await this.journeyPlanRepository.findOne({
      where: { id: journeyPlanId, supervisorId },
      relations: ['premise'],
    });

    if (!journeyPlan) {
      console.log(`❌ CHECKIN ERROR - Journey plan not found for ID ${journeyPlanId} and supervisor ${supervisorId}`);
      throw new NotFoundException('Journey plan not found');
    }

    console.log(`🔵 CHECKIN - Journey Plan Status: ${journeyPlan.status} (0=Pending, 1=InProgress, 2=Completed)`);

    if (journeyPlan.status !== RoutePlanStatus.PENDING) {
      console.log(`❌ CHECKIN ERROR - Journey plan is not in pending status. Current status: ${journeyPlan.status}`);
      throw new BadRequestException('Journey plan is not in pending status');
    }

    // DEMO MODE: Skip QR code validation for demo purposes
    console.log(`🔵 DEMO MODE - Skipping QR code validation`);
    console.log(`🔵 DEMO MODE - Expected QR: ${journeyPlan.premise.id}, Received QR: ${checkInDto.qrCode}`);
    
    // Original validation (commented out for demo):
    // if (journeyPlan.premise.id.toString() !== checkInDto.qrCode) {
    //   console.log(`❌ CHECKIN ERROR - QR code mismatch. Expected: ${journeyPlan.premise.id}, Received: ${checkInDto.qrCode}`);
    //   throw new BadRequestException('QR code does not match premises');
    // }

    journeyPlan.status = RoutePlanStatus.IN_PROGRESS;
    journeyPlan.checkinTime = new Date();
    journeyPlan.checkin_latitude = checkInDto.latitude;
    journeyPlan.checkin_longitude = checkInDto.longitude;

    const savedJourneyPlan = await this.journeyPlanRepository.save(journeyPlan);
    
    console.log(`✅ CHECKIN SUCCESS - Journey Plan updated:`, {
      id: savedJourneyPlan.id,
      status: savedJourneyPlan.status,
      checkinTime: savedJourneyPlan.checkinTime,
      checkin_latitude: savedJourneyPlan.checkin_latitude,
      checkin_longitude: savedJourneyPlan.checkin_longitude,
    });

    return savedJourneyPlan;
  }

  async checkOut(journeyPlanId: number, checkOutDto: CheckOutDto, supervisorId: number): Promise<JourneyPlan> {
    console.log(`🔵 CHECKOUT REQUEST - Journey Plan ID: ${journeyPlanId}, Supervisor ID: ${supervisorId}`);
    console.log(`🔵 CHECKOUT PAYLOAD:`, {
      latitude: checkOutDto.latitude,
      longitude: checkOutDto.longitude,
    });
    
    const journeyPlan = await this.journeyPlanRepository.findOne({
      where: { id: journeyPlanId, supervisorId },
    });

    if (!journeyPlan) {
      console.log(`❌ CHECKOUT ERROR - Journey plan not found for ID ${journeyPlanId} and supervisor ${supervisorId}`);
      throw new NotFoundException('Journey plan not found');
    }

    console.log(`🔵 CHECKOUT - Journey Plan Status: ${journeyPlan.status} (0=Pending, 1=InProgress, 2=Completed)`);
    
    // If already completed, return the existing journey plan
    if (journeyPlan.status === RoutePlanStatus.COMPLETED) {
      console.log(`✅ CHECKOUT - Journey plan already completed, returning existing data`);
      return journeyPlan;
    }
    
    if (journeyPlan.status !== RoutePlanStatus.IN_PROGRESS) {
      console.log(`❌ CHECKOUT ERROR - Journey plan not in progress. Current status: ${journeyPlan.status}`);
      throw new BadRequestException('Journey plan is not in progress');
    }

    journeyPlan.status = RoutePlanStatus.COMPLETED;
    journeyPlan.checkoutTime = new Date();
    journeyPlan.checkout_latitude = checkOutDto.latitude;
    journeyPlan.checkout_longitude = checkOutDto.longitude;

    console.log(`✅ CHECKOUT SUCCESS - Saving journey plan with data:`, {
      id: journeyPlan.id,
      status: journeyPlan.status,
      checkoutTime: journeyPlan.checkoutTime,
      checkout_latitude: journeyPlan.checkout_latitude,
      checkout_longitude: journeyPlan.checkout_longitude,
    });

    return this.journeyPlanRepository.save(journeyPlan);
  }

  async getJourneyPlansByStatus(status: RoutePlanStatus): Promise<JourneyPlan[]> {
    return this.journeyPlanRepository.find({
      where: { status },
      relations: ['supervisor', 'premise'],
      order: { id: 'DESC' },
    });
  }

  async getCurrentDayJourneyPlans(paginationDto: PaginationDto, supervisorId: number) {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    // Use Kenya time zone (UTC+3) for current day calculation
    const kenyaTime = new Date();
    kenyaTime.setHours(kenyaTime.getHours() + 3); // Convert UTC to Kenya time
    
    const today = new Date(kenyaTime);
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [journeyPlans, total] = await this.journeyPlanRepository.findAndCount({
      where: { 
        supervisorId,
        createdAt: Between(today, tomorrow), // Use createdAt instead of checkinTime
      },
      relations: ['supervisor', 'premise'],
      order: { id: 'DESC' },
      skip,
      take: limit,
    });

    return {
      data: journeyPlans,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async deleteJourneyPlan(journeyPlanId: number, supervisorId: number): Promise<{ message: string }> {
    console.log(`🔵 DELETE JP REQUEST - Journey Plan ID: ${journeyPlanId}, Supervisor ID: ${supervisorId}`);
    
    const journeyPlan = await this.journeyPlanRepository.findOne({
      where: { id: journeyPlanId, supervisorId },
    });

    if (!journeyPlan) {
      console.log(`❌ DELETE JP ERROR - Journey plan not found for ID ${journeyPlanId} and supervisor ${supervisorId}`);
      throw new NotFoundException('Journey plan not found');
    }

    console.log(`🔵 DELETE JP - Journey Plan Status: ${journeyPlan.status} (0=Pending, 1=InProgress, 2=Completed)`);
    
    // Only allow deletion of pending journey plans
    if (journeyPlan.status !== RoutePlanStatus.PENDING) {
      console.log(`❌ DELETE JP ERROR - Cannot delete journey plan that is not pending. Current status: ${journeyPlan.status}`);
      throw new BadRequestException('Cannot delete journey plan that is not pending');
    }

    await this.journeyPlanRepository.remove(journeyPlan);
    
    console.log(`✅ DELETE JP SUCCESS - Journey Plan ${journeyPlanId} deleted successfully`);
    
    return { message: 'Journey plan deleted successfully' };
  }
} 