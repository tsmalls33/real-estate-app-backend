import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ClientRepository } from './client.repository';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { GetClientsQueryParams } from './dto/get-clients-query-params';

@Injectable()
export class ClientService {
  constructor(private readonly clientRepository: ClientRepository) {}

  async create(dto: CreateClientDto) {
    return this.clientRepository.create(dto as Prisma.ClientUncheckedCreateInput);
  }

  async findAll(query: GetClientsQueryParams) {
    return this.clientRepository.findAll({
      search: query.search,
      page: query.page ?? 1,
      limit: query.limit ?? 20,
    });
  }

  async findOne(id_client: string) {
    const client = await this.clientRepository.findById(id_client);
    if (!client) throw new NotFoundException(`Client '${id_client}' not found`);
    return client;
  }

  async update(id_client: string, dto: UpdateClientDto) {
    const exists = await this.clientRepository.existsById(id_client);
    if (!exists) throw new NotFoundException(`Client '${id_client}' not found`);
    return this.clientRepository.update(id_client, dto as Prisma.ClientUncheckedUpdateInput);
  }

  async remove(id_client: string) {
    const exists = await this.clientRepository.existsById(id_client);
    if (!exists) throw new NotFoundException(`Client '${id_client}' not found`);
    return this.clientRepository.softDelete(id_client);
  }
}
