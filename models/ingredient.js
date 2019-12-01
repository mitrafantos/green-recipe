class Ingredient {

  constructor(input = {}) {
    this.name = input.name;
    this.quantity = input.quantity || 1;
    this.price = input.price;
    this.priceTotal = this.priceTotal();
    this.weight = input.weight || 200;
    this.calories = input.calories;
    this.caloriesTotal = this.calTotal();
    this.link = input.link;
  }

  calTotal() {
    return Math.round(this.weight / 100 * this.calories);
  }

  priceTotal() {
    return this.quantity * this.price;
  }
}

module.exports = Ingredient;