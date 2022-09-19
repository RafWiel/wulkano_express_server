const dotenv = require('dotenv');

dotenv.config({ path: '.env' });

module.exports = {
  port: process.env.PORT || 3000,
  db: {
    database: process.env.DB_NAME || 'WP_Workshop',
    user: process.env.DB_USER || 'sa',
    password: process.env.DB_PASSWORD || 'sim',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      //storage: './wp_workshop.sqlite',
    },
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  },
}
