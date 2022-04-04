const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const config = require('./config/config');
const {sequelize} = require('./models');
//const fs = require('fs');
//const path = require('path');

const app = express();
app.use(cors());
app.use(logger('combined'));
app.use(bodyParser.json());

// load routes
// fs.readdirSync(`${__dirname}/routes`)
//   .forEach((file) => {
//     console.log(path.join(`${__dirname}/routes`, file));
//     require(path.join(`${__dirname}/routes`, file))(app);
//   });

// db table relations
//require('./database/tableRelations');

const isReset = 0;

sequelize.sync({force: isReset})
.then(() => {
  app.listen(process.env.PORT || config.port, () => {
    console.log(`WP Workshop server listening on port ${config.port}`)

    //create data for testing
    if (isReset){
      require('./database/testDatabase');
    }
  });
});

