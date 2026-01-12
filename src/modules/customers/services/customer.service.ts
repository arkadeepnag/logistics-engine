// src/modules/customers/services/customers.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CustomersRepository } from '../repositories/customer.repository';

@Injectable()
export class CustomersService {
    constructor(private readonly repo: CustomersRepository) { }

    async createCustomer(data: any) {
        return this.repo.create(data);
    }

    async getCustomerById(id: string) {
        const customer = await this.repo.findById(id);
        if (!customer) {
            throw new NotFoundException('Customer not found');
        }
        return customer;
    }

    async listCustomers(query?: any) {
        return this.repo.findAll(query);
    }

    async updateCustomer(id: string, data: any) {
        const updated = await this.repo.update(id, data);
        if (!updated) {
            throw new NotFoundException('Customer not found');
        }
        return updated;
    }

    /**
     * IMPORTANT:
     * This is READ-ONLY.
     * Real unpaid calculation will later come from Ledger.
     */
    async getCustomerUnpaidValue(id: string) {
        const customer = await this.getCustomerById(id);
        return {
            customerId: id,
            unpaidValue: customer.unpaidValue,
        };
    }
}
