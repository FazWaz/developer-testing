# Real Estate Property Search

This repository contains the implementation of a real estate property search feature using Next.js, MySQL, and GraphQL. This project was developed as part of a job interview assignment to demonstrate critical thinking and technical skills.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
  - [Generating Fake Data](#generating-fake-data)
- [User Stories](#user-stories)
- [Acceptance Criteria](#acceptance-criteria)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [Contact](#contact)

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Docker
- Docker Compose
- Node.js (for generating fake data)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/hponemahn/developer-testing.git
   cd real-estate-app
   ```

2. Create a `.env` file in the backend directory and add the following environment variables:

   ```sh
   DB_NAME=real_estate
   DB_USER=root
   DB_PASSWORD=P@ssw0rd
   DB_HOST=127.0.0.1
   DB_PORT=3306

   PORT=4000
   ```

### Running the Application

1. Build and run the Docker containers:

   ```sh
   docker-compose up --build
   ```

2. Access the application:

   - Frontend: http://localhost:3000
   - GraphQL Server: http://localhost:4000/graphql

### Generating Fake Data

To test the application with a large number of properties, generate fake data using the provided script:

1. Navigate to the `backend` directory:

   ```sh
   cd backend
   ```

2. Run the data generation script:

   ```sh
   npm run generate-data
   ```

   You can replace `10000` with `100000` or `1000000` to generate more properties at package.json

   You can run above command to generate the default amount of fake properties (10,000)

## User Stories

- **As a Developer**, I want to build a search feature for real estate properties, allowing users to filter properties based on sale or rent, price range, number of bedrooms, and area.
- The search should handle a large number of fake properties (10,000, 100,000, and 1,000,000) to test query performance.
- The listing page should display the project name, short title, price, bedroom count, area, short description, and an image gallery (with 5 images) that works with mouse interaction on PCs and swipe gestures on mobile devices.
- The page should achieve a score of 95 or higher on Google Insight.

## Acceptance Criteria

1. **Given** a user searches for properties,  
   **When** they select the filter type for sale or rent,  
   **Then** the search should display properties matching the selected type.

2. **Given** a user searches for properties,  
   **When** they specify the price range using the filter,  
   **Then** the search should display properties within the specified price range for both sale and rent.

3. **Given** a user searches for properties,  
   **When** they filter properties based on the number of bedrooms,  
   **Then** the search should display properties with the corresponding bedroom count.

4. **Given** a user searches for properties,  
   **When** they filter properties based on the area,  
   **Then** the search should display properties within the specified area range.

5. **Given** a user views the listing page,  
   **When** they interact with the image gallery on a PC (using a mouse),  
   **Then** they should be able to navigate between images.

6. **Given** a user views the listing page,  
   **When** they interact with the image gallery on a mobile device (using swipe gestures),  
   **Then** they should be able to navigate between images.

7. **Given** the listing page,  
   **When** tested with Google Insight,  
   **Then** the page should achieve a score of 95 or higher.

8. **Given** a large number of fake properties (10,000, 100,000, and 1,000,000),  
   **When** the search is performed,  
   **Then** the query performance should meet acceptable performance benchmarks.

## Technologies

- Docker
- Node.js
- Express
- Apollo Server
- GraphQL
- Sequelize
- MySQL
- Next.js
- React

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or bug fixes.

## Contact

If you have any questions or need further information, feel free to contact me:

- **Name:** Hpone
- **Email:** hponemahn@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/hpone-mahn-5a9b00b7/
- **GitHub:** https://github.com/hponemahn