function parseOption(option) {
    let {
        _label,
        _value
    } = option;

    return new Option(_label, _value);
}

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

    compareTo(option) {
        let compare = 0;
        compare += this._label.localeCompare(option._label);
        if (compare !== 0) return compare;
        compare += this._value - option._value;
        return compare;
    }
}

module.exports = Option;
module.exports.parseOption = parseOption;