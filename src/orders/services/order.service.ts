import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { CreateOrderRequest } from '../../module/dto/create-order-request.dto';
import { v4 as uuidv4 } from 'uuid';
import { Order } from '../schemas/order.schema';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async findAll(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }

  async findById(orderId: string): Promise<Order> {
    return this.orderRepository.findById(orderId);
  }

  async create(createOrderDto: CreateOrderRequest): Promise<Order> {
    const order = {
      orderId: uuidv4(),
      ...createOrderDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return this.orderRepository.create(order);
  }

  async update(
    orderId: string,
    updateOrderDto: Partial<CreateOrderRequest>,
  ): Promise<Order> {
    return this.orderRepository.update(orderId, {
      ...updateOrderDto,
      updatedAt: new Date(),
    });
  }

  async delete(orderId: string): Promise<Order> {
    return this.orderRepository.delete(orderId);
  }
}
