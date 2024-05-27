// orders/orders.module.ts
import { OrderController } from './controllers/orders.controller';
import { OrderService } from './services/order.service';
import { OrderRepository } from './repositories/order.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import { Module } from '@nestjs/common';
import { ProductClient } from './repositories/clients/product.client';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, ProductClient],
})
export class OrdersModule {}
