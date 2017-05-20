# appartment-list-lunch-app

Built using yeoman angular-generator with a node.js server and a postgres database.
Testing of the front end code was completed using karma and backend code using mocha.

## Build & development

Must have a postgres database setup with the following properties and user

database: 'postgres',
schema: 'appt',
user: 'postgres',
password: 'cheese',
host: 'localhost',
port: 5432

To Seed/Migrate database run node db/migrate from root directory.

Run `npm install` then `grunt build` to download dependencies 

Run `node server.js` to serve the app at location localhost:5000.

## Testing

Running `npm run test` will run the unit tests

