# Use an official Node.js image as the base
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project directory to the container
COPY . .

# Expose the port the app runs on (if necessary)
# EXPOSE 3000

# Command to start the application
CMD ["npm", "start"]
