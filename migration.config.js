require('dotenv').config();

module.exports = {
  databaseUrl: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  },
  migrationsTable: 'migrations',
  dir: 'migrations',
  direction: 'up',
  log: console.log,
};
