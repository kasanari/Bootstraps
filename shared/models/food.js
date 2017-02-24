let menu = require('../../shared/data/menu.json');
let { parseOption } = require('./option');

function parseFood(food) {
    let {
        _id,
        _options,
        _note
    } = food;

    _options = (_options || []).map((option) => parseOption(option));
    _note = _note || '';

    return new Food(
        _id,
        _options,
        _note
    );
}

class Food {
    constructor(id, options, note) {
        this._id = id;
        this._options = options;
        this._note = note;
    }

    getId() {
        return this._id;
    }

    getOptions() {
        return this._options;
    }

    getNote() {
        return this._note;
    }

    getMenuItem() {
        return menu.foods.find((food) => food._id === this._id);
    }

    getLabel() {
        return this.getMenuItem().label;
    }

    getPrice() {
        return this.getMenuItem().price;
    }
}

module.exports = Food;
module.exports.parseFood = parseFood;