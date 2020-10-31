# OAUTH with Google, NodeJS, React Native and Universal Links/App Links

## Backend app

### Instructions

To run the app you'll need:

- [x] docker installed on your machine
- [x] `.env` and `.env.development` files present in the root\*

###### ENV files content:

```
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres

SERVER_PORT=7000

MODE=prod/dev

JWT_SECRET=yoursecrethere...

GOOGLE_CLIENT_ID=X
GOOGLE_CLIENT_SECRET=X
GOOGLE_CALLBACK_URL=https://DOMAIN.COM/auth/google/callback
```

In `dev` the docker maps the containers `node_modules` to the ones located on YOUR local machine, thus you need to install them (if you use shell script provided, skip this step)

To run in DEVELOPMENT

- use `dev.sh` script (give it the permissions first with `chmod u+x ./dev.sh`), or:

```
cd server && yarn && cd .. && docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

To run PRODUCTION mode:

- run `docker-compose up`

### Useful docker commands:

https://github.com/danielmark0116/docker-commands -> we can move it to TWG also 😃
