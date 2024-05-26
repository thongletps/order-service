import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';

import { CreateOrderRequest } from '../../module/dto/create-order-request.dto';
import { Order } from '../schemas/order.schema';
import { OrderService } from '../services/order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async findAll(): Promise<Order[]> {
    console.log('hello');
    return this.orderService.findAll();
  }

  @Post()
  async create(
    @Body(ValidationPipe) createOrderDto: CreateOrderRequest,
  ): Promise<Order> {
    return this.orderService.create(createOrderDto);
  }
}
