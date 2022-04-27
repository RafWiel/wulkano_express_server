const all = 0;
const carService = 1;
const truckService = 2;
const deposit = 3;

module.exports = {
  all,
  carService,
  truckService,
  deposit,
  items: [
    { id: all, text: 'Wszystkie' },
    { id: carService, text: 'Osobowe' },
    { id: truckService, text: 'Ciężarowe' },
    { id: deposit, text: 'Depozyt' },
  ],
  getText(id) {
    const item = this.items.find((u) => u.id === id);
    return item ? item.text : '';
  },
};
