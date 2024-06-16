const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.property.create({
    data: {
      title: "Property 1",
      description: "Property 1 Description.",
      type: "SALE",
      price: 2500000,
      bedrooms: 5,
      area: 5000,
      images: {
        create: [
          { url: "https://example.com/image1.jpg" },
          { url: "https://example.com/image2.jpg" },
          { url: "https://example.com/image3.jpg" },
          { url: "https://example.com/image4.jpg" },
          { url: "https://example.com/image5.jpg" },
        ],
      },
    },
  });

  await prisma.property.create({
    data: {
      title: "Property 2",
      description: "Property 2 Description.",
      type: "RENT",
      price: 3500,
      bedrooms: 2,
      area: 800,
      images: {
        create: [
          { url: "https://example.com/image1.jpg" },
          { url: "https://example.com/image2.jpg" },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
