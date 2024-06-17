require('dotenv').config();
const { faker } = require("@faker-js/faker");
const sequelize = require('../config/database'); // Use the separate database configuration
const Property = require('../models/property'); // Use the separate Property model

const generateFakeProperties = async (count) => {
  console.log(`Generating ${count} properties...`);
  try {
    await sequelize.sync({ force: true });

    for (let i = 0; i < count; i++) {
      await Property.create({
        type: faker.helpers.arrayElement(['sale', 'rent']),
        price: faker.finance.amount({ min: 1000, max: 10000000, dec: 2 }),
        bedrooms: faker.number.int({ min: 1, max: 5 }),
        area: faker.number.int({ min: 300, max: 5000 }),
        title: faker.lorem.words(3),
        description: faker.lorem.sentences(2),
        images: Array.from({ length: 5 }, () => faker.image.urlLoremFlickr({ width: 640, height: 380, category: 'condo' })),
      });
      console.log(`Generated property ${i + 1}/${count}`);
    }
    console.log(`${count} properties have been generated`);
  } catch (error) {
    console.error('An error occurred during data generation:', error);
  } finally {
    process.exit();
  }
};

const count = parseInt(process.argv[2], 10) || 10000;
generateFakeProperties(count);