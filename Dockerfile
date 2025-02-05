# Set version for latest LTS version of Node.js
FROM node:20.17.0

WORKDIR /app

COPY package*.json .

RUN npm install -g npm@latest && npm install

COPY . .

ENV CHOKIDAR_USEPOLLING=true

# Delete database, Run migrations, Run seed data, and start the app
CMD npm run db:fresh && \
    npm run dev