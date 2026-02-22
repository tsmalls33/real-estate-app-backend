import { PrismaClient, PlanPeriod } from '@prisma/client';


const DEFAULT_PLANS = [
  {
    id_plan: 'basic',
    name: 'Basic',
    price: 0,
    pricePeriod: PlanPeriod.MONTHLY
    // features: ['Access to basic features', 'Limited support'],
  },
  {
    id_plan: 'pro',
    name: 'Pro',
    price: 29.99,
    pricePeriod: PlanPeriod.MONTHLY
    // features: ['Access to all features', 'Priority support', 'Customizable themes'],
  },
  {
    id_plan: 'premium',
    name: 'Premium',
    price: 49.99,
    pricePeriod: PlanPeriod.MONTHLY
    // features: ['All Pro features', 'Dedicated account manager', 'Custom integrations'],
  },
];

export async function seedPlans(prisma: PrismaClient) {
  console.log('Seeding plans...');

  for (const plan of DEFAULT_PLANS) {
    await prisma.plan.upsert({
      where: { id_plan: plan.id_plan },
      update: {
        name: plan.name,
        price: plan.price,
        pricePeriod: plan.pricePeriod
        // features: plan.features,
      },
      create: plan,
    });
  }

  console.log('Plans seeded successfully');
}
