
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
}

module.exports = Food;