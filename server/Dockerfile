FROM node:latest

WORKDIR /app

RUN apt-get update
RUN apt-get install -y --no-install-recommends apt-utils
# RUN apt-get install -y --no-install-recommends postgresql postgresql-contrib

RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN dpkg -i google-chrome-stable_current_amd64.deb; apt-get -fy install

COPY package.json ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 7009

# RUN chmod +x ./await-postgres.sh

# RUN ./await-postgres.sh

CMD ["yarn", "start"]