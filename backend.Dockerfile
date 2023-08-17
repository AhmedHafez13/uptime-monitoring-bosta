# Use an official Node.js runtime as the base image
FROM node:alpine

# Set the working directory within the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
# Copy the rest of the application code to the container
COPY . .

# Expose the port that your Node.js application will run on
EXPOSE 8080

# Command to start your application
CMD [ "npm", "start" ]