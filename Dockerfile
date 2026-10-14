# Build stage
FROM node:20 AS build
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    apt-utils \
    g++ \
    libcairo2-dev \
    libjpeg-dev \
    libpango1.0-dev \
    libgif-dev \
    python3 \
    make \
    pkg-config \
    libtool \
    autoconf \
    automake


COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile


COPY . .
RUN yarn build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Ensure nginx has read permissions for the bundled files
RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
