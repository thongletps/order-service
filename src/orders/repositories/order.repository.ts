import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../schemas/order.schema';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  async findById(orderId: string): Promise<Order> {
    return this.orderModel.findOne({ orderId }).exec();
  }

  async create(order: Partial<Order>): Promise<Order> {
    const createdOrder = new this.orderModel(order);
    return createdOrder.save();
  }

  async update(orderId: string, order: Partial<Order>): Promise<Order> {
    return this.orderModel
      .findOneAndUpdate({ orderId }, order, { new: true })
      .exec();
  }

  async delete(orderId: string): Promise<Order> {
    return this.orderModel.findOneAndDelete({ orderId }).exec();
  }
}
