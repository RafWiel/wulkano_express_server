const path = require('path');
const dotenv = require('dotenv');

if (process.pkg) {
  const envPath = path.join(__dirname, '../../.env.production');
  dotenv.config({ path: envPath });
}
else dotenv.config();

module.exports = {
  port: process.env.PORT || 3000,
  db: {
    database: process.env.DB_NAME || 'Wulkano',
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'admin',
    options: {
      dialect: process.env.DIALECT || 'mysql',
      host: process.env.HOST || 'localhost',
    },
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'jwt_secret'
  },
}
