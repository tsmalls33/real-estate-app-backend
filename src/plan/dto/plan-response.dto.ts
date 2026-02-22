import { PlanPeriod } from '../enums/plan-period.enum';

export class PlanResponseDto {
  id_plan!: string;
  name!: string;
  price!: number;
  paymentPeriod!: PlanPeriod;
  isActive!: boolean;
  tenantCount?: number;
}
