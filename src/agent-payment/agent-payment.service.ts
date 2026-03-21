import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AgentPaymentRepository } from './agent-payment.repository';
import { CreateAgentPaymentDto } from './dto/create-agent-payment.dto';
import { UpdateAgentPaymentDto } from './dto/update-agent-payment.dto';
import { GetAgentPaymentsQueryParams } from './dto/get-agent-payments-query-params';
import { type TenantScope, assertTenantMatch } from '../common/types/tenant-scope';

@Injectable()
export class AgentPaymentService {
  constructor(
    private readonly agentPaymentRepository: AgentPaymentRepository,
  ) {}

  async create(dto: CreateAgentPaymentDto, scope: TenantScope) {
    const id_tenant = scope.type === 'TENANT' ? scope.tenantId : null;
    return this.agentPaymentRepository.create({
      ...(dto as Prisma.AgentPaymentUncheckedCreateInput),
      id_tenant,
    });
  }

  async findAll(query: GetAgentPaymentsQueryParams, scope: TenantScope) {
    return this.agentPaymentRepository.findAll({
      isPaid: query.isPaid,
      id_user: query.id_user,
      scope,
      startDate: query.startDate,
      endDate: query.endDate,
      page: query.page ?? 1,
      limit: query.limit ?? 20,
    });
  }

  async findOne(id_agent_payment: string, scope?: TenantScope) {
    const payment =
      await this.agentPaymentRepository.findById(id_agent_payment);
    if (!payment)
      throw new NotFoundException(
        `AgentPayment '${id_agent_payment}' not found`,
      );

    if (scope) assertTenantMatch(scope, payment.id_tenant);

    return payment;
  }

  async update(id_agent_payment: string, dto: UpdateAgentPaymentDto, scope?: TenantScope) {
    const payment =
      await this.agentPaymentRepository.findById(id_agent_payment);
    if (!payment)
      throw new NotFoundException(
        `AgentPayment '${id_agent_payment}' not found`,
      );

    if (scope) assertTenantMatch(scope, payment.id_tenant);

    return this.agentPaymentRepository.update(
      id_agent_payment,
      dto as Prisma.AgentPaymentUncheckedUpdateInput,
    );
  }

  async remove(id_agent_payment: string, scope?: TenantScope) {
    const payment =
      await this.agentPaymentRepository.findById(id_agent_payment);
    if (!payment)
      throw new NotFoundException(
        `AgentPayment '${id_agent_payment}' not found`,
      );

    if (scope) assertTenantMatch(scope, payment.id_tenant);

    return this.agentPaymentRepository.softDelete(id_agent_payment);
  }
}
