import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { GetPropertiesQueryParams } from './dto/get-properties-query-params';
import { GetReservationsQueryParams } from './dto/get-reservations-query-params';
import type { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

import { PropertyRepository } from './property.repository';

@Injectable()
export class PropertyService {
  constructor(private readonly propertyRepository: PropertyRepository) {}

  async create(dto: CreatePropertyDto) {
    return this.propertyRepository.create(
      dto as Prisma.PropertyUncheckedCreateInput,
    );
  }

  async findAll(query: GetPropertiesQueryParams, tenantId?: string) {
    return this.propertyRepository.findAll({
      status: query.status,
      saleType: query.saleType,
      id_tenant: tenantId ?? query.id_tenant,
      id_agent: query.id_agent,
      page: query.page ?? 1,
      limit: query.limit ?? 20,
    });
  }

  async findOne(id_property: string, user?: JwtPayload) {
    const property = await this.propertyRepository.findById(id_property);
    if (!property)
      throw new NotFoundException(
        `Property with id '${id_property}' not found`,
      );

    if (user) this.checkTenantMatch(property.id_tenant, user, id_property);

    return property;
  }

  async update(id_property: string, dto: UpdatePropertyDto, user?: JwtPayload) {
    const property = await this.propertyRepository.findById(id_property);
    if (!property)
      throw new NotFoundException(
        `Property with id '${id_property}' not found`,
      );

    if (user) this.checkTenantMatch(property.id_tenant, user, id_property);

    return this.propertyRepository.update(
      id_property,
      dto as Prisma.PropertyUncheckedUpdateInput,
    );
  }

  async remove(id_property: string, user?: JwtPayload) {
    const property = await this.propertyRepository.findById(id_property);
    if (!property)
      throw new NotFoundException(
        `Property with id '${id_property}' not found`,
      );

    if (user) this.checkTenantMatch(property.id_tenant, user, id_property);

    return this.propertyRepository.softDelete(id_property);
  }

  async findReservations(
    id_property: string,
    query: GetReservationsQueryParams,
  ) {
    const exists = await this.propertyRepository.existsById(id_property);
    if (!exists)
      throw new NotFoundException(
        `Property with id '${id_property}' not found`,
      );
    return this.propertyRepository.findReservations(id_property, {
      startDate: query.startDate,
      endDate: query.endDate,
      status: query.status,
      platform: query.platform,
      page: query.page ?? 1,
      limit: query.limit ?? 20,
    });
  }

  /**
   * Verify that a property belongs to the user's tenant.
   * Throws NotFoundException if not found or tenant mismatch (avoids leaking existence).
   * SUPERADMIN bypasses the check.
   */
  async verifyTenantAccess(id_property: string, user: JwtPayload) {
    const property = await this.propertyRepository.findById(id_property);
    if (!property)
      throw new NotFoundException(
        `Property with id '${id_property}' not found`,
      );

    if (user.role !== 'SUPERADMIN' && property.id_tenant !== user.tenantId) {
      throw new NotFoundException(
        `Property with id '${id_property}' not found`,
      );
    }
  }

  private checkTenantMatch(
    propertyTenantId: string | null,
    user: JwtPayload,
    id_property: string,
  ) {
    if (user.role === 'SUPERADMIN') return;
    if (propertyTenantId !== user.tenantId) {
      throw new NotFoundException(
        `Property with id '${id_property}' not found`,
      );
    }
  }
}
