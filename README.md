# appartment-list-lunch-app

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

