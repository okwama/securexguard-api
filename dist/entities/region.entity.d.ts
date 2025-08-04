import { Country } from './country.entity';
export declare class Region {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
    country_id: number;
    country: Country;
}
