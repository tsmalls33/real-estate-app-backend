export const PropertyType = {
  APARTMENT: 'APARTMENT',
  HOUSE: 'HOUSE',
  VILLA: 'VILLA'
} as const;

export type PropertyType = (typeof PropertyType)[keyof typeof PropertyType];

export class CreatePropertyStatsDto {
  numberOfBedrooms!: number;
  numberOfBathrooms!: number;
  propertyType!: PropertyType;
  sizeSquareMeters?: number;
  yearBuilt?: number;
  floorNumber?: number;
  hasElevator?: boolean;
  hasGarage?: boolean;
}

export class UpdatePropertyStatsDto {
  numberOfBedrooms?: number;
  numberOfBathrooms?: number;
  propertyType?: PropertyType;
  sizeSquareMeters?: number;
  yearBuilt?: number;
  floorNumber?: number;
  hasElevator?: boolean;
  hasGarage?: boolean;
}

export class PropertyStatsResponseDto {
  id_property_stats!: string;
  id_property!: string;
  numberOfBedrooms!: number;
  numberOfBathrooms!: number;
  propertyType!: PropertyType;
  sizeSquareMeters?: number;
  yearBuilt?: number;
  floorNumber?: number | null;
  hasElevator?: boolean;
  hasGarage?: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}
