export declare class CreateJourneyPlanDto {
    premiseId: number;
    routeId: number;
}
export declare class CheckInDto {
    qrCode: string;
    latitude: number;
    longitude: number;
    accuracy?: number;
}
export declare class CheckOutDto {
    latitude: number;
    longitude: number;
    accuracy?: number;
}
