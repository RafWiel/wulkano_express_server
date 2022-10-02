const dotenv = require('dotenv');

dotenv.config({ path: '.env' });

module.exports = {
  port: process.env.PORT || 3000,
  db: {
    database: process.env.DB_NAME || 'Wulkano',
    user: process.env.DB_USER || 'wulkano',
    password: process.env.DB_PASSWORD || 'wulkano',
    options: {
      dialect: process.env.DIALECT || 'mysql',
      host: process.env.HOST || 'localhost',
    },
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'sdsdf986VFGd97DiiuE642HD973TIUbi6GurwMMgf8832DDFOGIlbeu78'
  },
}
