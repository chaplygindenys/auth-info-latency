# Task

Create REST API server with bearer token auth. Setup CORS to allow access from any domain. DB - any. Token should have expiration time 10 mins and extend it on any user request (except singin/logout)

API (JSON):
• /signin [POST] - request for bearer token by id and password
• /signup [POST] - creation of new user
⁃ Fields id and password. Id - phone number or email. After signup add field `id_type` - phone or email
⁃ In case of successful signup - return token
• /info [GET] - returns user id and id type
• /latency [GET] - returns service server latency for google.com
• /logout [GET] - with param `all`:
⁃ true - removes all users bearer tokens
⁃ false - removes only current token

## Installation

```bash
$ npm install
```

# DataBase

```bash
$ docker compose up
```

# Migrate

```bash
$ npm run migrate
```

## Running the app

```bash
# development
$ npm run start
```

# watch mode

```bash
$ npm run start:dev
```

## Some Tests

```bash
# unit tests
$ npm run test
```

# Endpoints

GET:
/info set headers : `Authorization : Bearer {{accesshToken}}`
/latency set headers : `Authorization : Bearer {{accesshToken}}`
/logout set Query: `?all=true`or `?all=false` set headers : `Authorization : Bearer {{accesshToken}}`

POST:
/signup
/signin
/refresh set headers : `Authorization : Bearer {{refreshToken}}`
