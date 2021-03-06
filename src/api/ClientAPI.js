import io from 'socket.io-client';
import menu from '../../shared/data/menu.json';
import { parseOrder } from '../../shared/models/order';
import Order from '../../shared/models/order';

export default class ClientAPI {
    constructor(url) {
        // If url is undefined, socket io tries to use same host as client
        this._io = io(url);
        this._menu = menu;
        this._orders = null;
        this._order = null;

        this._onOrdersCallbacks = [];
        this._onOrderChangedCallbacks = [];

        this.startOrder();

        this._addHandlers();
    }

    // Expose a vue plugin install function
    install(Vue, options) {
        // Expose this clientAPI to all vue elements
        Vue.prototype.clientAPI = this;
    }

    _addHandlers() {
        this._io.on('initialize', this._onInitialize.bind(this));
        this._io.on('orders', this._onOrders.bind(this));
    }

    getMenu() {
        return this._menu;
    }

    getOrders() {
        return this._orders;
    }

    getOrder() {
        return this._order;
    }

    addOrdersListener(func) {
        this._onOrdersCallbacks.push(func);
    }

    removeOrdersListener(funcToRemove) {
        this._onOrdersCallbacks = this._onOrdersCallbacks.filter((func) => func !== funcToRemove);
    }
    
    removeOrder(order){
        var index = this._orders.indexOf(order);
        if (index > -1){
            this._orders.splice(index, 1);
        };
    }

    addOrderChangedListener(func) {
        this._onOrderChangedCallbacks.push(func);
    }

    removeOrderChangedListener(func) {
        this._onOrderChangedCallbacks = this._onOrderChangedCallbacks.filter((func) => func !== funcToRemove);
    }

    startOrder() {
        this._order = new Order(undefined, undefined, undefined, Math.floor(Math.random() * 1000));
        this._callOnOrderChangedListeners();
    }

    addFood(food) {
        const foods = this._order.getFoods();

        const dupe = foods.find((f) => f.compareTo(food) === 0);
        if (!!dupe) {
            dupe._qty += food._qty;
        } else {
            foods.push(food);
        }

        this._callOnOrderChangedListeners();
    }

    addDrink(drink) {
        const drinks = this._order.getDrinks();

        const dupe = drinks.find((d) => d.compareTo(drink) === 0);
        if (!!dupe) {
            dupe._qty += drink._qty;
        } else {
            drinks.push(drink);
        }
        this._callOnOrderChangedListeners();
    }
    
    setTables(tables) {
        this._order.setTables(tables);
        this._callOnOrderChangedListeners();
    }

    sendOrder() {
        this._io.emit('order', this._order);
        this.startOrder();
    }

    updateOrder(order) {
        this._io.emit('order', order);
    }

    removeItemInOrder(item) {
        this._order._foods = this._order._foods.filter((food) => item !== food);
        this._order._drinks = this._order._drinks.filter((drink) => item !== drink);
        this._callOnOrderChangedListeners();
    }

    _onInitialize(data) {
        this._orders = data.orders.map((orderData) => parseOrder(orderData));
        this._callOnOrdersListeners();
    }

    _onOrders(data) {
        console.debug("Received new orders");
        this._orders = data.orders.map((orderData) => parseOrder(orderData));
        this._callOnOrdersListeners();
    }

    _callOnOrdersListeners() {
        this._onOrdersCallbacks.forEach((func) => func(this._orders));
    }
 
    _callOnOrderChangedListeners() {
        this._onOrderChangedCallbacks.forEach((func) => func(this._order));
    }
}
