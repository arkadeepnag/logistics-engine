// src/modules/customers/dto/create-customer.dto.ts
import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateCustomerDto {
    @IsString()
    customerName: string;

    @IsOptional()
    @IsString()
    customerPhone?: string;

    @IsOptional()
    @IsString()
    customerGSTIN?: string;

    @IsOptional()
    @IsNumber()
    minCharges?: number;
}
