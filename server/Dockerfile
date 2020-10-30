FROM node:latest

WORKDIR /app

# RUN apt-get update
# RUN apt-get install -y --no-install-recommends apt-utils
# RUN apt-get install -y --no-install-recommends postgresql postgresql-contrib

COPY package.json ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 7000

# RUN chmod +x ./await-postgres.sh

# RUN ./await-postgres.sh

CMD ["yarn", "start"]