FROM node:24.13.1-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

# ARG VITE_ENV=production
# ENV VITE_ENVIRONMENT=VITE_ENV

# ARG BASE_URL=http://localhost:8080
# ENV VITE_API_BASE_URL=${BASE_URL}

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:stable

COPY --from=builder /app/dist /usr/share/nginx/html

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]