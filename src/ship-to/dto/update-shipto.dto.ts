import { PartialType } from '@nestjs/swagger';
import { CreateShipToDto } from './create-shipto.dto';

export class UpdateShipToDto extends PartialType(CreateShipToDto) {}