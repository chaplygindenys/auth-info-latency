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

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
