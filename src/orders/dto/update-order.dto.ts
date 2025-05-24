import { IsEnum, IsNotEmpty } from 'class-validator';
import { OrderStatus } from '../../common/enums/app.enums';

export class UpdateOrderStatusDto {
  @IsNotEmpty()
  @IsEnum(OrderStatus)
  status: OrderStatus;
}