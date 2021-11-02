import { PrismaClient } from '.prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.donation.deleteMany({});

  const john = await prisma.donation.create({
    data: {
      displayName: 'John Doe',
      email: 'john@email.com',
      count: 5,
    },
  });

  console.log({ john });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
