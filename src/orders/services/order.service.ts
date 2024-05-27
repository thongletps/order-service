import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { CreateOrderRequest } from '../../module/dto/create-order-request.dto';
import { v4 as uuidv4 } from 'uuid';
import { Order, OrderItem } from '../schemas/order.schema';
import { ProductClient } from '../repositories/clients/product.client';
import { StandardResponseDto } from '../../module/dto/standard-response.dto';
import { ProductResponseDto } from '../../module/dto/product/product.response.dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productClient: ProductClient,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }

  async findById(orderId: string): Promise<Order> {
    return this.orderRepository.findById(orderId);
  }

  async create(createOrderDto: CreateOrderRequest): Promise<Order> {
    const orderItems: OrderItem[] = await Promise.all(
      Object.entries(createOrderDto.productQuantities || {}).map(
        async ([productId, quantity]) => {
          try {
            const productResponse: StandardResponseDto<ProductResponseDto> =
              await this.productClient.getProductByProductId(productId);
            const product = productResponse.data;

            return {
              productId,
              name: product.name,
              quantity,
              price: product.price,
            };
          } catch (error) {
            console.error(
              `Error fetching product details for productId ${productId}:`,
              error,
            );
            throw new Error(
              `Could not fetch details for productId ${productId}`,
            );
          }
        },
      ),
    );

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
