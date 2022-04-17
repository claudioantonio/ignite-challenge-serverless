
This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

## Installation/deployment instructions

Depending on your preferred package manager, follow the instructions below to deploy your project.

> **Requirements**: NodeJS `lts/fermium (v.14.15.0)`.

### Using Yarn

- Run `yarn` to install the project dependencies
- Run `yarn deploy` to deploy this stack to AWS

## Test your service

This template contains 2 lambda functions triggered by an HTTP request made on the provisioned API Gateway REST API:
- `/posttodo/{user_id}` route with `POST` method. The request body must be provided as `application/json`. The body structure is:
{
    "title": "to study serverless framework",
    "deadline": "April 16, 2022 22:00:00"
 }

- `/gettodo/{user_id}` route with `GET` method.

## References
- https://blog.logrocket.com/building-serverless-app-typescript/