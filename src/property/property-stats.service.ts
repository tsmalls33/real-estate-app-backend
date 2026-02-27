import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PropertyRepository } from './property.repository';
import { PropertyStatsRepository } from './property-stats.repository';
import { CreatePropertyStatsDto } from './dto/create-property-stats.dto';
import { UpdatePropertyStatsDto } from './dto/update-property-stats.dto';

@Injectable()
export class PropertyStatsService {
  constructor(
    private readonly propertyStatsRepository: PropertyStatsRepository,
    private readonly propertyRepository: PropertyRepository,
  ) {}

  async create(id_property: string, dto: CreatePropertyStatsDto) {
    const exists = await this.propertyRepository.existsById(id_property);
    if (!exists) throw new NotFoundException(`Property with id '${id_property}' not found`);

    const existing = await this.propertyStatsRepository.findByPropertyId(id_property);
    if (existing) throw new ConflictException('PropertyStats already exists for this property');

    return this.propertyStatsRepository.create({ ...dto, id_property });
  }

  async update(id_property: string, dto: UpdatePropertyStatsDto) {
    const exists = await this.propertyRepository.existsById(id_property);
    if (!exists) throw new NotFoundException(`Property with id '${id_property}' not found`);

    const existing = await this.propertyStatsRepository.findByPropertyId(id_property);
    if (!existing) throw new NotFoundException('PropertyStats not found for this property');

    return this.propertyStatsRepository.updateByPropertyId(id_property, dto);
  }
}
