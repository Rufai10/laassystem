const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.lead.count();
  console.log(`Lead count: ${count}`);
  const leads = await prisma.lead.findMany();
  console.log('Leads:', JSON.stringify(leads, null, 2));
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
