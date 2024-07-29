FROM node:20-alpine

ENV PORT=7000
ENV JWT_REFRESH_SECRET_KEY=secretKeyla3RWR3
ENV JWT_ACCESS_SECRET_KEY=secretKeylaSASASSDSDR33
ENV DATABASE_URL=postgresql://postgres:Iangrg112@localhost:5432/music
ENV BASE_URL=http://localhost:7000
ENV FRONTEND_BASE_URL=http://localhost:3000


WORKDIR /app/server

COPY  package*.json ./

RUN npm install

RUN npm install -g typescript

COPY . .

RUN npm install prisma @prisma/client

RUN npx prisma generate 

RUN npm run build 

EXPOSE 7000


CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
