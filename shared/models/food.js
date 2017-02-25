let menu = require('../../shared/data/menu.json');
let { parseOption } = require('./option');

function parseFood(food) {
    let {
        _id,
        _options,
        _note,
        _qty
    } = food;

    _options = (_options || []).map((option) => parseOption(option));
    _note = _note || '';
    _qty = _qty || 1;

    return new Food(
        _id,
        _options,
        _note,
        _qty
    );
}

class Food {
    constructor(id, options, note, qty) {
        this._id = id;
        this._options = options || [];
        this._note = note || '';
        this._qty = qty || 1;
    }

    getQty() {
        return this._qty;
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

    compareTo(food) {
        let compare = 0;
        compare += this._id - food._id;
        if (compare !== 0) return compare;
        compare += this._note.localeCompare(food._note);
        if (compare !== 0) return compare;
        compare += this._options.length - food._options.length;
        if (compare !== 0) return compare;
        for (let i = 0; i < this._options.length; i++) {
            const myOption = this._options[i];
            const otherOption = food._options.find((op) => op._label === myOption._label);
            if (!otherOption) {
                compare += 1;
                return compare;
            }
            compare += myOption.compareTo(otherOption);
            if (compare !== 0) return compare;
        }

        return compare;
    }
}

module.exports = Food;
module.exports.parseFood = parseFood;