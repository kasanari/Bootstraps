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
}

module.exports = Drink;
module.exports.parseDrink = parseDrink;