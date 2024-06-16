import { PrismaClient, Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  const batchSize = 100;  // Number of records to insert in each batch
  const totalRecords = 10000;  // Total number of records to create

  for (let i = 0; i < totalRecords; i += batchSize) {
    const promises: Array<ReturnType<typeof prisma.property.create>> = [];

    for (let j = 0; j < batchSize; j++) {
      const propertyIndex = i + j + 1;  // To keep the property titles unique

      const propertyData: Prisma.PropertyCreateInput = {
        title: `Property ${propertyIndex}`,
        description: faker.lorem.sentence(),  // Random description using faker
        type: Math.random() > 0.5 ? 'SALE' : 'RENT',
        price: Math.floor(Math.random() * (10000000 - 1000 + 1)) + 1000,  // Random price between 1000 and 10000000
        bedrooms: Math.floor(Math.random() * 10) + 1,  // Random number of bedrooms between 1 and 10
        area: Math.floor(Math.random() * (10000 - 500 + 1)) + 500,  // Random area between 500 and 10000
        images: {
          create: [
            { url: faker.image.imageUrl() },  // Random image URL using faker
            { url: faker.image.imageUrl() },  // Random image URL using faker
          ],
        },
      };

      // Adding the create operation to the promises array
      promises.push(prisma.property.create({ data: propertyData }));
    }

    // Executing all create operations in the current batch
    await Promise.all(promises);

    console.log(`Inserted batch ${i / batchSize + 1}`);
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
