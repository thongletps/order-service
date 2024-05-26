import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { CreateOrderRequest } from '../../module/dto/create-order-request.dto';
import { v4 as uuidv4 } from 'uuid';
import { Order, OrderItem } from '../schemas/order.schema';

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
    const orderItems: OrderItem[] = Object.entries(
      createOrderDto.productQuantities || {},
    ).map(([productId, quantity]) => {
      const name = `Product ${productId}`; // Replace with actual product name fetching
      const price = 100; // Replace with actual product price fetching
      return { productId, name, quantity, price };
    });

    const totalAmount = orderItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0,
    );

    const orderPlain = {
      orderId: uuidv4(),
      orderItems,
      totalAmount,
      orderStatus: createOrderDto.orderStatus || 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return this.orderRepository.create(orderPlain);
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
