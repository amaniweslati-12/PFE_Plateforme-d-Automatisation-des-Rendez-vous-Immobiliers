# Build stage
FROM node:18-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Production stage
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Copy custom nginx config if needed, but default is usually fine for simple SPA
# If you have routing issues (404 on refresh), you'll need a custom nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
