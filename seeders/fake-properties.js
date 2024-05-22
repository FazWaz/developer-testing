const { faker } = require('@faker-js/faker');
const { Property } = require('../models');

const propertiesImages = [
    'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg',
    'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg',
    'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg',
    'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg',
    'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg',
    'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
    'https://images.pexels.com/photos/1797393/pexels-photo-1797393.jpeg',
    'https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg',
    'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg',
    'https://images.pexels.com/photos/6267516/pexels-photo-6267516.jpeg',
    'https://images.pexels.com/photos/3958961/pexels-photo-3958961.jpeg',
    'https://images.pexels.com/photos/8100760/pexels-photo-8100760.jpeg',
    'https://images.pexels.com/photos/534228/pexels-photo-534228.jpeg',
    '',
    ''
];
function getRandomImages(num) {
    const shuffled = propertiesImages.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const properties = [];
        const batchSize = 1000;
        
        for (let i = 0; i < 100000; i++) {
            properties.push({
            project_name: faker.company.name(),
            short_title: faker.lorem.words(4),
            price: faker.finance.amount({ min: 1000, max: 10000000, dec: 2 }),
            bedroom_count: faker.number.int({ min: 1, max: 5 }),
            area: faker.number.int({ min: 300, max: 5000 }),
            short_description: faker.lorem.sentences(4),
            images: JSON.stringify(getRandomImages(5)),
            type: faker.helpers.arrayElement(['sale', 'rent']),
            createdAt: new Date(),
            updatedAt: new Date(),
            });
            if (properties.length === batchSize) {
                await queryInterface.bulkInsert('Properties', properties, {});
                properties.length = 0; // Clear the array
            }
        }
        // Insert remaining properties
        if (properties.length > 0) {
            await queryInterface.bulkInsert('Properties', properties, {});
        }
        },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Properties', null, {});
    },
};
