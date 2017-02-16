let { parseFood } = require('./food');
let { parseDrink } = require('./drink');

STATUS = {
    waiting: 0,
    ongoing: 1,
    ready: 2
}

function parseOrder(order) {
    let {
        _table,
        _foods,
        _drinks,
        _orderNumber,
        _status
    } = order;

    _foods = (_foods || []).map((food) => parseFood(food));
    _drinks = (_drinks || []).map((drink) => parseDrink(drink));
    _status = _status || STATUS.waiting

    return new Order(
        _table,
        _foods,
        _drinks,
        _orderNumber,
        _status
    );
}

function validateStatus(status) {
    if (
        status !== STATUS.ongoing &&
        status !== STATUS.ready &&
        status !== STATUS.waiting
    ) {
        throw new Error(`No such order status ${status}`);
    }
    return true;
}

class Order {
    constructor(table, foods, drinks, orderNumber, status) {
        this._table = table;
        this._foods = foods || [];
        this._drinks = drinks || [];
        this._orderNumber = orderNumber;
        this._createdAt = new Date();
        this._status = status || STATUS.waiting;

        validateStatus(this._status);
    }

    getFoods() {
        return this._foods;
    }

    getDrinks() {
        return this._drinks;
    }

    getOrderNumber() {
        return this._orderNumber;
    }

    getCreatedAt() {
        return this._createdAt;
    }

    getStatus() {
        return this._status;
    }

    getTable() {
        return this._table;
    }
    
    setStatus(status) {
        this._status=status;
        
        
    }
}

module.exports = Order;
module.exports.STATUS = STATUS;
module.exports.parseOrder = parseOrder;