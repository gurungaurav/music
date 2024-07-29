# Use a specific Node.js version as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app/client

# Copy only package.json and package-lock.json (or yarn.lock) to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

RUN npm run build

# Expose the port the app runs on
EXPOSE 4173

# Start the application
CMD [ "npm", "start" ]
