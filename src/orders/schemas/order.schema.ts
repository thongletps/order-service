import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema()
export class OrderItem {
  @Prop()
  productId: string;

  @Prop()
  name: string;

  @Prop()
  quantity: number;

  @Prop()
  price: number;
}

@Schema()
export class Order extends Document {
  @Prop({ default: uuidv4 }) // Auto-generate orderId
  orderId: string;

  @Prop({ type: [OrderItem] })
  orderItems: OrderItem[];

  @Prop()
  totalAmount: number;

  @Prop({ default: 'pending' })
  orderStatus: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
