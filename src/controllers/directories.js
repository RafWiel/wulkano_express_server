//const {QueryTypes} = require('sequelize');
//const {sequelize} = require('../models');
//const tools = require('../misc/tools');
const {Directory} = require('../models');
var fs = require('fs');

module.exports = {
  async getDirectory() {
    const now = new Date();
    const path = `./signatures/${now.getFullYear()}/${('00' + (now.getMonth() + 1)).slice (-2)}/`;

    let directory = await Directory.findOne({
      where : { path }
    });

    if (directory == null) {
      directory = await Directory.create({
        path,
      });
    }

    if (!fs.existsSync(directory.path)){
        fs.mkdirSync(directory.path, { recursive: true });
    }

    return directory;
  }
}
