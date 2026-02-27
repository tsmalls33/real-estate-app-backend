import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyStatsDto } from './create-property-stats.dto';

export class UpdatePropertyStatsDto extends PartialType(CreatePropertyStatsDto) {}
