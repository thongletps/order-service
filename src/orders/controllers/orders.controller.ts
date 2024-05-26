import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';

import { CreateOrderRequest } from '../../module/dto/create-order-request.dto';
import { Order } from '../schemas/order.schema';
import { OrderService } from '../services/order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async findAll(): Promise<Order[]> {
    console.log('GET /orders called');
    const orders = await this.orderService.findAll();
    console.log('Found orders:', orders);
    return orders;
  }

  @Post()
  async create(
    @Body(ValidationPipe) createOrderDto: CreateOrderRequest,
  ): Promise<Order> {
    console.log('POST /orders called with body:', createOrderDto);
    const newOrder = await this.orderService.create(createOrderDto);
    console.log('Created new order:', newOrder);
    return newOrder;
  }
}
