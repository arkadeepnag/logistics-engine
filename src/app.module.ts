// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ShipmentsModule } from './modules/shipments/shipments.module';
import { CustomersModule } from './modules/customers/customers.module';

@Module({
  imports: [
    // ✅ Load .env globally
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // ✅ MongoDB connection using env variables
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI'),
        autoIndex: false,
      }),
    }),

    ShipmentsModule,
    CustomersModule,
  ],
})
export class AppModule { }
