class Option {
    constructor(label, value) {
        this._label = label;
        this._value = value;
    }
    
    getLabel() {
        return this._label;
    }

    getValue() {
        return this._value;
    }
}

module.exports = Option;