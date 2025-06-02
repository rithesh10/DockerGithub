# Use Node base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and lock file
COPY package*.json ./

# Install ALL dependencies (including Vite)
RUN npm install

# Copy all source files
COPY . .

# Expose Vite default dev port
EXPOSE 3000

# Start frontend using Vite
CMD ["npm", "run", "dev"]
