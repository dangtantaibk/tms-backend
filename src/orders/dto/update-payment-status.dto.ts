import { IsEnum, IsNotEmpty } from 'class-validator';
import { PaymentStatus } from '../../common/enums/app.enums';

export class UpdatePaymentStatusDto {
  @IsNotEmpty()
  @IsEnum(PaymentStatus)
  paymentStatus: PaymentStatus;
}