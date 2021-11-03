import { PrismaClient } from '.prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.donation.deleteMany({});

  for (let i = 30; i >= 1; i--) {
    await prisma.donation.create({
      data: {
        count: i,
        email: `${i}@email.com`,
        displayName: `User ${i}`,
        team: `team-${i}`,
        message:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
