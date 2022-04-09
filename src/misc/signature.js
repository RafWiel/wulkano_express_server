const fs = require('fs');
const { randomUUID } = require('crypto');
const tools = require('../misc/tools');

module.exports = {
  save(data, directory, res) {
    const fileName = randomUUID();
    const clientSignature = data.replace('data:image/png;base64,','');

    try {
      let buffer = new Buffer.from(clientSignature, 'base64');
      fs.writeFileSync(`${directory.path}${fileName}`, buffer);
    }
    catch (error) {
      tools.sendError(res, error);
    }

    return fileName;
  }
}
