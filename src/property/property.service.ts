import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { GetPropertiesQueryParams } from './dto/get-properties-query-params';
import { GetReservationsQueryParams } from './dto/get-reservations-query-params';
import type { TenantScope } from '../common/types/tenant-scope';

import { PropertyRepository } from './property.repository';

@Injectable()
export class PropertyService {
  constructor(private readonly propertyRepository: PropertyRepository) {}

  async create(dto: CreatePropertyDto) {
    return this.propertyRepository.create(
      dto as Prisma.PropertyUncheckedCreateInput,
    );
  }

  async findAll(query: GetPropertiesQueryParams, scope: TenantScope) {
    return this.propertyRepository.findAll({
      status: query.status,
      saleType: query.saleType,
      scope,
      id_agent: query.id_agent,
      page: query.page ?? 1,
      limit: query.limit ?? 20,
    });
  }

  async findOne(id_property: string, scope?: TenantScope) {
    const property = await this.propertyRepository.findById(id_property);
    if (!property)
      throw new NotFoundException(
        `Property with id '${id_property}' not found`,
      );

    if (scope) this.checkTenantMatch(property.id_tenant, scope, id_property);

    return property;
  }

  async update(id_property: string, dto: UpdatePropertyDto, scope?: TenantScope) {
    const property = await this.propertyRepository.findById(id_property);
    if (!property)
      throw new NotFoundException(
        `Property with id '${id_property}' not found`,
      );

    if (scope) this.checkTenantMatch(property.id_tenant, scope, id_property);

    return this.propertyRepository.update(
      id_property,
      dto as Prisma.PropertyUncheckedUpdateInput,
    );
  }

  async remove(id_property: string, scope?: TenantScope) {
    const property = await this.propertyRepository.findById(id_property);
    if (!property)
      throw new NotFoundException(
        `Property with id '${id_property}' not found`,
      );

    if (scope) this.checkTenantMatch(property.id_tenant, scope, id_property);

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
  async verifyTenantAccess(id_property: string, scope: TenantScope) {
    const property = await this.propertyRepository.findById(id_property);
    if (!property)
      throw new NotFoundException(
        `Property with id '${id_property}' not found`,
      );

    if (scope.type === 'TENANT' && property.id_tenant !== scope.tenantId) {
      throw new NotFoundException(
        `Property with id '${id_property}' not found`,
      );
    }
  }

  private checkTenantMatch(
    propertyTenantId: string | null,
    scope: TenantScope,
    id_property: string,
  ) {
    if (scope.type === 'ALL') return;
    if (propertyTenantId !== scope.tenantId) {
      throw new NotFoundException(
        `Property with id '${id_property}' not found`,
      );
    }
  }
}
