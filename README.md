## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install

# migration
npx sequelize-cli db:migrate
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## .ENV

```bash
#Dafault port
NODE_PORT=

#PostgreSQL
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
DB_DATABASE=
DB_DIALECT=

#bcrypt
SALT=

#JWT
JWT_LIFETIME=
JWT_SECRET=


#cache
CACHING_ITEMS=
CACHING_TIME=
```

## Loadtest

```bash
#generate 100 records
loadtest -n 100 -m POST http://localhost:8083/weather/generate-new-data
```

## Documentation

```bash
#generate documentation
yarn documentation:serve
```

## DB backup

```bash 
#for backup
pg_dump -Fc -h 127.0.0.1 -U username DBname -f BackupFileName.dump
```

## MongoDB

```bash 
#create db
use edu


```
