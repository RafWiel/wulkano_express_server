const all = 0;
const car = 1;
const truck = 2;
const deposit = 3;

module.exports = {
  all,
  car,
  truck,
  deposit,
  items: [
    { id: all, text: 'Wszystkie' },
    { id: car, text: 'Osobowe' },
    { id: truck, text: 'Ciężarowe' },
    { id: deposit, text: 'Depozyt' },
  ],
  getText(id) {
    const item = this.items.find((u) => u.id === id);
    return item ? item.text : '';
  },
};
