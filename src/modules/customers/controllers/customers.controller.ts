// src/modules/customers/controllers/customers.controller.ts
import { Controller, Get, Post, Patch, Param, Body, Query } from '@nestjs/common';
import { CustomersService } from '../services/customer.service';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';

@Controller('customers')
export class CustomersController {
    constructor(private readonly customersService: CustomersService) { }

    @Post()
    create(@Body() dto: CreateCustomerDto) {
        return this.customersService.createCustomer(dto);
    }

    @Get()
    list(@Query() query: any) {
        return this.customersService.listCustomers(query);
    }

    @Get(':id')
    get(@Param('id') id: string) {
        return this.customersService.getCustomerById(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() dto: UpdateCustomerDto,
    ) {
        return this.customersService.updateCustomer(id, dto);
    }

    @Get(':id/unpaid')
    unpaid(@Param('id') id: string) {
        return this.customersService.getCustomerUnpaidValue(id);
    }
}
