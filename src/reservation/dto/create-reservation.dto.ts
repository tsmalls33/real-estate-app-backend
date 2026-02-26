import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  CreateReservationDto as SharedCreateReservationDto,
  Platform,
} from '@RealEstate/types';

export class CreateReservationDto implements SharedCreateReservationDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  guestName!: string;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  numberOfGuests!: number;

  @ApiProperty({ example: '2026-03-01' })
  @IsDateString()
  startDate!: string;

  @ApiProperty({ example: '2026-03-07' })
  @IsDateString()
  endDate!: string;

  @ApiProperty({ example: 850.0 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Type(() => Number)
  totalCost!: number;

  @ApiProperty({ enum: Platform })
  @IsEnum(Platform)
  platform!: Platform;
}
