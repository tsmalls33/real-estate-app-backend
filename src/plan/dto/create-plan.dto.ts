import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlanDto {
  @ApiProperty({ required: true, example: 'Premium' })
  @IsString()
  name: string;

  @ApiProperty({ required: false, example: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
