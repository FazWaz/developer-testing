require('dotenv').config();
const { Sequelize, DataTypes } = require("sequelize");
const { faker } = require("@faker-js/faker");

// const sequelize = new Sequelize("real_estate", "root", "P@ssw0rd", {
//   host: "127.0.0.1",
//   dialect: "mysql",
// });

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);

const Property = sequelize.define("Property", {
  type: DataTypes.STRING,
  price: DataTypes.INTEGER,
  bedrooms: DataTypes.INTEGER,
  area: DataTypes.INTEGER,
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  images: DataTypes.JSON,
});

const generateFakeProperties = async (count) => {
    console.log(`Generating properties`);
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
