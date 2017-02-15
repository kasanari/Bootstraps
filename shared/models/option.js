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
}

module.exports = Option;
module.exports.parseOption = parseOption;