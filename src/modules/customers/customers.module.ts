// src/modules/customers/customers.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './schemas/customer.schema';
import { CustomersController } from './controllers/customers.controller';
import { CustomersService } from './services/customer.service';
import { CustomersRepository } from './repositories/customer.repository';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Customer.name, schema: CustomerSchema },
        ]),
    ],
    controllers: [CustomersController],
    providers: [CustomersService, CustomersRepository],
    exports: [CustomersService],
})
export class CustomersModule { }
