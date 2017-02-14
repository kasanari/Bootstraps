STATUS = {
    waiting: Symbol("waiting"),
    ongoing: Symbol("ongoing"),
    ready: Symbol("ready")
}

function validateStatus(status) {
    if (
        status !== STATUS.ongoing &&
        status !== STATUS.ready &&
        status !== STATUS.waiting
    ) {
        throw new Error("No such order status");
    }
    return true;
}

class Order {
    constructor(table, foods, drinks, orderNumber, status) {
        validateStatus(status);

        this._table = table;
        this._foods = foods;
        this._drinks = drinks;
        this._orderNumber = orderNumber;
        this._createdAt = new Date();
        this._status = status || STATUS.waiting;
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
}

module.exports = Order;
module.exports.STATUS = STATUS;