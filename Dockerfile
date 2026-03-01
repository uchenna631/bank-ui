
# ---- Build Stage ----
FROM node:18-alpine AS build
WORKDIR /app

# Install dependencies only (cache layer)
COPY package.json package-lock.json* ./
RUN npm ci --prefer-offline --no-audit --progress=false

# Copy source code and build
COPY . .
RUN npm run build

# ---- Production Stage ----
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built React app from previous stage
COPY --from=build /app/build .

# Copy custom nginx config for SPA routing and health checks
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# Use exec form for proper signal handling
CMD ["nginx", "-g", "daemon off;"]
