let menu = require('../../shared/data/menu.json');

function parseDrink(drink) {
    let {
        _id,
        _qty
    } = drink;

    _qty = _qty || 1;

    return new Drink(_id);
}

class Drink {
    constructor(id, qty) {
        this._id = id;
        this._qty = qty || 1;
    }

    getQty() {
        return this._qty;
    }

    getId() {
        return this._id;
    }

    getMenuItem() {
        return menu.drinks.find((drink) => drink._id === this._id);
    }

    getLabel() {
        return this.getMenuItem().label;
    }

    getPrice() {
        return this.getMenuItem().price;
    }

    compareTo(drink) {
        return this._id - drink._id;
    }
}

module.exports = Drink;
module.exports.parseDrink = parseDrink;