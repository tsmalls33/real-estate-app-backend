import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ClientRepository } from './client.repository';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { GetClientsQueryParams } from './dto/get-clients-query-params';
import type { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

@Injectable()
export class ClientService {
  constructor(private readonly clientRepository: ClientRepository) {}

  async create(dto: CreateClientDto) {
    return this.clientRepository.create(
      dto as Prisma.ClientUncheckedCreateInput,
    );
  }

  async findAll(query: GetClientsQueryParams, tenantId?: string) {
    return this.clientRepository.findAll({
      search: query.search,
      id_tenant: tenantId,
      page: query.page ?? 1,
      limit: query.limit ?? 20,
    });
  }

  async findOne(id_client: string, user?: JwtPayload) {
    const client = await this.clientRepository.findById(id_client);
    if (!client) throw new NotFoundException(`Client '${id_client}' not found`);

    if (user) this.checkTenantMatch(client.id_tenant, user, id_client);

    return client;
  }

  async update(id_client: string, dto: UpdateClientDto, user?: JwtPayload) {
    const client = await this.clientRepository.findById(id_client);
    if (!client) throw new NotFoundException(`Client '${id_client}' not found`);

    if (user) this.checkTenantMatch(client.id_tenant, user, id_client);

    return this.clientRepository.update(
      id_client,
      dto as Prisma.ClientUncheckedUpdateInput,
    );
  }

  async remove(id_client: string, user?: JwtPayload) {
    const client = await this.clientRepository.findById(id_client);
    if (!client) throw new NotFoundException(`Client '${id_client}' not found`);

    if (user) this.checkTenantMatch(client.id_tenant, user, id_client);

    return this.clientRepository.softDelete(id_client);
  }

  private checkTenantMatch(
    clientTenantId: string | null,
    user: JwtPayload,
    id_client: string,
  ) {
    if (user.role === 'SUPERADMIN') return;
    if (clientTenantId !== user.tenantId) {
      throw new NotFoundException(`Client '${id_client}' not found`);
    }
  }
}
