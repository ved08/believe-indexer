import { PrismaClient } from './generated/prisma';

const prisma = new PrismaClient();

async function testPrisma() {
  try {
    // Try to find the first token
    const tokens = await prisma.token.findMany();
    console.log('Tokens:', tokens);

    // Try to create a test token
    const newToken = await prisma.token.create({
      data: {
        mint: 'test-mint-' + Date.now(),
        created_at: new Date(),
      },
    });
    console.log('Created token:', newToken);
  } catch (error) {
    console.error('Error testing Prisma:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testPrisma();
