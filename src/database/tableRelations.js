const {CarService} = require('../models');
const {CarTire} = require('../models');
const {Client} = require('../models');
const {Company} = require('../models');
const {Deposit} = require('../models');
const {DepositTire} = require('../models');
const {Directory} = require('../models');
const {Mechanic} = require('../models');
const {TruckService} = require('../models');
const {TruckTire} = require('../models');

//Jesli jest blad to wyremuj na chwile. Musi istniec tabela
Client.hasMany(CarService, {
  foreignKey: 'clientId',
  onDelete: 'SET NULL',
});
CarService.belongsTo(Client, {
  foreignKey: 'clientId',
});

Directory.hasMany(CarService, {
  foreignKey: 'directoryId',
  onDelete: 'RESTRICT',
});
CarService.belongsTo(Directory, {
  foreignKey: 'directoryId'
});

CarService.hasMany(CarTire, {
  foreignKey: 'serviceId',
  onDelete: 'CASCADE',
});
CarTire.belongsTo(CarService, {
  foreignKey: 'serviceId'
});

Client.hasMany(Deposit, {
  foreignKey: 'clientId',
  onDelete: 'SET NULL',
});
Deposit.belongsTo(Client, {
  foreignKey: 'clientId'
});

Directory.hasMany(Deposit, {
  foreignKey: 'directoryId',
  onDelete: 'RESTRICT',
});
Deposit.belongsTo(Directory, {
  foreignKey: 'directoryId'
});

Deposit.hasMany(DepositTire, {
  foreignKey: 'depositId',
  onDelete: 'CASCADE',
});
DepositTire.belongsTo(Deposit, {
  foreignKey: 'depositId'
});

TruckService.hasMany(Mechanic, {
  foreignKey: 'serviceId',
  onDelete: 'CASCADE',
});
Mechanic.belongsTo(TruckService, {
  foreignKey: 'serviceId'
});

Company.hasMany(TruckService, {
  foreignKey: 'companyId',
  onDelete: 'SET NULL',
});
TruckService.belongsTo(Company, {
  foreignKey: 'companyId'
});

Directory.hasMany(TruckService, {
  foreignKey: 'directoryId',
  onDelete: 'RESTRICT',
});
TruckService.belongsTo(Directory, {
  foreignKey: 'directoryId'
});

TruckService.hasMany(TruckTire, {
  foreignKey: 'serviceId',
  onDelete: 'CASCADE',
});
TruckTire.belongsTo(TruckService, {
  foreignKey: 'serviceId'
});

