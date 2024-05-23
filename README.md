## Overview

This project is a real estate property search feature built with Next.js, MySQL, and GraphQL. The application allows users to filter properties based on sale or rent, price range, number of bedrooms, and area. It is designed to handle a large number of properties (10,000, 100,000, and 1,000,000) to test query performance. The listing page includes features like project name, short title, price, bedroom count, area, short description, and an interactive image gallery that works on both PCs and mobile devices.
[Developed by <strong>Soe Moe Oo</strong>]

<hr>

## Getting Started

First, run the development server (for local):

```bash
npm install
npm run dev
```

### Run on Docker

**1. Build and Run**

```sh
   docker-compose up -d
```

**2. Prisma Database Push**

```sh
    docker-compose run nextjs npx prisma db push
```

**3. Fake Data Seeder (5000 records per seed)**

```sh
    docker-compose run nextjs npx prisma db seed
```

### Running the Project

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
