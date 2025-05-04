# Use the official Node.js image as the base image (adjust Node version if needed)
FROM node:18.17-alpine3.18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port the app runs on (Next.js default is 3000)
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]
