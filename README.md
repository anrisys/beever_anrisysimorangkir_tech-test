<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Description

These are built by Anris Y Simorangkir for the purpose of completing technical test in Beever System Indonesia.

### Technologies

I use these following technologies while developing this application:

- Nest.js as framework for Node.js
- Postgresql as the database
- Sequelize as the Object Relational Mapping (ORM)
- Sequelize-typescript to help utilize sequelize in typescirpt
- Zod as validation library
- JWT is used for authentication
- Axios (in detail @nestjs/axios) as the http client
- Bcrypt library for password encryption
- Swagger for creating the API Documentation

## Project setup

1. Install the dependencies

```bash
$ npm install
```

2. For security reasons, I utilize env package here. You can copy paste the .env.example file. There, I have inserted the used database dialect and the database name (my name). For the SECRET_SALT_KEY you may prefer to use 10. Random string MUST BE INPUTTED into JWT_SECRET_TOKEN.

```json
NODE_ENV=development
DB_DIALECT=postgres
DB_NAME_DEVELOPMENT=anrisysimorangkir
DB_HOST=xxxxx
DB_USER=xxxxx
DB_PASS=xxxxx
DB_PORT=xxxx

SECRET_SALT_KEY=xx
JWT_SECRET_TOKEN=xxxxxxxx
```

## Compile and run the project

To run the project you can use one the following command:

```bash
$ npm run start
```

## Checking and testing the API

After running the application, you can check the API as well as the documentation by visting:

```bash
localhost:3000/api-documentation
```

There, you will find three API:

- /api/register : allowing visitor to register
- /api/login : allowing user to login into application
- /api/data : getting data from other api

Please note that when you do registration or login:

- You must using valid email form
- Your password must contain at least one uppercase, at least one lowercase, at least one special character, and at least one number
- When you visit the /api/data, you must login first with registered data or you can directly use the credentials provided in the api documentation.

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
