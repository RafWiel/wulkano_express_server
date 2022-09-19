const {car_service} = require('../models');
const {car_tire} = require('../models');
const {client} = require('../models');
const {company} = require('../models');
const {deposit} = require('../models');
const {deposit_tire} = require('../models');
const {directory} = require('../models');
const {mechanic} = require('../models');
const {truck_service} = require('../models');
const {truck_tire} = require('../models');

//Jesli jest blad to wyremuj na chwile. Musi istniec tabela
car_service.belongsTo(client, { as: 'client', foreignKey: 'client_id'});
car_service.belongsTo(directory, { as: 'directory', foreignKey: 'directory_id'});
car_tire.belongsTo(car_service, { as: 'car_tire', foreignKey: 'service_id'});
deposit.belongsTo(client, { as: 'client', foreignKey: 'client_id'});
deposit.belongsTo(directory, { as: 'directory', foreignKey: 'directory_id'});
deposit_tire.belongsTo(deposit, { as: 'tire', foreignKey: 'deposit_id'});
mechanic.belongsTo(truck_service, { as: 'truck_service', foreignKey: 'service_id'});
truck_service.belongsTo(company, { as: 'company', foreignKey: 'company_id'});
truck_service.belongsTo(directory, { as: 'directory', foreignKey: 'directory_id'});
truck_tire.belongsTo(truck_service, { as: 'truck_service', foreignKey: 'service_id'});

