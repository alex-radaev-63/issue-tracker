// prisma/client.ts
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

// Create a singleton Prisma client
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ??
  new PrismaClient({ adapter });

// Only assign in non-production to avoid multiple instances during hot reloads
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
