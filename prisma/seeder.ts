import { PrismaClient } from '@prisma/client'
import { faker } from "@faker-js/faker"

const prisma = new PrismaClient();

async function main() {
    // await prisma.property.deleteMany();
    // await prisma.gallery.deleteMany();

    enum Type {
        SALE="SALE",
        RENT="RENT"
    }

    enum PropertyType{
        CONDO="CONDO",
        APARTMENT="APARTMENT",
        HOUSE="HOUSE",
        OFFICE="OFFICE",
    }

    for (let index = 0; index < 5000; index++) {
        const propertyType = faker.helpers.enumValue(PropertyType);
        const thumbnail = faker.image.urlLoremFlickr({ category: propertyType, width: 600, height: 600});
        await prisma.property.create({
            data: {
                name: faker.lorem.words({min: 2, max: 3}),
                title: faker.lorem.words({min: 4, max: 5}),
                description: faker.lorem.lines({min: 5, max: 10}),
                price: faker.number.int({ min: 1000, max: 100000 }),
                bedroom: faker.number.int({ min: 1, max: 4 }),
                area: faker.number.int({ min: 50, max: 300 }),
                type: faker.helpers.enumValue(Type),
                propertyType: propertyType,
                thumbnail: thumbnail,
                gallery: {
                    create: [
                        {
                            url: thumbnail
                        },
                        {
                            url: faker.image.urlLoremFlickr({ category: propertyType, width: 600, height: 600})
                        },
                        {
                            url: faker.image.urlLoremFlickr({ category: propertyType, width: 600, height: 600})
                        },
                        {
                            url: faker.image.urlLoremFlickr({ category: propertyType, width: 600, height: 600})
                        },
                        {
                            url: faker.image.urlLoremFlickr({ category: 'house', width: 600, height: 600})
                        },
                    ]
                }
            }
        })
    }
}

main()
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    }).finally(async () => {
        await prisma.$disconnect();
    })