import io from 'socket.io-client';
import menu from '../../shared/data/menu.json';

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

    addOrdersListener(func) {
        this._onOrdersCallbacks.push(func);
    }

    removeOrdersListener(funcToRemove) {
        this._onOrdersCallbacks = this._onOrdersCallbacks.filter((func) => func !== funcToRemove);
    }

    addOrderChangedListener(func) {
        this._onOrderChangedCallbacks.push(func);
    }

    removeOrderChangedListener(func) {
        this._onOrderChangedCallbacks = this._onOrderChangedCallbacks.filter((func) => func !== funcToRemove);
    }

    startOrder() {
        this._order = {
            foods: [],
            drinks: [],
            orderNumber: Math.floor(Math.random() * 1000) //TODO: get ordernumber from server
        }
        this._callOnOrderChangedListeners();
    }

    addFood(food) {
        this._order.foods.push(food);
        this._callOnOrderChangedListeners();
    }

    addDrink(drink) {
        this._order.drinks.push(drink);
        this._callOnOrderChangedListeners();
    }

    sendOrder() {
        this._io.emit('order', this._order);
        this.startOrder();
    }

    _onInitialize(data) {
        this._orders = data.orders;
    }

    _onOrders(data) {
        this._orders = data.orders;
        this._callOnOrdersListeners();
    }

    _callOnOrdersListeners() {
        this._onOrdersCallbacks.forEach((func) => func(this._orders));
    }

    _callOnOrderChangedListeners() {
        this._onOrderChangedCallbacks.forEach((func) => func(this._order));
    }
}