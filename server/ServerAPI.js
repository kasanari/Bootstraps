let menu = require("../shared/data/menu.json");
let Order = require('../shared/models/order');
let Drink = require('../shared/models/drink');
let Food = require('../shared/models/food');
let Option = require('../shared/models/option');

function parseOption(option) {
    let {
        label,
        value
    } = option;

    return new Option(label, value);
}

function parseDrink(drink) {
    let {
        _id
    } = drink;

    return new Drink(_id);
}

function parseFood(food) {
    let {
        _id,
        options,
        note
    } = food;

    options = options.map((option) => parseOption(option));

    return new Food(
        _id,
        options,
        note
    );
}

function parseOrder(order) {
    let {
        table,
        foods,
        drinks,
        orderNumber,
        status
    } = order;

    foods = foods.map((food) => parseFood(food));
    drinks = drinks.map((drink) => parseDrink(drink));

    return new Order(
        table,
        foods,
        drinks,
        orderNumber,
        status
    );
}

class ServerAPI {
    constructor(io) {
        this._io = io;
        this._orders = [];
        this._menu = menu;

        this._addIOHandlers();
    }

    _addIOHandlers() {
        this._io.on("connection", this._onConnection.bind(this));
    }

    _addSocketHandlers(socket) {
        socket.on("order", this._onOrder.bind(this));
    }

    _initSocket(socket) {
        socket.emit("initialize", {
            orders: this._orders
        });
    }

    _onConnection(socket) {
        this._initSocket(socket);

        this._addSocketHandlers(socket);
    }

    _onOrder(orderData) {
        let order = parseOrder(orderData);
        this._upsertOrder(order);
    }

    _upsertOrder(order) {
        let matchingOrderIndex = this._orders.findIndex((o) => o.orderNumber === order.orderNumber);
        if (matchingOrderIndex !== -1) {
            this._orders[matchingOrderIndex] = order;
            console.debug(`Order with order number ${order.orderNumber} already exists. Updating server order list instead`);
        } else {
            this._orders.push(order);
        }
        this._broadcastOrders();
    }

    _broadcastOrders() {
        this._io.emit("orders", {orders: this._orders});
        console.debug("Broadcasting order list");
    }

}

module.exports = ServerAPI;