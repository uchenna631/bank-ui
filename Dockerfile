# Use official Node.js image for build
FROM node:18 AS build

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy source code
COPY . .

# Build the React app with API URL from build args
ARG REACT_APP_API_URL=http://localhost:8080
ENV REACT_APP_API_URL=$REACT_APP_API_URL
RUN npm run build

# Use Nginx to serve the static build
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built React app from previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx config for SPA routing and health checks
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 3000

# Use exec form for proper signal handling
CMD ["nginx", "-g", "daemon off;"]
