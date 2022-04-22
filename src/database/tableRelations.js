const {Deposit} = require('../models');
const {DepositTire} = require('../models');
const {Client} = require('../models');

Deposit.belongsTo(Client, { as: 'client', foreignKey: 'clientId'});
DepositTire.belongsTo(Deposit, { as: 'tire', foreignKey: 'depositId'});
