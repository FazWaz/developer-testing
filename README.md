# Real Estate Property Search Feature

## Overview

This project is a real estate property search feature built with Next.js, MySQL, and GraphQL. The application allows users to filter properties based on sale or rent, price range, number of bedrooms, and area. It is designed to handle a large number of properties (10,000, 100,000, and 1,000,000) to test query performance. The listing page includes features like project name, short title, price, bedroom count, area, short description, and an interactive image gallery that works on both PCs and mobile devices.

## Setup and Installation

### Prerequisites
- Docker
- Docker Compose

### Database Configuration
The database configuration is defined in config/config.js. Here are the default credentials:
```sh
module.exports = {
  development: {
    username: 'root',
    password: 'password',
    database: 'realestate',
    host: 'db', // Use 'localhost' if not running inside Docker
    port: 3306,
    dialect: 'mysql',
  },
};
```

### Docker Conversion
**Build and Run Containers**
```sh
   docker-compose up -d
```
**Migrate the Data Table Structure**
```sh 
    docker-compose exec app npx sequelize-cli db:migrate
```
**Seed Fake Data to Data Table**
```sh 
    docker-compose exec app npx sequelize-cli db:seed:all
```

## Running the Project
After setting up the containers and seeding the data, navigate to http://localhost:3000 to view the application.

## Project Structure
`pages/:` Contains the Next.js pages, including the search and listing pages.<br/>
`components/:` Contains reusable React components.<br/>
`graphql/:` Contains GraphQL schema and resolver definitions.<br/>
`models/:` Defines the Sequelize models for MySQL.<br/>
`config/:` Contains database configuration files.<br/>
`public/:` Contains static files like images and stylesheets.<br/>
`docker-compose.yml:` Docker Compose configuration file.<br/>


Open [http://localhost:3000](http://localhost:3000) 

## Contact
For any inquiries, please contact me at: <br/>
**Name** : Aung Kyaw Htwe <br/>
**Email**: dev.aungkyawthwe@gmail.com <br/>
**LinkedIn**: [https://www.linkedin.com/in/aung-kyaw-htwe/](https://www.linkedin.com/in/aung-kyaw-htwe/)<br/>
**GitHub**: [https://github.com/dev-akh](https://github.com/dev-akh)
