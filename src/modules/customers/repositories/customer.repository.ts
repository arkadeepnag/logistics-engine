// src/modules/customers/repositories/customers.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from '../schemas/customer.schema';
import { Model } from 'mongoose';

@Injectable()
export class CustomersRepository {
    constructor(
        @InjectModel(Customer.name)
        private readonly customerModel: Model<Customer>,
    ) { }

    create(data: Partial<Customer>) {
        return this.customerModel.create(data);
    }

    findById(id: string) {
        return this.customerModel.findById(id);
    }

    findAll(filters = {}) {
        return this.customerModel.find(filters).sort({ createdAt: -1 });
    }

    update(id: string, data: Partial<Customer>) {
        return this.customerModel.findByIdAndUpdate(id, data, { new: true });
    }
}
