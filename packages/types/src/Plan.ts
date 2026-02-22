export const PlanPeriod = {
  MONTHLY: 'MONTHLY',
  YEARLY: 'YEARLY',
} as const;

export type PlanPeriod = (typeof PlanPeriod)[keyof typeof PlanPeriod];

export class CreatePlanDto {
  name!: string;
  price!: number;
  pricePeriod!: PlanPeriod;
  isActive?: boolean;
}

export class UpdatePlanDto {
  name?: string;
  price?: number;
  pricePeriod?: PlanPeriod;
  isActive?: boolean;
}
