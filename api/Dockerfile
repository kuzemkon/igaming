# Stage 1: Build the application
FROM node:16 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install all dependencies (including dev dependencies)
RUN npm install

# Copy the rest of the application code
COPY . .

# Compile TypeScript into JavaScript
RUN npx tsc

# Stage 2: Create a production-ready image
FROM node:16-alpine AS production

# Set the working directory in the final image
WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy the compiled code from the builder stage
COPY --from=builder /app/dist ./dist

# Expose the port that the API server will run on
EXPOSE 3000

# Command to run the compiled JavaScript server
CMD ["node", "dist/server.js"]
