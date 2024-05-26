export class StandardResponseDto<T> {
  code: number;
  data: T;
  message: string;
  success: boolean;
}
