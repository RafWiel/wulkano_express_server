const tools = require('../misc/tools');
const path = require('path');
const fs = require('fs');
const {Directory} = require('../models');

module.exports = {
  async get (req, res) {
    try {
      //get directory path
      let directory = await Directory.findOne({
        where : {
          id: req.query.dir
         }
      });

      let filePath = path.join(tools.getDir(), directory.path);
      filePath = path.join(filePath, req.query.sig);

      //check if exists
      if (!fs.existsSync(filePath)) {
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Not found');
      }

      //send base64 data
      const data = fs.readFileSync(filePath, {encoding: 'base64'});
      res.set('Content-Type', 'text/plain');
      res.status(200).end(data);
    }
    catch (error) {
      tools.sendError(res, error);
    }
  },
}
