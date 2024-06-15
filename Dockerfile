# Use the latest Node.js LTS version
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate the Prisma Client
RUN npx prisma generate

# Expose the port Next.js is running on
EXPOSE 3000

# Run the build command
RUN npm run build

# Start the application
CMD ["npm", "start"]
