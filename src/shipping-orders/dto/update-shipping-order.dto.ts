import { PartialType } from '@nestjs/swagger';
import { CreateShippingOrderDto } from './create-shipping-order.dto';

export class UpdateShippingOrderDto extends PartialType(CreateShippingOrderDto) {}
