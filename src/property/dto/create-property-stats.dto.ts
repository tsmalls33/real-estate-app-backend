import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreatePropertyStatsDto as SharedCreatePropertyStatsDto, PropertyType } from '@RealEstate/types';

export class CreatePropertyStatsDto implements SharedCreatePropertyStatsDto {
  @ApiProperty({ example: 2 })
  @IsNumber()
  @Type(() => Number)
  numberOfBedrooms!: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @Type(() => Number)
  numberOfBathrooms!: number;

  @ApiProperty({ example: 75.5 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  sizeSquareMeters!: number;

  @ApiProperty({ enum: PropertyType })
  @IsEnum(PropertyType)
  propertyType!: PropertyType;

  @ApiProperty({ example: 'Barcelona, Eixample' })
  @IsString()
  location!: string;

  @ApiProperty({ example: 2005 })
  @IsNumber()
  @Type(() => Number)
  yearBuilt!: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  floorNumber?: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  hasElevator!: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  hasGarage!: boolean;
}
