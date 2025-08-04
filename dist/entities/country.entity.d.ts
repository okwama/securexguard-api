import { Region } from './region.entity';
export declare class Country {
    id: number;
    name: string;
    code: string;
    created_at: Date;
    updated_at: Date;
    regions: Region[];
}
