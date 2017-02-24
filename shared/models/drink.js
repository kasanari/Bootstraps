let menu = require('../../shared/data/menu.json');

function parseDrink(drink) {
    let {
        _id
    } = drink;

    return new Drink(_id);
}

class Drink {
    constructor(id) {
        this._id = id;
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
}

module.exports = Drink;
module.exports.parseDrink = parseDrink;