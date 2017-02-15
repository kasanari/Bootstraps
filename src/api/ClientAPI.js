import io from 'socket.io-client';
import menu from '../../data/menu.json';

export default class ClientAPI {
    constructor(url) {
        // If url is undefined, socket io tries to use same host as client
        this._io = io(url);
        this._menu = menu;
        this._orders = null;

        this._onOrdersCallbacks = [];

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
        this._menu;
    }

    getOrders() {
        this._orders;
    }

    addOrdersListener(func) {
        this._onOrdersCallbacks.push(func);
    }

    removeOrdersListener(funcToRemove) {
        this._onOrdersCallbacks = this._onOrdersCallbacks.filter((func) => func !== funcToRemove);
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
}