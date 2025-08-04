import { Premises } from './premises.entity';
export declare class Guard {
    id: number;
    name: string;
    photoUrl: string;
    emplNo: string;
    idNo: string;
    phone: string;
    email: string;
    premiseId: number | null;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    premise: Premises;
}
