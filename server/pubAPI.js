let menu = require("../data/menu.json");
let Order = require('../models/order');
let Drink = require('../models/drink');
let Food = require('../models/food');
let Option = require('../models/option');

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

class PubAPI {
    constructor(io) {
        this._io = io;
        this._orders = [];
        this._menu = menu;
    }

    _addIOHandlers() {
        this._io.on("connection", this._onConnection.bind(this));
    }

    _addSocketHandlers(socket) {
        socket.on("order")
    }

    _initSocket(socket) {
        socket.emit("initialize", {
            menu: this._menu,
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
        this._io.emit("orders", this._orders);
        console.debug("Broadcasting order list");
    }

}

module.exports = PubAPI;