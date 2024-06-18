# Use the official Node.js 20-alpine image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Install dependencies, including ts-node globally
RUN npm install -g ts-node typescript

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Copy prisma directory separately to ensure schema.prisma changes trigger prisma generate
COPY prisma ./prisma

# Generate the Prisma Client for the correct binary target
RUN npx prisma generate

# Build the Next.js application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Command to run the Next.js application and seed database
CMD ["sh", "-c", "npm run dev & sleep 10 && npm run seed"]