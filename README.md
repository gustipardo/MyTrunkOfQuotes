MyTrunkOfQuotes
# A Registry of Wisdom and Motivation

Quotes can have a significant impact on our lives; a simple, well-chosen phrase can ignite a spark of motivation, empathy, or reflection in our hearts and minds. Their profound effect lies in encapsulating powerful ideas and perspectives in a concise and memorable manner.

# Project Description:
 This project was developed using Angular with a backend-as-a-service called Supabase, which is built on PostgreSQL and a REST API to streamline development. The app allows users to authenticate through Supabase Auth and add quotes to their collection, accessible from any device. It's important to note that this application doesn't store any personal data with the quotes, only an account ID to identify their respective quotes.

# Supabase: 
We utilize Supabase Auth for user login, Row-Level Security (RLS) to enforce rules on each row of the table regarding CRUD operations (Create, Read, Update, Delete). Finally, we establish a relationship between the authenticated user's table and the quotes table using a Foreign Key, a shared field in both tables.


# MyTrunkQuotes

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
