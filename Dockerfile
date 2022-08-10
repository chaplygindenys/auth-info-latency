FROM node:lts-alpine3.15 AS builder

WORKDIR /app

COPY package*.json /app
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npm run build

# FROM node:lts-alpine3.15


# COPY --from=builder /app/package*.json ./
# COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/prisma ./prisma
# COPY --from=builder /app/doc ./doc

# RUN npm install --production

ENV PORT 4000

EXPOSE $PORT
# 👇 new migrate and start app script
CMD [  "npm", "run", "start:migrate:dev" ]