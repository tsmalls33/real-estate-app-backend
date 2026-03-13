import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AgentPaymentRepository } from './agent-payment.repository';
import { CreateAgentPaymentDto } from './dto/create-agent-payment.dto';
import { UpdateAgentPaymentDto } from './dto/update-agent-payment.dto';
import { GetAgentPaymentsQueryParams } from './dto/get-agent-payments-query-params';
import type { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

@Injectable()
export class AgentPaymentService {
  constructor(
    private readonly agentPaymentRepository: AgentPaymentRepository,
  ) {}

  async create(dto: CreateAgentPaymentDto) {
    return this.agentPaymentRepository.create(
      dto as Prisma.AgentPaymentUncheckedCreateInput,
    );
  }

  async findAll(query: GetAgentPaymentsQueryParams, tenantId?: string) {
    return this.agentPaymentRepository.findAll({
      isPaid: query.isPaid,
      id_user: query.id_user,
      id_tenant: tenantId,
      startDate: query.startDate,
      endDate: query.endDate,
      page: query.page ?? 1,
      limit: query.limit ?? 20,
    });
  }

  async findOne(id_agent_payment: string, user?: JwtPayload) {
    const payment =
      await this.agentPaymentRepository.findById(id_agent_payment);
    if (!payment)
      throw new NotFoundException(
        `AgentPayment '${id_agent_payment}' not found`,
      );

    if (user) this.checkTenantMatch(payment.id_tenant, user, id_agent_payment);

    return payment;
  }

  async update(id_agent_payment: string, dto: UpdateAgentPaymentDto, user?: JwtPayload) {
    const payment =
      await this.agentPaymentRepository.findById(id_agent_payment);
    if (!payment)
      throw new NotFoundException(
        `AgentPayment '${id_agent_payment}' not found`,
      );

    if (user) this.checkTenantMatch(payment.id_tenant, user, id_agent_payment);

    return this.agentPaymentRepository.update(
      id_agent_payment,
      dto as Prisma.AgentPaymentUncheckedUpdateInput,
    );
  }

  async remove(id_agent_payment: string, user?: JwtPayload) {
    const payment =
      await this.agentPaymentRepository.findById(id_agent_payment);
    if (!payment)
      throw new NotFoundException(
        `AgentPayment '${id_agent_payment}' not found`,
      );

    if (user) this.checkTenantMatch(payment.id_tenant, user, id_agent_payment);

    return this.agentPaymentRepository.softDelete(id_agent_payment);
  }

  private checkTenantMatch(
    paymentTenantId: string | null,
    user: JwtPayload,
    id_agent_payment: string,
  ) {
    if (user.role === 'SUPERADMIN') return;
    if (paymentTenantId !== user.tenantId) {
      throw new NotFoundException(
        `AgentPayment '${id_agent_payment}' not found`,
      );
    }
  }
}
