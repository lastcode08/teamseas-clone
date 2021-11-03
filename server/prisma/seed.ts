import { PrismaClient } from '.prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.donation.deleteMany({});

  const donations = [
    {
      displayName: 'John Doe',
      email: 'john@email.com',
      count: 976,
    },
    {
      displayName: 'Jane Doe',
      email: 'jane@email.com',
      count: 1000,
    },
    {
      displayName: 'Alice',
      email: 'alice@email.com',
      count: 992,
    },
    {
      displayName: 'User one',
      email: 'one@email.com',
      count: 108,
    },
    {
      displayName: 'User two',
      email: 'two@email.com',
      count: 796,
    },
    {
      displayName: 'User three',
      email: 'three@email.com',
      count: 2987,
    },
    {
      displayName: 'User four',
      email: 'four@email.com',
      count: 8926,
    },
  ];

  donations.forEach(
    async (data) =>
      await prisma.donation.create({
        data,
      }),
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
