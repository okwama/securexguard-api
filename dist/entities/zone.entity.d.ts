import { Region } from './region.entity';
export declare class Zone {
    id: number;
    name: string;
    region_id: number;
    created_at: Date;
    updated_at: Date;
    region: Region;
}
