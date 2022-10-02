const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const config = require('./config/config');
const {sequelize} = require('./models');
const fs = require('fs');
const path = require('path');
const helmet = require("helmet");

dotenv.config({ path: '.env' });

const app = express();
app.use(cors());
app.use(logger('combined'));
app.use(bodyParser.json());
app.use(helmet());

// load routes
fs.readdirSync(`${__dirname}/routes`)
  .forEach((file) => {
    console.log(path.join(`${__dirname}/routes`, file));
    require(path.join(`${__dirname}/routes`, file))(app);
  });

// db table relations
require('./database/tableRelations');

const message = `Wulkano Workshop server listening on port ${config.port}`;
const isReset = 0;

sequelize.sync({force: isReset})
.then(() => {
  app.listen(config.port, () => {
    console.log(message);
  });
});

app.get('/', (req, res) => {
  res.send(message);
});
