# DOGGO BACKEND

Steps to run:
- Create Postgres database `psql -c "CREATE DATABASE doggo"`
- Run migrations `npx sequelize-cli db:migrate`
- Seed the database `npx sequelize-cli db:seed:all`
- Run `yarn install && yarn start`
