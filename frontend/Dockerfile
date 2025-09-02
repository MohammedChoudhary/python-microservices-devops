# Stage 1: Build React app
FROM node:20-slim AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all frontend source code
COPY . .

# Build the React app
RUN npm run build


# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy build output to Nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
