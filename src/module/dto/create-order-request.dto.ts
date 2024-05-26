import { IsObject, IsOptional, IsString } from 'class-validator';

export class CreateOrderRequest {
  @IsObject()
  @IsOptional()
  productQuantities?: { [productId: string]: number };

  @IsString()
  @IsOptional()
  orderStatus?: string;
}
