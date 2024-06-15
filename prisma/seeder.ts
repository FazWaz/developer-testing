import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    // Clear existing data
    await prisma.gallery.deleteMany();
    await prisma.property.deleteMany();

    // Define enums for ListingType and PropertyType
    enum ListingType {
      SALE = 'SALE',
      RENT = 'RENT',
    }

    enum PropertyType {
      CONDO = 'CONDO',
      APARTMENT = 'APARTMENT',
      HOUSE = 'HOUSE',
      OFFICE = 'OFFICE',
    }

    // Generate seed data
    for (let i = 0; i < 1000000; i++) { // Increase to 1,000,000 for large dataset
      const listingTypes = Object.values(ListingType);
      const listingType = listingTypes[Math.floor(Math.random() * listingTypes.length)] as ListingType;
      const propertyTypes = Object.values(PropertyType);
      const propertyType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)] as PropertyType;
      const mainImageUrl = `https://example.com/${propertyType.toLowerCase()}-image-${i + 1}.jpg`;

      const property = await prisma.property.create({
        data: {
          listingType,
          projectName: `Project ${i + 1}`,
          title: `Property ${i + 1}`,
          price: Math.floor(Math.random() * 1000000) + 10000, // Random price between $10,000 and $1,010,000
          bedrooms: Math.floor(Math.random() * 5) + 1, // Random number of bedrooms between 1 and 5
          area: Math.floor(Math.random() * 2000) + 500, // Random area between 500 and 2500 sq. ft.
          description: `Description of Property ${i + 1}`,
          mainImageUrl,
        },
      });

      // Create gallery images for each property
      for (let j = 0; j < 5; j++) {
        await prisma.gallery.create({
          data: {
            imageUrl: `https://example.com/${propertyType.toLowerCase()}-gallery-${j + 1}.jpg`,
            propertyId: property.id,
          },
        });
      }
    }

    console.log('Database seeding completed successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
