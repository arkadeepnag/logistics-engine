// src/modules/customers/dto/update-customer.dto.ts
import { IsOptional, IsString, IsBoolean, IsNumber } from 'class-validator';

export class UpdateCustomerDto {
    @IsOptional()
    @IsString()
    customerName?: string;

    @IsOptional()
    @IsBoolean()
    isLocked?: boolean;

    @IsOptional()
    @IsNumber()
    minCharges?: number;
}
