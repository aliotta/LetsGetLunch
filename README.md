# appartment-list-lunch-app

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.16.0.

## Build & development

Must have a postgres database setup with the following  properties

database: 'postgres',
schema: 'appt',
user: 'postgres',
password: 'cheese',
host: 'localhost',
port: 5432

To Seed/Migrate database run node db/migrate from root directory.

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.

Running `npm run test` will run the server side unit tests

    //"test": "karma start test/karma.conf.js",

