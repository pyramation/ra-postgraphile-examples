# ra-postgraphile-examples

The aim of this repo is to provide examples for the postgraphile community's implementation of react-admin, https://github.com/BowlingX/ra-postgraphile

## getting started

if you have a postgres process running, skip this step. In a separate shell, spin up a postgres instance using docker-compose in the base directory of this repo:

```sh
docker-compose up
```

### roles

First create the roles (we can remove these later):

```sh
psql < ./server/sql/roles.sql
```

** You may need to provide your username/password depending on your configuration:


```sh
PGUSER=postgres PGPASSWORD=password psql < ./server/sql/roles.sql
```

### seed

```sh
createdb exampledb
make init
```

### run server

```sh
cd ./server
yarn
yarn run ra_app_user
```

the explorer will be here http://localhost:5678/graphiql

### run react admin

```sh
cd ./client
yarn
yarn run start
```

the admin will be here http://localhost:3000
