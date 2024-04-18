const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_TEST_URL
    },
  },
});

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

global.prisma = prisma;