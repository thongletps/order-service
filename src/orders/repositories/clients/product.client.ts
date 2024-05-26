import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { StandardResponseDto } from '../../../module/dto/standard-response.dto';
import { ProductResponseDto } from '../../../module/dto/product/product.response.dto';

@Injectable()
export class ProductClient {
  constructor(private readonly configService: ConfigService) {}

  getUrl(): string {
    return this.configService.get(`service.url.product`);
  }

  async getProductByProductId(
    productId: string,
  ): Promise<StandardResponseDto<ProductResponseDto>> {
    try {
      const response = await axios.get(`${this.getUrl()}/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      throw error;
    }
  }
}
